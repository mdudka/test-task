import { test } from '../fixtures';

test.describe('Project Creation', () => {
    test.beforeEach(async ({ app }) => {
        await app.landing.open();
        await app.landing.signInWithValidUser('bacos38210@aixind.com', '123123');
    });

    test('Should create a new custom project successfully', async ({ app }) => {
        const timestamp = Date.now();
        const projectName = `Test Project ${timestamp}`;

        await app.navigation.navigateToProjects();
        await app.projects.expectLoaded();
        await app.projects.clickCreateCustomProject();

        await app.createProject.createProject({
            jurisdictionId: '1',
            projectName: projectName,
            addressSearchQuery: 'Kyiv',
            addressText: 'Kyiv Street, Springfield,',
            unitNumber: '5',
        });

        await app.projectDetails.expectSuccessMessage();
        await app.projectDetails.expectProjectName(projectName);
        await app.projectDetails.expectJurisdiction('Airway Heights');
        await app.projectDetails.expectCreatedBy('Bacos Bacos');
        await app.projectDetails.expectStreetAddress('Kyiv Street');

        await app.navigation.navigateToProjects();
        await app.projects.expectLoaded();
        await app.projects.expectProjectCardVisible(projectName, 'Draft', 'Kyiv Street');
        await app.projects.expectProjectInList(projectName);
    });

    test('Should validate required fields for project creation', async ({ app }) => {
        await app.navigation.navigateToProjects();
        await app.projects.expectLoaded();
        await app.projects.clickCreateCustomProject();

        await app.createProject.expectCreateButtonDisabled();

        await app.createProject.fillProjectName('Test Project');
        await app.createProject.expectCreateButtonDisabled();

        await app.createProject.selectJurisdiction('1');
        await app.createProject.searchAndSelectAddress('Kyiv', 'Kyiv Street, Springfield,');

        await app.createProject.expectCreateButtonEnabled();
    });

    test('Should create project without optional unit number', async ({ app }) => {
        const timestamp = Date.now();
        const projectName = `Test Project No Unit ${timestamp}`;

        await app.navigation.navigateToProjects();
        await app.projects.expectLoaded();
        await app.projects.clickCreateCustomProject();

        await app.createProject.createProject({
            jurisdictionId: '1',
            projectName: projectName,
            addressSearchQuery: 'Kyiv',
            addressText: 'Kyiv Street, Springfield,',
        });

        await app.projectDetails.expectSuccessMessage();
    });
});
