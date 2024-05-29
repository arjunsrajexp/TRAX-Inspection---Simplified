import { Page, Locator } from '@playwright/test'
export class HomePage {
    readonly page: Page
    expandedSideMenu: Locator
    sideMenuToggleButton: Locator
    sideMenuTreeView: Locator
    openedSideMenu: Locator

    constructor(page: Page) {
        this.page = page
        this.expandedSideMenu = page.locator('#main-sidebar')
        this.sideMenuToggleButton = page.getByRole('button', { name: "Toggle navigation" })
        this.sideMenuTreeView = page.locator('.treeview')
        this.openedSideMenu = page.locator('.treeview-menu.menu-open');
    }

    /**
     * Opens the Side Navigation Menu and clicks on the required Menu Item
     * @param menuItem: The Text of the Menu Item to be clicked (e.g: Facilities)
     * @param subMenuItem: Optional attribute when submenu is to be clicked under main menu
     */
    async ClickMenu(menuItem: string, subMenuItem?: string) {
        if (await this.expandedSideMenu.isHidden()) //Click to Open the Side Navigation Menu only if it is not already opened
        {
            await this.sideMenuToggleButton.click()
        }
        await this.sideMenuTreeView.getByText(menuItem, { exact: true }).click()
        if (subMenuItem != undefined) {
            await this.openedSideMenu.getByRole('link', { name: `● ${subMenuItem}` }).click()
        }
    }
}