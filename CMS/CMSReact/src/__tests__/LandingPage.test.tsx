import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import "@testing-library/jest-dom";
import MediaCard from "../LoginPage";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("MediaCard Component", () => {
  // Suppress console logs
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterAll(() => { 
    jest.restoreAllMocks();
  });

  test("renders the MediaCard component", () => {
    render(<MediaCard />);
    expect(
      screen.getByText("Consumption Management System")
    ).toBeInTheDocument();
    expect(screen.getByText("Üdvözöljük!")).toBeInTheDocument();
    expect(screen.getByText("Kérjük jelentkezzen be!")).toBeInTheDocument();
  });

  test("shows error on failed login", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { status: 401 },
    });

    render(<MediaCard />);
    const usernameInput = screen.getByLabelText(/felhasználónév/i);
    const passwordInput = screen.getByLabelText(/jelszó/i);
    const submitButton = screen.getByRole("button", { name: /belépés/i });

    fireEvent.change(usernameInput, { target: { value: "wronguser" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Hibás felhasználónév vagy jelszó.")
      ).toBeInTheDocument();
    });
  });

  test("submits the form successfully", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { token: "mockToken", refreshToken: "mockRefreshToken" },
    });

    render(<MediaCard />);
    const usernameInput = screen.getByLabelText(/felhasználónév/i);
    const passwordInput = screen.getByLabelText(/jelszó/i);
    const submitButton = screen.getByRole("button", { name: /belépés/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "https://localhost:5000/api/Auth/login",
        {
          userName: "testuser",
          password: "password123",
        }
      );
    });

    expect(localStorage.getItem("token")).toBe("mockToken");
    expect(localStorage.getItem("refreshToken")).toBe("mockRefreshToken");
  });
});