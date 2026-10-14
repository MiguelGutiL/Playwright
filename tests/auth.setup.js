import { test as setup, expect } from '@playwright/test';
import { USERS } from '../data/users';

//file where the session state is saved (cookies/localStorage)
const authFile = 'playwright/.auth/user.json';

setup('API authentication', async({request})=>{
    //make the post request
    const response = await request.post('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',{
        data:{
            username: USERS.admin.username,
            password: USERS.admin.password
        }
    });

    //validate the API answer
    expect(response.ok()).toBeTruthy();

    //
});
