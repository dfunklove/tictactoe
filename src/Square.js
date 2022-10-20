import * as React from 'react';
import { useState } from 'react';

export default function Square({ x, y, onClick, player }) {
  const getIcon = () => {
    if (player == 2) {
      return 'O';
    } else if (player == 1) {
      return 'X';
    } else {
      return <>&nbsp;</>;
    }
  };

  return <button onClick={() => onClick(x, y)}>{getIcon()}</button>;
}
