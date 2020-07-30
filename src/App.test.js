import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";

describe("home page", () => {
  test("renders home page navbar", () => {
    const { getAllByText } = render(<App />);
    const loginButton = getAllByText("Login");
    const homeButton = getAllByText("Home");
    const signupButton = getAllByText("Signup");
    expect(loginButton).toBeTruthy();
    expect(homeButton).toBeTruthy();
    expect(signupButton).toBeTruthy();
  });
});
