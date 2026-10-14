import { test, expect } from '../fixtures/baseTest';
import { USERS } from '../data/users';

//positivo
test('TC-LOG-001 - Log-in successfully with admin credentials', async({loginPage, page}) =>{
    //navigate to the basepage
    await loginPage.goto();
    //Use the username and password for the admin user
    await loginPage.login(USERS.admin.username, USERS.admin.password);
    //verification
    await expect(page).toHaveURL('/web/index.php/dashboard/index');
});

//positivo
test('TC-LOG-002 - Support for case-sensitive passwords', async({loginPage, page})=>{
    await loginPage.goto();
    await loginPage.login(USERS.normalUser.username, USERS.normalUser.password);
    await expect(page).toHaveURL('/web/index.php/dashboard/index');
    await loginPage.logout();
    await expect(page).toHaveURL('/web/index.php/auth/login');
});

//negativo
test('TC-LOG-003 - Automatic trim in the user field', async({loginPage})=>{
    await loginPage.goto();
    await loginPage.login(USERS.trimuser.username, USERS.trimuser.password);
    await expect(loginPage.errorMsg).toBeVisible();
});

//positivo
test('TC-LOG-004 - Navigation using the enter keyword', async({loginPage, page})=>{
    await loginPage.goto();
    await loginPage.loginWithKeyword(USERS.admin.username, USERS.admin.password);
    await expect(page).toHaveURL('/web/index.php/dashboard/index');
});

//negativo
test('TC-LOG-005 - Show an error with invalid credentials', async({loginPage}) =>{
    await loginPage.goto();
    await loginPage.login(USERS.invalidCredentials.username, USERS.invalidCredentials.password);
    await expect(loginPage.errorMsg).toBeVisible();
});

//negativo
test('TC-LOG-006 - Show the required message when the user does not type the username and/or password', async({loginPage}) =>{
    await loginPage.goto();
    await loginPage.loginBtn.click();
    await expect(loginPage.requiredMsg.nth(0)).toBeVisible();
    await expect(loginPage.requiredMsg.nth(1)).toBeVisible();
});

//negativo
test('TC-LOG-007 - Validate the username field empty and show the required message', async({loginPage})=>{
    await loginPage.goto();
    await loginPage.invLoginReqMsgUsername(USERS.admin.password);
    await expect(loginPage.requiredMsg).toBeVisible();
});

//negativo
test('TC-LOG-008 - Validate the password field empty and show the required message', async({loginPage})=>{
    await loginPage.goto();
    await loginPage.invLoginReqMsg(USERS.admin.username);
    await expect(loginPage.requiredMsg).toBeVisible();
});

//negativo
test('TC-LOG-009 - Showing an error message when the user is desable', async({loginPage})=>{
    await loginPage.goto();
    await loginPage.login(USERS.disableUser.username, USERS.disableUser.password);
    await expect(loginPage.disableUserMsg).toBeVisible();
});

//Casos limite
test.skip('TC-LOG-010 - Maximum longth characters in ghe user field', async({loginPage})=>{
    await loginPage.goto();

});

//Casos limite
test.skip('TC-LOG-011 - Type special characters and unicodes in the fields', async({loginPage})=>{

});

//Seguridad
test('TC-LOG-012 - Prevent SQL inyection in the login form', async({loginPage})=>{
    await loginPage.goto();
    await loginPage.login("' OR '1'='1' --",'test123456')
    await expect(loginPage.errorMsg).toBeVisible();
});

//Seguridad
test('TC-LOG-013 - Prevent the Cross-Site Scripting', async({loginPage})=>{
    await loginPage.goto();
    await loginPage.login("<script>alert('xss')</script>",'test123456')
    await expect(loginPage.errorMsg).toBeVisible();
});

//Seguridad
test('TC-LOG-014 - Password masking when the user type it in the password field', async({loginPage})=>{
    await loginPage.goto();
    await loginPage.passwordInput.fill('test');
    await expect(loginPage.passwordInput).toHaveAttribute('type','password');
});