// Header.js
import React from "react";
import "../App.css";

export default function Header() {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <header className="header">
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <h1 className="header__title">都道府県別の人口推移グラフ</h1>
    </header>
  );
}
