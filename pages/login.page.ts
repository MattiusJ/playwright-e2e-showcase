export const LoginPage = {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    errorMessage: '[data-test="error"]',
    errorButton: '[data-test="error-button"]',
    invalidLoginErrorMessage: 'Epic sadface: Username and password do not match any user in this service',
    noAccessErrorMessage: `Epic sadface: You can only access '/inventory.html' when you are logged in.`,
    lockedUserErrorMessage: 'Epic sadface: Sorry, this user has been locked out.',
    usernameRequiredErrorMessage: 'Epic sadface: Username is required',
    passwordRequiredErrorMessage: 'Epic sadface: Password is required',
}