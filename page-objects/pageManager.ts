import { Page } from '@playwright/test'
import { LoginPage } from './loginPage'
import { HomePage } from './homePage'
import { inspectionLocationsPage } from './inspectionLocationsPage'
import { inspectionPage } from './inspectionPage'
import { inspectionLogsPage } from './inspectionLogsPage'
export class PageManager
 {
    private readonly page: Page

    private readonly login: LoginPage
    private readonly home: HomePage
    private readonly inspectionLocations: inspectionLocationsPage
    private readonly inspection: inspectionPage
    private readonly inspectionLog: inspectionLogsPage

    constructor(page: Page) {
        this.page = page
        this.login = new LoginPage(this.page)
        this.home = new HomePage(this.page)
        this.inspectionLocations = new inspectionLocationsPage(this.page)
        this.inspection = new inspectionPage(this.page)
        this.inspectionLog = new inspectionLogsPage(this.page)
    }

    /** Methods below will return the object of the corresponding class */
    loginPage() { return this.login }

    homePage() { return this.home }

    inspectionLocationsPage() { return this.inspectionLocations }

    inspectionPage() { return this.inspection }

    inspectionLogsPage() { return this.inspectionLog }
}