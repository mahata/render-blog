import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";
import { StubUsersRepository } from "../../StubRepos";
import { useAuthRepository } from "../../repository/useAuthRepository";
import { vi } from "vitest";

vi.mock("../../repository/useAuthRepository");

describe("Header", () => {
  const stubUserRepository = new StubUsersRepository();

  beforeEach(() => {
    stubUserRepository.getMe.mockResolvedValue({
      uname: "Yasunori MAHATA",
      email: "mahata777@gmail.com",
    });
  });

  describe("Login", () => {
    it("shows 'Post' button when the user is logged in", async () => {
      vi.mocked(useAuthRepository).mockReturnValue({
        isAuthed: vi.fn().mockResolvedValue({ authed: true }),
      });

      render(<Header />, {
        wrapper: MemoryRouter,
      });

      expect(
        await screen.findByRole("button", { name: "Post" }),
      ).toBeInTheDocument();
    });

    it("shows 'Login' button when the user is NOT logged in", async () => {
      vi.mocked(useAuthRepository).mockReturnValue({
        isAuthed: vi.fn().mockResolvedValue({ authed: false }),
      });

      render(<Header />, {
        wrapper: MemoryRouter,
      });

      expect(
        await screen.findByRole("button", { name: "Login" }),
      ).toBeInTheDocument();
    });
  });

  describe("Service Logo", () => {
    it("is in the header", async () => {
      render(<Header />, {
        wrapper: MemoryRouter,
      });

      const logo = await screen.findByRole("img", { name: "Site Logo" });

      expect(logo).toBeInTheDocument();
    });

    it("is linked to '/'", async () => {
      render(<Header />, {
        wrapper: MemoryRouter,
      });

      const logoLink = (await screen.findByRole("link", {
        name: "Site Logo",
      })) as HTMLAnchorElement;

      expect(logoLink).toBeInTheDocument();
      expect(logoLink.href).toBe(window.location.origin + "/");
    });
  });
});
