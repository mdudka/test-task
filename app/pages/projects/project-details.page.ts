import { expect } from '@playwright/test';
import { AppPage } from '../../abstractPage';

export class ProjectDetailsPage extends AppPage {
    public pagePath = '/projects/';

    async expectLoaded() {
        await expect(this.page.getByRole('heading', { name: 'Project Information' })).toBeVisible();
    }

    async expectSuccessMessage() {
        await expect(this.page.getByText('Project was successfully')).toBeVisible();
    }

    async expectProjectName(name: string) {
        await expect(this.page.getByRole('heading', { name })).toBeVisible();
    }

    async expectJurisdiction(jurisdiction: string) {
        await expect(this.page.getByText(`Jurisdiction: ${jurisdiction}`)).toBeVisible();
    }

    async expectCreatedBy(creator: string) {
        await expect(this.page.getByText(`Created by: ${creator}`)).toBeVisible();
    }

    async expectStreetAddress(address: string) {
        await expect(this.page.getByText(`Street Address: ${address}`)).toBeVisible();
    }
}
