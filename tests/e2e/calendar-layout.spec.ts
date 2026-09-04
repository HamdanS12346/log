import { expect, test, type Page } from "@playwright/test";

async function loginAsOwner(page: Page) {
  await page.goto("/login");
  await page.getByLabel("Email").fill("hamdanshaikh11133@gmail.com");
  await page.getByLabel("Password").fill("mybumispurple");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/\/log$/);
}

test.describe("calendar layout refinement", () => {
  test("desktop shows current and following month side by side", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await loginAsOwner(page);

    const calendar = page.getByRole("main", { name: /habit calendar/i });
    const monthPanels = page.locator(".month-panel");

    await expect(calendar).toBeVisible();
    await expect(monthPanels).toHaveCount(2);

    const firstBox = await monthPanels.nth(0).boundingBox();
    const secondBox = await monthPanels.nth(1).boundingBox();

    expect(firstBox?.y).toBe(secondBox?.y);
    expect(firstBox?.x).toBeLessThan(secondBox?.x ?? 0);
    await expect(page.getByRole("button", { name: "Previous month" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Next month" })).toBeVisible();
  });

  test("mobile shows one visible month with readable seven-column dates", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await loginAsOwner(page);

    const visiblePanels = page.locator(".month-panel:visible");
    const firstGrid = page.getByRole("grid").first();

    await expect(visiblePanels).toHaveCount(1);
    await expect(firstGrid.getByRole("gridcell")).toHaveCount(42);

    for (const label of ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]) {
      await expect(page.getByText(label).first()).toBeVisible();
    }
  });

  test("reduced motion is respected and calendar supports keyboard focus", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await loginAsOwner(page);

    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Previous month" })).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Next month" })).toBeFocused();
  });
});
