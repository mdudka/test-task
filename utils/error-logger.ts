import { Page, ConsoleMessage, Request, Response } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export interface ConsoleLog {
    type: string;
    text: string;
    location: string;
    timestamp: string;
}

export interface NetworkError {
    url: string;
    method: string;
    status: number;
    statusText: string;
    timestamp: string;
}

export class ErrorLogger {
    private consoleLogs: ConsoleLog[] = [];
    private networkErrors: NetworkError[] = [];
    private logDir = path.join(process.cwd(), 'test-results', 'error-logs');

    constructor(
        private page: Page,
        private testName: string,
    ) {
        this.setupConsoleLogging();
        this.setupNetworkLogging();
    }

    private setupConsoleLogging() {
        this.page.on('console', (msg: ConsoleMessage) => {
            if (msg.type() === 'error' || msg.type() === 'warning') {
                this.consoleLogs.push({
                    type: msg.type(),
                    text: msg.text(),
                    location: msg.location().url || 'unknown',
                    timestamp: new Date().toISOString(),
                });
            }
        });

        this.page.on('pageerror', error => {
            this.consoleLogs.push({
                type: 'pageerror',
                text: error.message,
                location: error.stack || 'unknown',
                timestamp: new Date().toISOString(),
            });
        });
    }

    private setupNetworkLogging() {
        this.page.on('response', async (response: Response) => {
            const status = response.status();
            if (status >= 400) {
                this.networkErrors.push({
                    url: response.url(),
                    method: response.request().method(),
                    status: status,
                    statusText: response.statusText(),
                    timestamp: new Date().toISOString(),
                });
            }
        });

        this.page.on('requestfailed', (request: Request) => {
            const failure = request.failure();
            this.networkErrors.push({
                url: request.url(),
                method: request.method(),
                status: 0,
                statusText: failure?.errorText || 'Request failed',
                timestamp: new Date().toISOString(),
            });
        });
    }

    getConsoleLogs(): ConsoleLog[] {
        return this.consoleLogs;
    }

    getNetworkErrors(): NetworkError[] {
        return this.networkErrors;
    }

    hasErrors(): boolean {
        return this.consoleLogs.length > 0 || this.networkErrors.length > 0;
    }

    async saveToFile() {
        if (!this.hasErrors()) {
            return;
        }

        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const sanitizedTestName = this.testName.replace(/[^a-z0-9]/gi, '_');
        const fileName = `${sanitizedTestName}_${timestamp}.json`;
        const filePath = path.join(this.logDir, fileName);

        const errorReport = {
            testName: this.testName,
            timestamp: new Date().toISOString(),
            consoleLogs: this.consoleLogs,
            networkErrors: this.networkErrors,
            summary: {
                totalConsoleErrors: this.consoleLogs.length,
                totalNetworkErrors: this.networkErrors.length,
            },
        };

        fs.writeFileSync(filePath, JSON.stringify(errorReport, null, 2));

        return filePath;
    }

    printSummary() {
        if (!this.hasErrors()) {
            console.log(`✓ No console or network errors detected for: ${this.testName}`);
            return;
        }

        console.log(`\n⚠️  Errors detected in: ${this.testName}`);
        console.log(`   Console errors/warnings: ${this.consoleLogs.length}`);
        console.log(`   Network errors: ${this.networkErrors.length}`);

        if (this.consoleLogs.length > 0) {
            console.log('\n   Console Errors:');
            this.consoleLogs.forEach((log, index) => {
                console.log(`   ${index + 1}. [${log.type}] ${log.text.substring(0, 100)}`);
            });
        }

        if (this.networkErrors.length > 0) {
            console.log('\n   Network Errors:');
            this.networkErrors.forEach((error, index) => {
                console.log(`   ${index + 1}. ${error.method} ${error.url} - ${error.status}`);
            });
        }
    }
}
