import { getIsGameOver } from ".";

describe("getIsGameOver", () => {
  it("returns true if X has 3 in a row horizontally", () => {
    const values1 = ["X", "X", "X", null, null, null, null, null, null];
    const values2 = [null, null, null, "X", "X", "X", null, null, null];
    const values3 = [null, null, null, null, null, null, "X", "X", "X"];

    expect(getIsGameOver(values1)).toBe(true);
    expect(getIsGameOver(values2)).toBe(true);
    expect(getIsGameOver(values3)).toBe(true);
  });

  it("returns true if X has 3 in a row vertically", () => {
    const values1 = ["X", null, null, "X", null, null, "X", null, null];
    const values2 = [null, "X", null, null, "X", null, null, "X", null];
    const values3 = [null, null, "X", null, null, "X", null, null, "X"];

    expect(getIsGameOver(values1)).toBe(true);
    expect(getIsGameOver(values2)).toBe(true);
    expect(getIsGameOver(values3)).toBe(true);
  });

  it("returns true if X has 3 in a row diagonally", () => {
    const values1 = ["X", null, null, null, "X", null, null, null, "X"];
    const values2 = [null, null, "X", null, "X", null, "X", null, null];

    expect(getIsGameOver(values1)).toBe(true);
    expect(getIsGameOver(values2)).toBe(true);
  });

  it("returns true if the board is full", () => {
    const values = ["X", "O", "X", "X", "X", "O", "O", "X", "O"];

    expect(getIsGameOver(values)).toBe(true);
  });

  it("returns false if the board is not full and no one has 3 in a row", () => {
    const values = ["X", null, "X", "X", "X", "O", "O", "X", "O"];

    expect(getIsGameOver(values)).toBe(false);
  });
});
