// src/setupTests.js
import "@testing-library/jest-dom";
// Jest の設定ファイルまたはテストファイルの先頭に追加
global.ResizeObserver = class ResizeObserver {
  observe() {
    // do nothing
  }

  unobserve() {
    // do nothing
  }

  disconnect() {
    // do nothing
  }
};
