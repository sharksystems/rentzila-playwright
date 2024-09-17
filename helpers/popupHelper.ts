import { Page } from '@playwright/test';

export default async function closePopupIfVisible(page: Page) {
  const closeButton = page.locator('[data-testid="crossButton"]');
  
  if (await closeButton.isVisible({ timeout: 0 })) {
    await closeButton.click();
  }
}