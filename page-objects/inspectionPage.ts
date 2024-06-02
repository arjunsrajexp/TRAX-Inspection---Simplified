import { Page, Locator, ElementHandle } from '@playwright/test'
import testData from '../test-data/testData.json'
export class inspectionPage
{
    readonly page: Page
    inspectionHeader: Locator
    
    //Element Rating related Locators
    pageTable: string
    inspectionCommentBox: Locator
    completeInspectionBtn: Locator

    //Attachment related Locators
    firstElementAttachmentbtn: Locator
    addAttachmentPopupbtn: Locator
    imageUpload: Locator
    attachmentCommentBox: Locator
    attachmentSaveBtn: Locator

    //Follow up Cleaning Alert related Locators
    followupNoBtn: Locator
    followupYesBtn: Locator
  
    constructor(page: Page) 
    {
        this.page = page
        this.inspectionHeader = page.locator('.location-header').first() 

        //Element Rating related Locators
        this.pageTable = 'table'
        this.inspectionCommentBox = page.getByPlaceholder('Place inspection comments here')
        this.completeInspectionBtn = page.getByRole('button', { name: 'Complete Inspection' })

        //Attachment related Locators
        this.firstElementAttachmentbtn = page.getByRole('button', { name: '' }).first()
        this.addAttachmentPopupbtn = page.getByRole('button', { name: '+ Add Attachments' })
        this.imageUpload = page.locator('input[name="file_1"]')
        this.attachmentCommentBox = page.getByPlaceholder('Comments', { exact: true })
        this.attachmentSaveBtn = page.getByRole('button', { name: 'Save' })

        //Follow up Cleaning Alert related Locators
        this.followupYesBtn = page.getByRole('button', { name: 'Yes' })
        this.followupNoBtn = page.getByRole('button', { name: 'No' })
    }

    /**Gets the Inspection ID by Extracting the numerical portion of Header in Inspection Page */
    async getInspectionID()
    {
        const text =  await this.inspectionHeader.textContent()
        const numericalText= text?.match(/\d+/g)
        const inspectionID = numericalText?.[0]
        return inspectionID
    }
  
    /**Performs the Inspection by providing random rating to all elements in the page and adding an attachment to first element */
    async performInspection()
    
    {
        await this.page.waitForSelector(this.pageTable);
        const elementRows = await this.page.$$('table.table tbody tr') //Locating the table rows for all elements
        console.log('Number of element rows found:', elementRows.length); 

         for (const row of elementRows) 
         {
         const buttons = await row.$$('td:nth-child(3) button'); //Locating the rating buttons in the 3rd column of element rows
         const randomButton = Math.floor(Math.random() * buttons.length); //Identifying a random rating button to click
         await buttons[randomButton].click();
         }
        
        await this.firstElementAttachmentbtn.click()
        await this.addAttachmentPopupbtn.click()
        await this.imageUpload.setInputFiles(testData.inspectionData.sampleImage)
        await this.attachmentCommentBox.fill(testData.inspectionData.attachmentComment)
        await this.attachmentSaveBtn.click()

        await this.inspectionCommentBox.fill(testData.inspectionData.inspectionCompletionComment)
    }

    async completeInspectionWithFollowUp()
    {
        await this.completeInspectionBtn.click()
        await this.followupYesBtn.click()
    }
    async completeInspectionWithoutFollowUp()
    {
        await this.completeInspectionBtn.click()
        await this.followupNoBtn.click()
        await this.page.waitForSelector(this.pageTable);
    }
} 