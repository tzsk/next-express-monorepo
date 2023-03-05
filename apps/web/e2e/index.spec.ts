import { test, expect } from '@playwright/test';

test('should load the tasks', async ({ page }) => {
  const task = { id: 1, title: 'Example Task', completed: false };
  await page.route(
    RegExp('http://localhost:9000/trpc/fetchAllTodo(.*)'),
    async (route) => {
      const json = [{ result: { data: [task] } }];
      await route.fulfill({ json });
    }
  );

  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/');
  // Find an element with the text 'About Page' and click on it
  // await page.click('text=About Page');
  // The new url should be "/about" (baseURL is used there)
  // await expect(page).toHaveURL('/about');
  // The new page should contain an h1 with "About Page"
  await expect(page.locator('h2')).toContainText('Todo App');
  await expect(page.locator('[data-test-id="todo-item"]')).toContainText(
    task.title
  );
});
