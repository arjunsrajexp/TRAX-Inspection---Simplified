import { Page } from '@playwright/test'
import { LoginPage } from './loginPage'
import { HomePage } from './homePage'
import { inspectionLocationsPage } from './Inspection Pages/inspectionLocationsPage'
import { inspectionPage } from './Inspection Pages/inspectionPage'
import { inspectionLogsListPage } from './Inspection Pages/inspectionLogsListPage'
import { inspectionLogDetailPage } from './Inspection Pages/inspectionLogDetailpage'
import { inspectionOverviewPage } from './Inspection Pages/inspectionOverviewPage'
export class PageManager
 {
    private readonly page: Page

    private readonly login: LoginPage
    private readonly home: HomePage
    private readonly inspectionLocations: inspectionLocationsPage
    private readonly inspection: inspectionPage
    private readonly inspectionLogList: inspectionLogsListPage
    private readonly inspectionLogDetail: inspectionLogDetailPage
    private readonly inspectionOverview: inspectionOverviewPage

    constructor(page: Page) {
        this.page = page
        this.login = new LoginPage(this.page)
        this.home = new HomePage(this.page)
        this.inspectionLocations = new inspectionLocationsPage(this.page)
        this.inspection = new inspectionPage(this.page)
        this.inspectionLogList = new inspectionLogsListPage(this.page)
        this.inspectionLogDetail = new inspectionLogDetailPage(this.page)
        this.inspectionOverview = new inspectionOverviewPage(this.page)
    }

    /** Methods below will return the object of the corresponding class */
    loginPage() { return this.login }

    homePage() { return this.home }

    inspectionLocationsPage() { return this.inspectionLocations }

    inspectionPage() { return this.inspection }

    inspectionLogsPage() { return this.inspectionLogList }

    inspectionLogDetailPage() { return this.inspectionLogDetail}

    inspectionOverviewPage() { return this.inspectionOverview}
}