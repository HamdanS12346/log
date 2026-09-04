import { expect, test } from "@playwright/test";

test.describe("login page layout", () => {
  test("desktop shows branding beside the elevated form card", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/login");

    const container = page.getByLabel("Log authentication");
    const branding = page.getByLabel("Branding");
    const card = page.getByLabel("Login");

    await expect(page.getByRole("link", { name: "log home" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "This is just a calender" })).toBeVisible();
    await expect(page.getByText("nothing else")).toBeVisible();
    await expect(card.getByLabel("Email")).toBeVisible();
    await expect(card.getByLabel("Password")).toBeVisible();

    const containerBox = await container.boundingBox();
    const brandingBox = await branding.boundingBox();
    const cardBox = await card.boundingBox();

    expect(containerBox?.width).toBeGreaterThan(900);
    expect(brandingBox?.x).toBeLessThan(cardBox?.x ?? 0);
    expect(cardBox?.width).toBeGreaterThan(300);
  });

  test("mobile stacks branding above a full-width form card", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/login");

    const branding = page.getByLabel("Branding");
    const card = page.getByLabel("Login");

    await expect(page.getByRole("heading", { name: "This is just a calender" })).toBeVisible();
    await expect(card.getByRole("button", { name: "Login" })).toBeVisible();
    await expect(page.getByText("Don't have an account?")).toBeVisible();

    const brandingBox = await branding.boundingBox();
    const cardBox = await card.boundingBox();

    expect(cardBox?.y).toBeGreaterThan(brandingBox?.y ?? 0);
    expect(cardBox?.width).toBeGreaterThan(340);
  });
});

test.describe("signup and login", () => {
  test("new signup reaches the calendar as a viewer", async ({ page }) => {
    const email = `viewer-${Date.now()}@example.com`;

    await page.goto("/login");
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill("viewer-password");
    await page.getByRole("button", { name: "Sign up" }).click();

    await expect(page).toHaveURL(/\/log$/);
    await expect(page.getByRole("main", { name: /habit calendar/i })).toBeVisible();
    await expect(page.getByRole("button", { name: "Mark unsuccessful" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Mark successful" })).toHaveCount(0);
  });

  test("registered viewer can log in and reach the calendar", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("viewer@example.com");
    await page.getByLabel("Password").fill("viewer-password");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/\/log$/);
    await expect(page.getByRole("main", { name: /habit calendar/i })).toBeVisible();
  });

  test("invalid credentials show a clear login error", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("viewer@example.com");
    await page.getByLabel("Password").fill("wrong-password");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Email or password is incorrect.")).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("closing the browser context clears the active session", async ({ browser }) => {
    const firstContext = await browser.newContext();
    const firstPage = await firstContext.newPage();

    await firstPage.goto("/login");
    await firstPage.getByLabel("Email").fill("viewer@example.com");
    await firstPage.getByLabel("Password").fill("viewer-password");
    await firstPage.getByRole("button", { name: "Login" }).click();
    await expect(firstPage).toHaveURL(/\/log$/);
    await firstContext.close();

    const secondContext = await browser.newContext();
    const secondPage = await secondContext.newPage();

    await secondPage.goto("/log");
    await expect(secondPage).toHaveURL(/\/login$/);
    await secondContext.close();
  });
});
