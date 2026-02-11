import { expect } from '@playwright/test';
import { AppPage } from '../../abstractPage';

export class ProjectsPage extends AppPage {
    public pagePath = '/projects';

    private createCustomProjectLink = this.page.getByRole('link', {
        name: 'Create Custom Project',
    });

    async expectLoaded() {
        await expect(this.createCustomProjectLink).toBeVisible();
    }

    async clickCreateCustomProject() {
        await this.createCustomProjectLink.click();
    }

    async expectProjectInList(projectName: string) {
        await expect(this.page.getByRole('link', { name: projectName })).toBeVisible();
    }

    async expectProjectCardVisible(projectName: string, status: string, address: string) {
        await expect(this.page.getByText(`${projectName} ${status} ${address}`)).toBeVisible();
    }
}
