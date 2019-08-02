function valuesMatchAtIndices(values, i1, i2, i3) {
  return (
    values[i1] &&
    values[i2] &&
    values[i3] &&
    values[i1] === values[i2] &&
    values[i1] === values[i3]
  );
}

const possibleWins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function isBoardFull(values) {
  return values.every(v => !!v);
}

function isThereAWinner(values) {
  return possibleWins
    .map(indices => valuesMatchAtIndices(values, ...indices))
    .some(match => !!match);
}

export function getWinner(values) {
  const win = possibleWins.find(indices => valuesMatchAtIndices(values, ...indices));
  if (!win) {
      return null;
  }
  return values[win[0]];
}

export function getIsGameOver(values) {
  return isThereAWinner(values) || isBoardFull(values);
}
