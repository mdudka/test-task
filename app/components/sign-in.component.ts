import { expect } from '@playwright/test';
import { Component } from '../abstractPage';

export class SignInModal extends Component {
    private emailField = this.page.getByRole('textbox', { name: 'Email address Email address' });
    private passwordField = this.page.getByRole('textbox', { name: 'Password Password' });
    private loginButton = this.page.locator('input').filter({ hasText: 'Log in' });

    async expectLoaded() {
        await expect(this.loginButton).toBeVisible();
    }

    async fillSignInCredentials(email: string, password: string) {
        await this.emailField.click();
        await this.emailField.fill(email);
        await this.passwordField.click();
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async checkEmailValidationError(invalidEmail: string) {
        await this.emailField.click();
        await this.emailField.fill(invalidEmail);
        await this.passwordField.click();
        await expect(this.page.getByText('Please enter a valid email address').first()).toBeVisible();
    }
}
