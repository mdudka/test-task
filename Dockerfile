FROM mcr.microsoft.com/playwright:v1.58.2-jammy

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy test files
COPY . .

# Create directories for test results
RUN mkdir -p test-results playwright-report

# Run tests
CMD ["npx", "playwright", "test"]
