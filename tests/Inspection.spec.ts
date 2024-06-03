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
    let inspectionID
    await test.step("Create Inspection",async()=>{
        await pm.homePage().ClickMenu('Inspections', 'Inspection Locations')
        await pm.inspectionLocationsPage().createInspection(testData.inspectionData.location)
    })

    await test.step("Perform Inspection",async()=>{
        inspectionID= await pm.inspectionPage().getInspectionID()
        console.log(inspectionID)
        await pm.inspectionPage().performInspection()
        await pm.inspectionPage().completeInspectionWithoutFollowUp()
    })
    
   
    await test.step("Verify Inspection Log",async()=>{

        await pm.homePage().ClickMenu('Inspections', 'Inspection Logs')
    const inspStatus = await pm.inspectionLogsPage().getInspectionStatusandOpenLog(inspectionID)
    expect(inspStatus).toEqual("Complete")
    })
    
})
