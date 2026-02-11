import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export abstract class PageHolder {
    constructor(protected page: Page) {}
}

export abstract class Component extends PageHolder {
    abstract expectLoaded(message?: string): Promise<void>;
}

export abstract class AppPage extends Component {
    /**
     * Path to the page can be relative to the baseUrl defined in playwright.config.ts
     * or absolute (on your own risk)
     */
    public abstract pagePath: string;

    async open(path?: string) {
        await this.page.goto(path ?? this.pagePath);
        await this.expectLoaded();
    }
}
