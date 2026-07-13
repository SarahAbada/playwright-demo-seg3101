const { test, expect, chromium } = require('@playwright/test');
const path = require('path');

test('Quick UI & Regression Demo', async () => {
  // 1. Launch a browser manually inside the test to inject slowMo
  const browser = await chromium.launch({ slowMo: 1000 });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 2. Open the local HTML file
  const localFilePath = `file://${path.resolve(__dirname, 'index.html')}`;
  await page.goto(localFilePath);

  // 3. Regression Check: Ensure core branding/UI isn't broken
  await expect(page.locator('#headline')).toHaveText('Welcome to the App');

  // 4. Interaction Check: Click the button
  const button = page.locator('#counter-btn');
  await button.click();
  
  // 5. Verification Check: Assert state updated correctly
  await expect(button).toHaveText('Clicked: 1');

  // Clean up
  await browser.close();
});