const { test, expect } = require('@playwright/test');
const path = require('path');

test('Quick UI & Regression Demo', async ({ page }) => {
  // 1. Open the local HTML file
  const localFilePath = `file://${path.resolve(__dirname, 'index.html')}`;
  await page.goto(localFilePath);

  // 2. Regression Check: Ensure core branding/UI isn't broken
  await expect(page.locator('#headline')).toHaveText('Welcome to the App');

  // 3. Interaction Check: Click the button and check state
  const button = page.locator('#counter-btn');
  await button.click();
  
  // 4. Verification Check: Assert state updated correctly
  await expect(button).toHaveText('Clicked: 1');
});
