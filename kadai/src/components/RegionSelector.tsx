// RegionSelector.js
import React from "react";
import PropTypes from "prop-types";
import "../App.css";

const regions = {
  北海道地方: ["北海道"],
  東北地方: ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
  関東地方: [
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
  ],
  中部地方: [
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
  ],
  近畿地方: [
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
  ],
  中国地方: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"],
  四国地方: ["徳島県", "香川県", "愛媛県", "高知県"],
  九州地方: [
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県",
  ],
};

function RegionSelector({
  prefectures,
  selectedPrefectures,
  onCheckboxChange,
}) {
  return (
    <div className="tihou_container">
      {Object.keys(regions).map((region) => (
        <div key={region} className="tihou">
          <h3>{region}</h3>
          <div className="prefecture__container">
            {prefectures
              .filter((pref) => regions[region].includes(pref.prefName))
              .map((prefecture) => (
                <div key={prefecture.prefCode} className="prefecture__item">
                  <label
                    className="prefecture__label"
                    htmlFor={`checkbox-${prefecture.prefCode}`}
                  >
                    <input
                      className="prefecture__input"
                      type="checkbox"
                      id={`checkbox-${prefecture.prefCode}`}
                      name={prefecture.prefName}
                      checked={selectedPrefectures.includes(
                        prefecture.prefCode,
                      )}
                      onChange={() => onCheckboxChange(prefecture.prefCode)}
                    />
                    <span className="dummyinput"></span>
                    <span className="prefecture__text">
                      {prefecture.prefName}
                    </span>
                  </label>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

RegionSelector.propTypes = {
  prefectures: PropTypes.array.isRequired,
  selectedPrefectures: PropTypes.array.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
};

export default RegionSelector;
