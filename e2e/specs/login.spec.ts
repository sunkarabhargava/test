// test/specs/login.spec.js

describe('Login Page', () => {
    it('should let user login with valid credentials', async () => {
        await browser.url('https://example.com/login');

        const usernameInput = await $('#username');
        const passwordInput = await $('#password');
        const loginButton = await $('#login-button');

        await usernameInput.setValue('validUsername');
        await passwordInput.setValue('validPassword');
        await loginButton.click();

        // Assuming there is a dashboard or some element that appears after a successful login
        const dashboardElement = await $('#dashboard');
        await expect(dashboardElement).toBeDisplayed();
    });
});
