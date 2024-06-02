import { Page, Locator } from '@playwright/test'
export class inspectionLogsListPage
{
    readonly page: Page
    inspectionsTable: string
    inspectionLogSearchBox: Locator
    inspectionLogSearchButton: Locator

    constructor(page: Page) 
    {
        this.page = page
        this.inspectionsTable = 'table'
        this.inspectionLogSearchBox = page.getByPlaceholder('Search')
        this.inspectionLogSearchButton = page.getByRole('button', { name: '' })
    }
    
    async openInspectionLog(inspectionID)
    {
        await this.inspectionLogSearchBox.fill(inspectionID)
        await this.inspectionLogSearchButton.click()
        await this.page.waitForSelector(this.inspectionsTable)
        const inspectionRows = await this.page.$$('table.table tbody tr')
        console.log('Number of inspection logs found:', inspectionRows.length); 
        if (inspectionRows.length == 1)
            {
                
            }
    }
}

