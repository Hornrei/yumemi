import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AgeGroupSelector from "./AgeGroupSelector";

test("renders age group selector and checks radio buttons", () => {
  const onAgeGroupChange = jest.fn();
  render(
    <AgeGroupSelector ageGroup="総人口" onAgeGroupChange={onAgeGroupChange} />,
  );

  const totalRadioButton = screen.getByLabelText(/総人口/i);
  expect(totalRadioButton).toBeChecked();

  fireEvent.click(screen.getByLabelText(/老年人口/i));
  expect(onAgeGroupChange).toHaveBeenCalledWith("老年人口");
});
