

export class loginPage{
    constructor(page){
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginBtn = page.locator('button[type="submit"]');
    }

    async goto(){
        await page.goto('')
    }

    async login(username, password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
        
    }
}