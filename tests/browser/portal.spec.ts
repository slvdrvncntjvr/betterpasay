import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import services from '../../src/data/services.json' with { type: 'json' };
import documents from '../../src/data/documents.json' with { type: 'json' };

for (const path of [
  '/',
  '/services/',
  '/transparency/',
  '/about/',
  '/services/senior-citizen-id/',
  '/services/pwd-id/',
  '/city/',
  '/government/',
  '/barangays/',
  '/contact/',
  '/documents/',
  '/404.html',
]) {
  test(`${path} is readable, accessible and fits the viewport`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(path);
    await expect(page.locator('h1')).toBeVisible();
    await expect(
      page.getByRole('navigation', { name: 'Main navigation' }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      result.violations.map(({ id, nodes }) => ({
        id,
        elements: nodes.map(({ target }) => target),
      })),
    ).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test('search, category intersection, empty state and reset work together', async ({
  page,
}) => {
  await page.goto('/services/');
  const search = page.getByRole('searchbox', {
    name: 'Search public services',
  });
  await search.fill('sedula');
  await expect(page.locator('[data-service]:visible')).toHaveCount(1);
  await expect(page.getByRole('status')).toContainText('1 service');
  await page.getByRole('button', { name: 'Family & support' }).click();
  await expect(page.getByText('No matching services yet.')).toBeVisible();
  await expect(page.locator('[data-service]:visible')).toHaveCount(0);
  await page.getByRole('button', { name: 'Clear search and filters' }).click();
  await expect(page.locator('[data-service]:visible')).toHaveCount(
    services.length,
  );
  await expect(search).toBeFocused();
  await expect(page).toHaveURL(/\/services\/$/);
});

test('home search and shared filter URLs preserve the resident’s intent', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('searchbox').fill('trabaho');
  await page.getByRole('button', { name: 'Search services' }).click();
  await expect(page.locator('[data-service="job-openings"]')).toBeVisible();
  await expect(page.locator('[data-service="senior-citizen-id"]')).toBeHidden();
  await page.goto('/services/?q=permit&category=business');
  await expect(page.locator('[data-service]:visible')).toHaveCount(2);
  await page.reload();
  await expect(page.getByRole('searchbox')).toHaveValue('permit');
  await expect(
    page.getByRole('button', { name: 'Business & property' }),
  ).toHaveAttribute('aria-pressed', 'true');
});

test('queries render as text and invalid categories safely fall back', async ({
  page,
}) => {
  await page.goto(
    '/services/?category=unknown&q=%3Cscript%3Ealert(1)%3C%2Fscript%3E',
  );
  await expect(
    page.getByRole('button', { name: 'All services' }),
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('status')).toContainText(
    '<script>alert(1)</script>',
  );
  await expect(page.getByText('No matching services yet.')).toBeVisible();
});

test('keyboard users can skip navigation and operate resource disclosures', async ({
  page,
}) => {
  await page.goto('/transparency/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const summary = page.locator('summary').first();
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('details').first()).toHaveAttribute('open', '');
  await expect(page.locator('details').first().locator('time')).toHaveAttribute(
    'datetime',
    '2026-10-28',
  );
});

test('directory remains useful with JavaScript disabled', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322/services/');
  await expect(page.locator('[data-service]:visible')).toHaveCount(
    services.length,
  );
  await expect(page.locator('#directory-fallback')).toBeVisible();
  await expect(page.locator('#directory-controls')).toBeHidden();
  await context.close();
});

test('search initialization errors expose all services and a useful message', async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.URLSearchParams = class {
      constructor() {
        throw new Error('Simulated initialization failure');
      }
    } as unknown as typeof URLSearchParams;
  });
  await page.goto('/services/');
  await expect(page.getByRole('alert')).toContainText('Search could not start');
  await expect(page.locator('[data-service]:visible')).toHaveCount(
    services.length,
  );
});

test('service detail records link to sources and a correction workflow', async ({
  page,
}) => {
  await page.goto('/services/community-tax/');
  await expect(
    page.getByRole('link', { name: 'Read the official guide' }),
  ).toHaveAttribute('href', /https:\/\/pasay.gov.ph\/.*\.pdf/);
  await expect(page.getByText('Not stated by the source')).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Report a correction on GitHub' }),
  ).toHaveAttribute('href', /content-correction.yml/);
});

test('barangay search finds the exact neighborhood and restores all 201 records', async ({
  page,
}) => {
  await page.goto('/barangays/');
  const search = page.getByRole('searchbox', {
    name: 'Barangay number or PSA code',
  });
  await expect(page.locator('.barangay-card:visible')).toHaveCount(201);
  await search.fill('Barangay 201');
  await expect(page.locator('.barangay-card:visible')).toHaveCount(1);
  await page.locator('#barangay-201 summary').click();
  await expect(page.locator('#barangay-201')).toContainText('20,673');
  await expect(page.locator('#barangay-201 a').first()).toHaveAttribute(
    'href',
    /psa.gov.ph/,
  );
  await search.fill('999');
  await expect(page.locator('#no-results')).toBeVisible();
  await page.getByRole('button', { name: 'Clear', exact: true }).click();
  await expect(page.locator('.barangay-card:visible')).toHaveCount(201);
  await expect(search).toBeFocused();
});

test('document search intersects collections and links to original files', async ({
  page,
}) => {
  await page.goto('/documents/');
  const search = page.getByRole('searchbox', { name: 'Search the library' });
  await expect(page.locator('[data-document-card]:visible')).toHaveCount(
    documents.length,
  );
  await search.fill('PWD');
  expect(
    await page.locator('[data-document-card]:visible').count(),
  ).toBeGreaterThan(0);
  await page.locator('[data-collection="forms"]').click();
  await expect(page.locator('[data-document-card]:visible')).toHaveCount(0);
  await search.fill('');
  expect(
    await page.locator('[data-document-card]:visible').count(),
  ).toBeGreaterThan(0);
  for (const href of await page
    .locator('[data-document-card]:visible a')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')))) {
    expect(href).toMatch(
      /^(https:\/\/(?:www\.)?(?:pasay.gov.ph|pasaycitysecretariat.com)\/|\/services\/)/,
    );
  }
});

test('new service guides explain requirements and disclose their charter edition', async ({
  page,
}) => {
  await page.goto('/services/pwd-id/');
  await expect(page.locator('main')).toContainText('2026');
  await expect(
    page.getByRole('heading', { name: 'What to bring' }),
  ).toBeVisible();
  await expect(page.locator('main a[href*="#page=167"]').first()).toBeVisible();
});
