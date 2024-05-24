const { test, expect, beforeEach, describe } = require("@playwright/test");
const {
  login,
  createBlog,
  viewBlog,
  likeBlog,
  removeBlog,
} = require("./helper");
describe("Bloglist", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "NAME",
        username: "USERNAME",
        password: "PASSWORD",
      },
    });
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "NAME2",
        username: "USERNAME2",
        password: "PASSWORD2",
      },
    });

    await page.goto("http://localhost:5173");
    // Listen for all console logs
    page.on("console", (msg) => console.log(msg.text()));
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Login").first()).toBeVisible();
    await expect(page.getByText("Login").last()).toBeVisible();
    await expect(page.getByText("Username")).toBeVisible();
    await expect(page.getByText("Password")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      login(page, "USERNAME", "PASSWORD");
      await expect(page.getByText("NAME has logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      login(page, "WRONG", "WRONG");
      await expect(page.getByText("wrong credentials")).toBeVisible();
    });
  });
  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await login(page, "USERNAME", "PASSWORD");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "Example Title", "Example Author", "Example Url");
      await expect(
        page
          .getByTestId("blog-view-default")
          .getByText("Example Title by Example Author")
      ).toBeVisible();
    });
    test("a blog can be liked", async ({ page }) => {
      await createBlog(page, "Example Title", "Example Author", "Example Url");
      await viewBlog(page, "Example Title");
      await likeBlog(page, "Example Title");
      await expect(
        page
          .getByTestId("blog-view-expanded")
          .getByText("Example Title")
          .locator("..")
          .getByText("likes: 1")
      ).toBeVisible();
    });
    test("a blog can be removed", async ({ page }) => {
      await createBlog(page, "Example Title", "Example Author", "Example Url");
      await viewBlog(page, "Example Title");
      await expect(page.getByText("remove")).toBeVisible();
      page.on("dialog", (dialog) => {
        dialog.accept();
      });
      await removeBlog(page, "Example Title");
      await expect(
        page.getByTestId("blog-view-expanded").getByText("Example Title")
      ).toBeHidden();
    });
    test("remove button only visible to correct user", async ({ page }) => {
      await createBlog(page, "Example Title", "Example Author", "Example Url");
      await page.getByText("logout").click();
      await login(page, "USERNAME2", "PASSWORD2");
      await viewBlog(page, "Example Title");
      await expect(
        page.getByTestId("blog-view-expanded").getByText("Example Title")
      ).toBeVisible();
      await expect(page.getByText("remove")).toBeHidden();
    });
    test("blogs are sorted by likes", async ({ page }) => {
      await createBlog(page, "NO LIKES", "AUTHOR", "URL");

      await createBlog(page, "MOST LIKES", "AUTHOR", "URL");
      await viewBlog(page, "MOST LIKES");
      for (let i = 0; i < 6; i++) {
        await likeBlog(page, "MOST LIKES");
      }
      await createBlog(page, "SOME LIKES", "AUTHOR", "URL");
      await viewBlog(page, "SOME LIKES");
      for (let i = 0; i < 3; i++) {
        await likeBlog(page, "SOME LIKES");
      }
      const blogs = await page.getByTestId("blog-view-default").or(page.getByTestId("blog-view-expanded")).all()
      await expect(blogs[0]).toContainText("MOST LIKES")
    });
  });
});
