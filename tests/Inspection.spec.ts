import {test, expect, Fixtures} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

const userDetails= {
    userName:"autoinsp@yopmail.com",
    password:"Autoinsp@123",
    userFullName: "Automation Inspector",
}

test.beforeEach('Login',async({page})=>
{
    const pm = new PageManager(page)
    await pm.loginPage().Login(userDetails.userName, userDetails.password)
    await expect.soft(page.locator('a').filter({hasText: userDetails.userFullName})).toBeVisible()   
})

test ('Test Web Inspection',async({page})=>
{
    const pm =  new PageManager(page)
    await pm.homePage().ClickMenu('Inspections', 'Inspection Locations')
    await pm.inspectionLocationsPage().createInspection('Automation Test Location')
    const inspectionID= await pm.inspectionPage().getInspectionID()
    console.log(inspectionID)
    await pm.inspectionPage().performInspection()
})
