import { expect } from "@playwright/test";

export class dashboardPage{
    constructor(page){
        this.page = page;
        this.userHM = page.locator('span[data-v-bdd6d943]');
        this.searchTextBox = page.locator('div.oxd-main-menu-search input[class="oxd-input oxd-input--active"]');
        this.leftMenu = page.locator('ul[class="oxd-main-menu"]');
        this.leftMenuOptions = page.locator('li[class="oxd-main-menu-item-wrapper"] span');
        this.titlePage = page.locator('h6.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module')
    }


    async eachOption(){
        const menuOptionsArray = await this.leftMenuOptions.all();
        for (const menu of menuOptionsArray) {
            // [Opcional] Espera 1 segundo ANTES de hacer clic para ver qué botón va a tocar
            await this.page.waitForTimeout(1000);
    
            // Hacemos clic en la opción del menú
            await menu.click();
            
            // 2. Espera asertiva: Esperamos a que el título cambie y sea visible
            await expect(this.titlePage).toBeVisible({ timeout: 5000 });
            
            // Extraemos el texto del título para llevar el control en la consola
            const titleText = await this.titlePage.textContent();
            console.log(`Visualizando página: ${titleText}`);
    
            // 3. LA ESPERA CLAVE: Pausa el test 2 segundos para que puedas ver el resultado en pantalla
            await this.page.waitForTimeout(2000); 
        }
    }

    async clickOnEachOption(){
        // Filtrar para excluir cualquier elemento que contenga "Maintenance"
        const filteredOptions = this.leftMenuOptions.filter({ 
            hasNotText: 'Maintenance' 
        });

        await filteredOptions.first().waitFor({ state: 'visible' });
        const count = await filteredOptions.count();

        for (let i = 0; i < count; i++) {
            const menu = filteredOptions.nth(i);
            await menu.waitFor({ state: 'visible' });
            await menu.click();
            
            await expect(this.titlePage).toBeVisible();
            console.log(await this.titlePage.textContent());
        }
    }
}

export default dashboardPage;