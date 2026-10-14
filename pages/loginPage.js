import { adminPage } from "./adminPage";


export class loginPage{
    constructor(page){
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginBtn = page.getByRole('button',{name:'Login'});
        this.errorMsg = page.getByText('Invalid credentials',{exact:true});
        this.requiredMsg = page.getByText('Required',{exact:true});
        this.userDropdown = page.locator('span.oxd-userdropdown-tab i');
        this.logoutBtn = page.locator('a[href="/web/index.php/auth/logout"]');
        this.disableUserMsg = page.getByText('Account disabled',{exact:true})
    }

    async goto(){
        await this.page.goto('')
    }

    async login(username, password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }

    async loginWithKeyword(username, password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.passwordInput.press('Enter');
    }

    async invLoginReqMsg(username){
        await this.usernameInput.fill(username);
        await this.loginBtn.click();
    }

    async invLoginReqMsgUsername(password){
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }

    async logout(){
        await this.userDropdown.click();
        await this.page.waitForTimeout(500); 
        await this.logoutBtn.click();
    }
}

export default loginPage;