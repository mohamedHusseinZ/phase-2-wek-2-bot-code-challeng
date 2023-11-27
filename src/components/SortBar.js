// SortBar.js
import React from 'react';

const SortBar = ({ onSort }) => {
  return (
    <div>
      <label>Sort By:</label>
      <select onChange={(e) => onSort(e.target.value)}>
        <option value="health">Health</option>
        <option value="damage">Damage</option>
        <option value="armor">Armor</option>
      </select>
    </div>
  );
};

export default SortBar;
