import { expect, test } from '@playwright/test';

test('localized routes render without overflow or browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const locale of ['en', 'fa']) {
    for (const route of ['', '/dashboard', '/studio', '/library', '/settings']) {
      await page.goto(`/${locale}${route}`);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('html')).toHaveAttribute('dir', locale === 'fa' ? 'rtl' : 'ltr');
      await expect(page.locator('h1')).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
      ).toBeTruthy();
    }
  }
  expect(errors).toEqual([]);
});

test('create, persist, search, export and delete a concept', async ({ page }) => {
  await page.goto(
    '/en/studio?brief=A thoughtful coffee brand for curious people and slow mornings.',
  );
  await page.getByLabel('Project name', { exact: false }).fill('Quiet Coffee');
  await page.getByLabel('Who is it for?').fill('Design-minded coffee lovers');
  await page.getByRole('radio', { name: 'Warm & organic' }).check();
  await page.getByRole('button', { name: 'Find my direction' }).click();
  await expect(page.getByRole('heading', { name: 'Quiet Coffee', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Save to my projects', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Saved to my projects' })).toBeDisabled();
  await page.goto('/en/library');
  await page.getByPlaceholder('Search projects…').fill('Quiet Coffee');
  await expect(page.locator('.project-card')).toHaveCount(1);
  await page.locator('.project-card').click();
  await expect(page.getByRole('dialog')).toBeVisible();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export concept' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('boor-Quiet-Coffee.txt');
  await page.getByRole('button', { name: 'Delete project', exact: true }).click();
  await page.getByRole('button', { name: 'Delete project', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('.project-card')).toHaveCount(0);
  await page.reload();
  await page.getByPlaceholder('Search projects…').fill('Quiet Coffee');
  await expect(page.locator('.project-card')).toHaveCount(0);
});

test('profile persists and locale switching preserves the current route', async ({ page }) => {
  await page.goto('/en/settings');
  await page.getByLabel('Display name').fill('Mina');
  await page.getByLabel('Your creative role').fill('Product designer');
  await page.getByRole('button', { name: 'Save changes' }).click();
  await expect(page.getByRole('status')).toHaveText('Your preferences have been saved.');
  await page.reload();
  await expect(page.getByLabel('Display name')).toHaveValue('Mina');
  await page.getByRole('link', { name: 'تغییر زبان به فارسی' }).click();
  await expect(page).toHaveURL('/fa/settings');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.getByLabel('نام نمایشی')).toHaveValue('Mina');
});

test('landing call to action opens studio and sample cards open details', async ({ page }) => {
  await page.goto('/en');
  await page.getByRole('link', { name: 'Find your spark' }).first().click();
  await expect(page).toHaveURL('/en/studio');
  await page.goto('/en');
  await page.locator('.showcase-card').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(
    page.getByRole('dialog').getByRole('heading', { name: 'FORM', exact: true }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
