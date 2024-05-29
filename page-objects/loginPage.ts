import {Page, Locator} from '@playwright/test'
export class LoginPage
{
    readonly page: Page
    emailBox: Locator
    passwordBox: Locator
    signInButton: Locator
    
    constructor(page:Page)
    {
        this.page = page
        this.emailBox = page.getByLabel('Email')
        this.passwordBox = page.getByLabel('Password')
        this.signInButton = page.getByRole('button',{name:"Sign In"})
    }
    
    /**
     * Logs in to the application
     * @param userName - username in the format xxx@xxx.com
     * @param password  - user password
     */
    async Login(userName: string, password: string)
    {   
        await this.page.goto('/')
        await this.emailBox.fill(userName)
        await this.passwordBox.fill(password)
        await this.signInButton.click()
    }
}