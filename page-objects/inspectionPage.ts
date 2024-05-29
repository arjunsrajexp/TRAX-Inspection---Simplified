import { Page, Locator, ElementHandle } from '@playwright/test'
export class inspectionPage
{
    readonly page: Page
    inspectionHeader: Locator
    elementsTable: Locator
    commentBox: Locator
    completeInspectionBtn: Locator
  
    constructor(page: Page) 
    {
        this.page = page
        this.inspectionHeader = page.locator('.location-header').first() 
        this.elementsTable = page.locator('//*[@id="maincontent"]/div/div/inspection/div/section[2]/div[1]/div/div/div/table')
        this.commentBox = page.getByPlaceholder('Place inspection comments here')
        this.completeInspectionBtn = page.getByRole('button', { name: 'Complete Inspection' })

    }

    /**Gets the Inspection ID by Extracting the numerical portion of Header in Inspection Page */
    async getInspectionID()
    {
        const text =  await this.inspectionHeader.textContent()
        const numericalText= text?.match(/\d+/g)
        const inspectionID = numericalText?.[0]
        return inspectionID
    }
  
    async performInspection()
    {
       
        console.log (await this.elementsTable.isVisible())
        const elementRows = await this.page.$$('//*[@id="maincontent"]/div/div/inspection/div/section[2]/div[1]/div/div/div/table/tbody/tr')
        console.log('Number of rows found:', elementRows.length); 

         for (const row of elementRows) 
         {
         const buttons = await row.$$('td:nth-child(3) button'); 
         const randomButton = Math.floor(Math.random() * buttons.length);
         await buttons[randomButton].click();
         }
        await this.commentBox.fill("Automated Inspection")
        await this.completeInspectionBtn.click()
        
    }
} 