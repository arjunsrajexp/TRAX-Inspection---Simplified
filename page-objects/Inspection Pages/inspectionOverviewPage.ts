import { Page, Locator } from '@playwright/test'
export class inspectionOverviewPage {
    readonly page: Page
    venueFilter: Locator
    venueSearchBox: Locator
    applyFilterBtn: Locator
    inspectionID: string

    constructor(page: Page) {
        this.page = page
        this.venueFilter = page.getByText("Select Venue")
        this.venueSearchBox = page.getByRole('textbox', { name: 'multiselect-search' })
        this.applyFilterBtn = page.getByRole('button', { name: "Apply" })
    }

    /**Filters for the Required Venue in the Inspection Overview Screen
     * @param inspectionVenue : Venue which is to be filtered
     */
    async filterInspectionOverview(inspectionVenue: string) {
        await this.page.waitForResponse
            (response => response.url().includes('/inspection/overview/details/') && response.status() === 200);
        await this.venueFilter.click()
        await this.venueSearchBox.fill(inspectionVenue)
        await this.page.locator('#venue-multiselect').getByText(inspectionVenue, { exact: true }).click()
        await this.applyFilterBtn.click()

    }

    /**Expands the Filtered Inspection Venue and Checks whether the Performed Inspection ID is present in the page */
    async verifyInspectionOverview(inspectionVenue: string, id: string | undefined) {
        await this.page.getByRole('link', { name: `▶ ${inspectionVenue}` }).click(); //Expands the Venue to be verified in the Inspection Overview Page
        return (this.page.locator(`p:has-text("Inspection: #${id}")`)).isVisible();

    }

}