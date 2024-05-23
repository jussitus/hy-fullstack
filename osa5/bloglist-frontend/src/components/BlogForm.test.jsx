import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import { beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

describe("<BlogForm />", () => {
  let container;
  let createBlog;

  beforeEach(() => {
    createBlog = vi.fn();
    container = render(<BlogForm createBlog={createBlog} />).container;
  });

  test("calls createBlog", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText("new blog"));

    const titleInput = container.querySelector("#title-input");
    const authorInput = container.querySelector("#author-input");
    const urlInput = container.querySelector("#url-input");

    await user.type(titleInput, "TITLE");
    await user.type(authorInput, "AUTHOR");
    await user.type(urlInput, "URL");

    await user.click(container.querySelector("#save-button"));

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("TITLE");
    expect(createBlog.mock.calls[0][0].author).toBe("AUTHOR");
    expect(createBlog.mock.calls[0][0].url).toBe("URL");
  });
});
