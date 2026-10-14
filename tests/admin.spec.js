import { test, expect } from '../fixtures/baseTest';
import { USERS } from '../data/users';
import adminPage from '../pages/adminPage';
import dashboardPage from '../pages/DashboardPage';

test.describe('Admin Page', ()=>{

    test.beforeEach(async({loginPage, dashboardPage})=>{
        await loginPage.goto();
        await loginPage.login(USERS.admin.username, USERS.admin.password);
        await dashboardPage.leftMenuOptions.first().click();
    });

    test('Create a new admin user', async({dashboardPage, adminPage, page})=>{
       await dashboardPage.leftMenu.waitFor({ state: 'visible' });
       await adminPage.addBtn.click(); 
       await expect(page).toHaveURL('/web/index.php/admin/saveSystemUser'); 
        
    });

});