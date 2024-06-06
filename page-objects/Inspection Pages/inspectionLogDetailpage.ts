import { Page, Locator } from '@playwright/test'
import testData from '../../test-data/testData.json'
export class inspectionLogDetailPage
{
    readonly page: Page
    inspectionID: Locator
    elementsTable: string
    
    constructor(page: Page) 
    {
        this.page = page
        this.inspectionID = page.locator('.clipping-wrapper').first()
        this.elementsTable = 'table[class="table table-bordered table-background"]'
    }

    /**Returns The Inspection ID from the Log Detail */
    async getinspectionIDfromLog()
    {
        return await this.inspectionID.innerText()
    }
    
    /**Returns the Elements List from the Log Details  */
    async getelementsListFromLog()
    {
        await this.page.waitForSelector(this.elementsTable)
        let elementsList: string[] = []
        const tableRows = await this.page.$$('table[class="table table-bordered table-background"] div[class="ng-star-inserted"]')
        
        for (const row of tableRows) {
            const elementNameColumn = await row.$('div[style="word-break: break-all;"]'); //Locataing the element Names in the 1st column
            const elementName = (await elementNameColumn?.textContent())
            if (elementName !== null && elementName !== undefined) {
                elementsList.push(elementName);
            }
        }
        elementsList = elementsList.map(item => item.replace(/\s/g, '')); // Removes Any Spaces from the returned Elements List
        return elementsList
    }

}