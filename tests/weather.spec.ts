import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/cat/weather");
});

test.describe("Weather", () => {
  test("has message to select new location", async ({ page }) => {
    await expect(
      page.getByText("No s'ha seleccionat cap municipi"),
    ).toBeVisible();
  });

  test("searches for new locations", async ({ page }) => {
    await page.getByText("Seleccionar municipi").click();

    await page.getByPlaceholder("Cercar municipi").fill("Barc");

    await expect(page.getByText("Barcelona")).toBeVisible();
  });

  test("routes to selected location when clicking Abrera", async ({ page }) => {
    await page.getByText("Seleccionar municipi").click();

    await page.getByText("Abrera").click();

    await expect(page).toHaveURL("http://localhost:3000/cat/weather/080018");
  });
});
