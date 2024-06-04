// src/AgeGroupSelector.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
// @ts-expect-error TS(6142): Module './AgeGroupSelector' was resolved to 'C:/Gi... Remove this comment to see the full error message
import AgeGroupSelector from "./AgeGroupSelector";

// @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
test("renders age group selector and checks radio buttons", () => {
  // @ts-expect-error TS(2708): Cannot use namespace 'jest' as a value.
  const onAgeGroupChange = jest.fn();
  render(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <AgeGroupSelector ageGroup="総人口" onAgeGroupChange={onAgeGroupChange} />,
  );

  const totalRadioButton = screen.getByLabelText(/総人口/i);
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(totalRadioButton).toBeChecked();

  fireEvent.click(screen.getByLabelText(/老年人口/i));
  // @ts-expect-error TS(2304): Cannot find name 'expect'.
  expect(onAgeGroupChange).toHaveBeenCalledWith("老年人口");
});
