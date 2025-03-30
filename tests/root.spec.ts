import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test.describe("Root", () => {
  test("routes to cat locale", async ({ page }) => {
    await expect(page).toHaveURL("http://localhost:3000/cat");
  });

  test("routes to Barcelona when clicking Començar", async ({ page }) => {
    await page.getByText("Començar").click();

    await expect(page).toHaveURL("http://localhost:3000/cat/weather/080193");
  });
});
