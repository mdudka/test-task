import { expect } from '@playwright/test';
import { AppPage } from '../abstractPage';

export class HomePage extends AppPage {
    public pagePath = '/';

    async expectLoaded() {
        await expect(this.page.locator('[id="navbar"]')).toBeVisible();
    }
}
