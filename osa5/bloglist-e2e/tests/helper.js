const login = async (page, username, password) => {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url) => {
  if (!(await page.getByTestId("title").isVisible())) {
    await page.getByRole("button", { name: "new blog" }).click();
  }

  await page.getByTestId("title").fill(title);
  await page.getByTestId("author").fill(author);
  await page.getByTestId("url").fill(url);
  await page.getByRole("button", { name: "save" }).click();
  await page.getByTestId("blog-view-default").getByText(title).waitFor()
};

const viewBlog = async (page, title) => {
  await page
    .getByTestId("blog-view-default")
    .getByText(title)
    .getByRole("button", { name: "view" })
    .click();
};

const likeBlog = async (page, title) => {
  await page
    .getByTestId("blog-view-expanded")
    .getByText(title)
    .locator("..")
    .getByRole("button", { name: "like" })
    .click();
};

const removeBlog = async (page, title) => {
  await page
    .getByTestId("blog-view-expanded")
    .getByText(title)
    .locator("..")
    .getByRole("button", { name: "remove" })
    .click();
};

export { login, createBlog, viewBlog, likeBlog, removeBlog };
