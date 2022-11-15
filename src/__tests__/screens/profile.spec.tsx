import React from "react";
import { render } from "@testing-library/react-native";

import Profile from "../../screens/Profile";

describe("Profile Screen", () => {
  test("check input name placeholder", () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText("Nome");

    expect(inputName).toBeTruthy();
  });

  test("check if user data has ben loaded", () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId("input-name");
    const inputSurname = getByTestId("input-surname");

    expect(inputName.props.value).toEqual("Naldo");
    expect(inputSurname.props.value).toEqual("Gomes");
  });

  test("check if title is correct", () => {
    const { getByTestId } = render(<Profile />);

    const textTitle = getByTestId("text-title");

    expect(textTitle.props.children).toContain("Profile");
  });
});
