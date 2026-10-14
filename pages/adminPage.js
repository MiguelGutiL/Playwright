import { expect } from "@playwright/test";

export class adminPage{
    constructor(page){
        this.addBtn = page.getByRole('button',{name:' Add '});
        
        //add user form
        this.userRoleAndStatusDD = page.getByRole('combobox',{name:'-- Select --'});
        this.employeeNameInput = page.getByRole('textbox',{name:'-- Select --'});
    }

    async chooseOption(){
        await this.userRoleAndStatusDD.first().
    };
}

export default adminPage;