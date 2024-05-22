// 47都道府県のチェックボックスを表示するコンポーネント

import React from 'react';

function Checkbox(props) {
  return (
    <label>
      <input
        type='checkbox'
        value={props.value}
        onChange={props.onChange}
      />
      {props.label}
    </label>
  );
}

