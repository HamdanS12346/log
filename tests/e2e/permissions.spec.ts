import { expect, test } from "@playwright/test";

test.describe("owner habit logging", () => {
  test("owner can mark a visible date green and see it persist after returning", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Email").fill("hamdanshaikh11133@gmail.com");
    await page.getByLabel("Password").fill("mybumispurple");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/\/log$/);
    await expect(page.getByRole("main", { name: /habit calendar/i })).toBeVisible();

    const targetDate = page.getByRole("button", { name: /today|select date/i }).first();
    await targetDate.click();
    await page.getByRole("button", { name: "Green" }).click();

    await expect(page.getByText(/saved/i)).toBeVisible();
    await page.reload();
    await expect(page.getByRole("button", { name: /green/i }).first()).toBeVisible();
  });

  test("owner can change an existing date from red to green", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Email").fill("hamdanshaikh11133@gmail.com");
    await page.getByLabel("Password").fill("mybumispurple");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/\/log$/);
    await page.getByRole("button", { name: /select date/i }).first().click();
    await page.getByRole("button", { name: "Red" }).click();
    await expect(page.getByText(/saved/i)).toBeVisible();

    await page.getByRole("button", { name: /red/i }).first().click();
    await page.getByRole("button", { name: "Green" }).click();
    await expect(page.getByRole("button", { name: /green/i }).first()).toBeVisible();
  });
});

test.describe("viewer habit calendar permissions", () => {
  test("viewer can see logged statuses without edit controls", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Email").fill("viewer@example.com");
    await page.getByLabel("Password").fill("viewer-password");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/\/log$/);
    await expect(page.getByRole("main", { name: /habit calendar/i })).toBeVisible();
    await expect(page.getByRole("button", { name: "Red" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Green" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /select date/i })).toHaveCount(0);
  });
});
