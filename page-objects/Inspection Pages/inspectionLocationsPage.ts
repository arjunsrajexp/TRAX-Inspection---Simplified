import { Page, Locator } from '@playwright/test'
export class inspectionLocationsPage {
    readonly page: Page
    inspectNowButton: Locator

    constructor(page: Page) {
        this.page = page
        this.inspectNowButton = page.locator('div').filter({ hasText: /^Inspect Now$/ }).locator('i')
    }
    
    /**Initiates an Inspection for the specified location instantly
     * @param Location: Name of the Location for which Inspection needs to be performed
     */
    async createInspection(Location: string) {
        await this.page.getByRole('cell', { name: Location }).click()
        await this.inspectNowButton.click()
    }

} 