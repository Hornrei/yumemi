// AgeGroupSelector.js
import React from "react";
import PropTypes from "prop-types";
import "../App.css";

function AgeGroupSelector({
  ageGroup,
  onAgeGroupChange
}: any) {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className="btn_container">
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <input
          className="age"
          type="radio"
          id="total"
          name="ageGroup"
          value="総人口"
          checked={ageGroup === "総人口"}
          onChange={(e) => onAgeGroupChange(e.target.value)}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <label htmlFor="total" className="ageLabel">
          総人口
        </label>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <input
          className="age"
          type="radio"
          id="oldAge"
          name="ageGroup"
          value="老年人口"
          checked={ageGroup === "老年人口"}
          onChange={(e) => onAgeGroupChange(e.target.value)}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <label htmlFor="oldAge" className="ageLabel">
          老年人口
        </label>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <input
          className="age"
          type="radio"
          id="workingAge"
          name="ageGroup"
          value="生産年齢人口"
          checked={ageGroup === "生産年齢人口"}
          onChange={(e) => onAgeGroupChange(e.target.value)}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <label htmlFor="workingAge" className="ageLabel">
          生産年齢人口
        </label>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <input
          className="age"
          type="radio"
          id="youngAge"
          name="ageGroup"
          value="年少人口"
          checked={ageGroup === "年少人口"}
          onChange={(e) => onAgeGroupChange(e.target.value)}
        />
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <label htmlFor="youngAge" className="ageLabel">
          年少人口
        </label>
      </div>
    </>
  );
}

AgeGroupSelector.propTypes = {
  ageGroup: PropTypes.string.isRequired,
  onAgeGroupChange: PropTypes.func.isRequired,
};

export default AgeGroupSelector;
