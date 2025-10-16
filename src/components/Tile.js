import React from 'react';
import './Tile.css';

function Tile({ value }) {
  if (value === 0) return <div className="tile empty" />;
  return <div className={`tile tile-${value}`}>{value}</div>;
}

export default Tile;
