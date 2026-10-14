import { test, expect } from '../fixtures/baseTest';
import { USERS } from '../data/users';

test.describe('Dashbord Page', ()=>{

    test.beforeEach(async({loginPage, page, dashboardPage})=>{
       await loginPage.goto();
       await loginPage.login(USERS.admin.username, USERS.admin.password);
       //await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
       //await dashboardPage.searchTextBox.toBeEnabled();
       
    });

    test('Search the any left menu option', async({dashboardPage, page})=>{
        //await dashboardPage.
        await dashboardPage.searchTextBox.fill('Admin');
        expect(dashboardPage.leftMenu).toContainText('Admin');
        expect(dashboardPage.leftMenu).toHaveCount(1);
        //await page.waitForTimeout(5000)
        await dashboardPage.leftMenuOptions.click();
        expect(page).toHaveURL('/web/index.php/admin/viewSystemUsers');
        expect(dashboardPage.titlePage).toBeVisible();
        await page.waitForTimeout(2000);
        await dashboardPage.searchTextBox.fill('Dashboard');
        await dashboardPage.leftMenuOptions.click();

    });

    test('Validate that the user is able to enter in all options', async({dashboardPage})=>{
        await dashboardPage.clickOnEachOption();
    });
});

