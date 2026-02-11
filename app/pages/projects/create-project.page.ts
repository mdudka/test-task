import { expect } from '@playwright/test';
import { AppPage } from '../../abstractPage';

export interface ProjectData {
    jurisdictionId: string;
    projectName: string;
    addressSearchQuery: string;
    addressText: string;
    unitNumber?: string;
}

export class CreateProjectPage extends AppPage {
    public pagePath = '/projects/new';

    private jurisdictionCombobox = this.page.getByRole('combobox', { name: 'Jurisdiction' });
    private projectNameField = this.page.getByRole('textbox', { name: 'Name' });
    private addressSearchField = this.page.getByRole('textbox', { name: 'Search' });
    private unitNumberField = this.page.getByRole('textbox', { name: 'Optional' });
    private createProjectButton = this.page.getByRole('button', { name: 'Create Project' });

    async expectLoaded() {
        await expect(this.jurisdictionCombobox).toBeVisible();
        await expect(this.projectNameField).toBeVisible();
    }

    async selectJurisdiction(jurisdictionId: string) {
        await this.jurisdictionCombobox.click();
        const option = this.page.locator(`#project_jurisdiction_id-opt-${jurisdictionId}`);
        await option.click();
    }

    async fillProjectName(name: string) {
        await this.projectNameField.click();
        await this.projectNameField.fill(name);
    }

    async searchAndSelectAddress(searchQuery: string, addressText: string) {
        await this.addressSearchField.click();
        await this.addressSearchField.fill(searchQuery);
        await this.page.getByText(addressText).click();
    }

    async fillUnitNumber(unitNumber: string) {
        await this.unitNumberField.click();
        await this.unitNumberField.fill(unitNumber);
    }

    async createProject(projectData: ProjectData) {
        await this.selectJurisdiction(projectData.jurisdictionId);
        await this.fillProjectName(projectData.projectName);
        await this.searchAndSelectAddress(projectData.addressSearchQuery, projectData.addressText);
        if (projectData.unitNumber) {
            await this.fillUnitNumber(projectData.unitNumber);
        }
        await this.createProjectButton.click();
    }

    async expectRequiredFieldValidation(fieldName: 'jurisdiction' | 'projectName' | 'address') {
        const validationMessages = {
            jurisdiction: 'Jurisdiction is required',
            projectName: 'Project name is required',
            address: 'Address is required',
        };
        await expect(this.page.getByText(validationMessages[fieldName])).toBeVisible();
    }

    async expectCreateButtonDisabled() {
        await expect(this.createProjectButton).toBeDisabled();
    }

    async expectCreateButtonEnabled() {
        await expect(this.createProjectButton).toBeEnabled();
    }
}
