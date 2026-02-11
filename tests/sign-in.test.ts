import { test } from '../fixtures';

test.beforeEach(async ({ app }) => {
    await app.landing.open();
});

test('Should sign in with valid credentials', async ({ app }) => {
    await app.landing.signInWithValidUser('bacos38210@aixind.com', '123123');
});

test('Should not sign in with invalid email', async ({ app }) => {
    await app.landing.signInWithInvalidCredentials('invalid.email@invalid.domain', '123123');
});

test('Should not sign in with invalid password', async ({ app }) => {
    await app.landing.signInWithInvalidCredentials('bacos38210@aixind.com', 'wrong-password');
});

test('Should show validation error for invalid email format', async ({ app }) => {
    await app.landing.openLoginModal();
    await app.landing.signInModal.checkEmailValidationError('invalid-email');
    await app.landing.signInModal.checkEmailValidationError('invalid-email@');
    await app.landing.signInModal.checkEmailValidationError('invalid-email@domain');
});
