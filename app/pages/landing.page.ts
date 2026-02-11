import { expect } from '@playwright/test';
import { AppPage } from '../abstractPage';
import { HomePage } from './home.page';
import { SignInModal } from '../components/sign-in.component';

export class LandingPage extends AppPage {
    public pagePath = '/';

    public signInModal = new SignInModal(this.page);
    public homePage = new HomePage(this.page);

    private logInButton = this.page.getByRole('button', { name: 'Log In', exact: true });
    private acceptCookiesButton = this.page.getByRole('button', { name: 'Accept' });

    async expectLoaded() {
        await expect(this.page.getByRole('link', { name: 'Logo' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Request a demo' }).first()).toBeVisible();
        await this.acceptCookies();
    }

    async acceptCookies() {
        await this.acceptCookiesButton.click();
    }

    async openLoginModal() {
        await this.logInButton.click();
        await this.signInModal.expectLoaded();
    }

    async signInWithValidUser(email: string, password: string) {
        await this.openLoginModal();
        await this.signInModal.fillSignInCredentials(email, password);
        await this.homePage.expectLoaded();
    }

    async signInWithInvalidCredentials(email: string, password: string) {
        await this.openLoginModal();
        await this.signInModal.fillSignInCredentials(email, password);
        await expect(this.page.getByText('Invalid Email or password.')).toBeVisible();
    }
}
