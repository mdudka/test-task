import { expect } from '@playwright/test';
import { Component } from '../abstractPage';

export class Navigation extends Component {
    private navbarHeader = this.page.locator('[id="navbar"]');
    private projectsNavLink = this.page.getByRole('link', { name: 'Projects Projects' });

    async expectLoaded() {
        await expect(this.navbarHeader).toBeVisible();
    }

    async navigateToProjects() {
        await this.navbarHeader.click();
        await this.projectsNavLink.click();
    }
}
