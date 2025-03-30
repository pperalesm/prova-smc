import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/cat/weather/080018");
});

test.describe("Weather", () => {
  test("has location name", async ({ page }) => {
    await expect(page.getByText("Abrera")).toBeVisible();
  });

  test("has current date in dd.mm.yyyy format", async ({ page }) => {
    const todayDateString = new Date().toLocaleDateString("cat", {
      timeZone: "Europe/Madrid",
    });

    await expect(
      page.getByText(
        todayDateString
          .split("/")
          .map((s) => s.padStart(2, "0"))
          .join("."),
      ),
    ).toBeVisible();
  });

  test("has date shorts", async ({ page }) => {
    await expect(page.getByText("Avui")).toBeVisible();

    await expect(page.getByText("Demà")).toBeVisible();

    const dayElements = await page.getByText(/^D(l|t|c|j|v|s|g)\./).all();

    expect(dayElements.length).toBeGreaterThanOrEqual(6);
  });
});
