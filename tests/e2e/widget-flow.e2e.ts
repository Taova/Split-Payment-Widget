import { test, expect } from "@playwright/test";

test.describe("Widget full interaction flow", () => {
  test("modal opens/closes and selected value updates", async ({ page }) => {
    // 1. Navigate to the test page
    await page.goto("http://localhost:5173");

    // Optionally render SeQuraWidget if it's not already initialized on page load
    // await page.evaluate(() => {
    //   // @ts-ignore
    //   window.SeQuraWidget.render({ containerId: "widget", price: 30000 });
    // });

    // Expect initial widget button to be visible with correct pricing
    await expect(
      page.getByRole("button", { name: /3 cuotas de 105/i }),
    ).toBeVisible();

    // 2. Open the modal by clicking "Más info"
    const infoButton = await page.getByRole("button", { name: /más info/i });
    await infoButton.click();

    // Wait for transition animation to complete
    await page.waitForTimeout(600);

    // Expect modal to be visible
    await expect(page.locator('[role="dialog"]')).toHaveAttribute(
      "data-headlessui-state",
      "open",
    );

    // 3. Click outside the modal to close it (simulate clicking the overlay)
    await page.mouse.click(10, 10);
    await page.waitForTimeout(600); // wait for close transition

    // Confirm that modal has been removed from the DOM
    await expect(page.locator('[role="dialog"]')).toHaveCount(0);

    // --- Price update scenario ---
    // Update the widget price via exposed API
    await page.evaluate(() => {
      // @ts-ignore
      window.SeQuraWidget.update(60000);
    });

    // Expect the updated pricing option to appear
    await expect(
      page.getByRole("button", { name: /3 cuotas de 207,5/i }),
    ).toBeVisible();
  });
});
