import { test, expect, Fixtures } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import testData from '../test-data/testData.json'

test.beforeEach('Login', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.loginPage().Login(testData.loginData.userName, testData.loginData.password)
    await expect.soft(page.locator('a').filter({ hasText: testData.loginData.userFullName })).toBeVisible()
})

//Creates and Performs an Inspection in Web. verify Inspection Log & Inspection Overview
test('Inspection from web without Follow up', async ({ page }) => {
    const pm = new PageManager(page)
    let inspectionID: string | undefined = '0'
    let expectedElements: string[] = []
    let actualElements: string[] = []

    await test.step("Create Inspection", async () => {
        await pm.homePage().ClickMenu('Inspections', 'Inspection Locations')
        await pm.inspectionLocationsPage().createInspection(testData.inspectionData.location)
        await expect(pm.inspectionPage().inspectionHeader).toBeVisible()
    })

    await test.step("Get Elements List", async () => {
        expectedElements = await pm.inspectionPage().getElementsList()
        console.log(`Elements Inspected: ${expectedElements}`)
    })

    await test.step("Perform Inspection", async () => {
        inspectionID = await pm.inspectionPage().getInspectionID()
        console.log(`Inspection ID on Performing Inspection: ${inspectionID}`)
        await pm.inspectionPage().performInspection()
        await pm.inspectionPage().completeInspectionWithoutFollowUp()
    })

    await test.step("Verify Inspection Log", async () => {

        //Search For the Performed Inspection ID in Log and Verify Status as "Complete"
        await pm.homePage().ClickMenu('Inspections', 'Inspection Logs')
        const inspStatus = await pm.inspectionLogsPage().getInspectionStatusandOpenLog(inspectionID)
        expect(inspStatus).toEqual("Complete") //Assertion #1

        //Open the Inspection log and ensure the Inspection ID, Inspection Location and Elements List is populated correctly
        const idFromLog = await pm.inspectionLogDetailPage().getinspectionIDfromLog()
        expect(idFromLog).toEqual(inspectionID) //Assertion #2

        const locationFromLog = await pm.inspectionLogDetailPage().getinspectionLocationfromLog()
        expect(locationFromLog).toEqual(testData.inspectionData.location) //Assertion #3

        actualElements = await pm.inspectionLogDetailPage().getelementsListFromLog()
        console.log(`Elements From Log: ${actualElements}`)
        expect(actualElements).toEqual(expectedElements) //Assertion #4
    })

    await test.step("Verify Inspection Overview", async () => {
        await pm.homePage().ClickMenu("Inspection Overview")
        await pm.inspectionOverviewPage().filterInspectionOverview(testData.inspectionData.venue)
        const isID_DisplayedInOverview = await pm.inspectionOverviewPage().verifyInspectionOverview(testData.inspectionData.venue, inspectionID)
        expect(isID_DisplayedInOverview).toBeTruthy() //Assertion #5

    })
})

