import { Page, Locator } from '@playwright/test'
export class inspectionLogsListPage
{
    readonly page: Page
    inspectionsTable: string

    constructor(page: Page) 
    {
        this.page = page
        this.inspectionsTable = 'table'
    }
    /**Loops through the entries in Inspection Logs Page and Rerturns the Status of the Inspection that is 
     * Completed. Also clicks on that Inspection record to open the Inspection Log
     * @param inspectionID: ID of the inspection to be searched in the logs
     */
    async getInspectionStatusandOpenLog(inspectionID)
    {
        await this.page.waitForSelector(this.inspectionsTable)
        const inspectionRows = await this.page.$$('table.table tbody tr')
        console.log('Number of inspection logs found:', inspectionRows.length); 
        for (const row of inspectionRows)
            {
                const idColumn = await row.$('td:nth-child(1)'); // Locating the 1st column in the table which contains Inspection ID
                const statusColumn = await row.$('td:nth-child(7)'); // Locating the 7th column in the table which contains Inspection Status
                if (await idColumn?.textContent() == inspectionID)
                    {
                    const inspStatus= await statusColumn?.textContent()
                    await idColumn?.click() //Clicks on the 1st column to open the detailed inspection log
                    return inspStatus
                }           
            }
    }
}

