// AgeGroupSelector.js
import React from "react";
import PropTypes from "prop-types";
import "../App.css";

function AgeGroupSelector({ ageGroup, onAgeGroupChange }) {
  return (
    <>
      <div className="btn_container">
        <input
          className="age"
          type="radio"
          id="total"
          name="ageGroup"
          value="総人口"
          checked={ageGroup === "総人口"}
          onChange={(e) => onAgeGroupChange(e.target.value)}
        />
        <label htmlFor="total" className="ageLabel">
          総人口
        </label>
        <input
          className="age"
          type="radio"
          id="oldAge"
          name="ageGroup"
          value="老年人口"
          checked={ageGroup === "老年人口"}
          onChange={(e) => onAgeGroupChange(e.target.value)}
        />
        <label htmlFor="oldAge" className="ageLabel">
          老年人口
        </label>
        <input
          className="age"
          type="radio"
          id="workingAge"
          name="ageGroup"
          value="生産年齢人口"
          checked={ageGroup === "生産年齢人口"}
          onChange={(e) => onAgeGroupChange(e.target.value)}
        />
        <label htmlFor="workingAge" className="ageLabel">
          生産年齢人口
        </label>
        <input
          className="age"
          type="radio"
          id="youngAge"
          name="ageGroup"
          value="年少人口"
          checked={ageGroup === "年少人口"}
          onChange={(e) => onAgeGroupChange(e.target.value)}
        />
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
