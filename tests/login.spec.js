import { test, expect } from '../fixtures/baseTest';
import { USERS } from '../data/users';

test('Log-in successfully with admin credentials', async({loginPage, page}) =>{
    //navigate to the basepage
    await loginPage.goto();
    //Use the username and password for the admin user
    await loginPage.login(USERS.admin.username, USERS.admin.password);
    //verification
    await expect(page).toHaveURL('/dashboard/index');
});

