import {test, expect, Fixtures} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import testData from '../test-data/testData.json'

const testData1= {
    userName:"autoinsp@yopmail.com",
    password:"Autoinsp@123",
    userFullName: "Automation Inspector",
    inspectionLocation: "Automation Test Location"
}

test.beforeEach('Login',async({page})=>
{
    const pm = new PageManager(page)
    await pm.loginPage().Login(testData.loginData.userName,testData.loginData.password)
    await expect.soft(page.locator('a').filter({hasText: testData.loginData.userFullName})).toBeVisible()   
})

test ('Inspection from web without Follow up',async({page})=>
{
    const pm =  new PageManager(page)
    let inspectionID: string | undefined ='0'
    let expectedElements: string[] =[]
    let actualElements: string[] =[]

    await test.step("Create Inspection",async()=>{
        await pm.homePage().ClickMenu('Inspections', 'Inspection Locations')
        await pm.inspectionLocationsPage().createInspection(testData.inspectionData.location)
        await expect(pm.inspectionPage().inspectionHeader).toBeVisible()
    })

    await test.step("Get Elements List",async()=>{
        expectedElements = await pm.inspectionPage().getElementsList()
        console.log (`Elements Inspected: ${expectedElements}`)
    })

    await test.step("Perform Inspection",async()=>{
        inspectionID= await pm.inspectionPage().getInspectionID()
        console.log(inspectionID)
        await pm.inspectionPage().performInspection()
        await pm.inspectionPage().completeInspectionWithoutFollowUp()
    })
    
    await test.step("Verify Inspection Log",async()=>{
        
        //Search For the Performed Inspection ID in Log and Verify Status as "Complete"
        await pm.homePage().ClickMenu('Inspections', 'Inspection Logs')
        const inspStatus = await pm.inspectionLogsPage().getInspectionStatusandOpenLog(inspectionID)
        expect(inspStatus).toEqual("Complete") //Assertion #1

        //Open the Inspection log and ensure the Inspection ID and Elements List is correct
        const idFromLog = await pm.inspectionLogDetailPage().getinspectionIDfromLog()
        expect(idFromLog).toEqual(inspectionID) //Assertion #2
        actualElements = await pm.inspectionLogDetailPage().getelementsListFromLog()
        console.log (`Elements From Log: ${actualElements}`)
        expect(actualElements).toEqual(expectedElements) //Assertion #3
    })
    
})
