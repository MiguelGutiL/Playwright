import { test as base } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AdminPage, { adminPage } from '../pages/AdminPage'

export const test = base.extend({
    // Definimos el fixture 'loginPage'
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    dashboardPage: async ({page}, use) =>{
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },
    adminPage: async({page}, use) =>{
        const adminPage = new AdminPage(page);
        await use(adminPage);
    }
});

export { expect } from '@playwright/test';