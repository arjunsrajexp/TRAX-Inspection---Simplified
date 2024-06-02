import { Page, Locator } from '@playwright/test'
export class inspectionLogsPage
{
    readonly page: Page
    constructor(page: Page) 
    {
        this.page = page
    }
}

