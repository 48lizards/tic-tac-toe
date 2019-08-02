import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { getIsGameOver, getWinner } from "./helpers";

const SquareWrapper = styled.div`
  height: 100px;
  width: 100px;
  border: 1px solid black;
  font-size: 72px;
  text-align: center;
`;

const SquaresWrapper = styled.div`
  height: 300px;
  width: 350px;
  display: flex;
  flex-wrap: wrap;
`;

const AppWrapper = styled.div`
  padding: 30px;
  display: flex;
  width: 800px;
`;

const PlayerWrapper = styled.div`
  font-size: 32px;
`;

type Value = "X" | "O";

function Square({
  onClick,
  value
}: {
  onClick: () => void;
  value: Value | null;
}) {
  return (
    <SquareWrapper data-testid="square" onClick={onClick}>
      {value}
    </SquareWrapper>
  );
}

function Squares({
  currentSymbol,
  isGameOver,
  onTurnFinish,
  values,
  setValues
}: {
  currentSymbol: Value;
  isGameOver: boolean;
  onTurnFinish: () => void;
  values: Array<Value | null>;
  setValues: (values: Array<Value | null>) => void;
}) {
  return (
    <SquaresWrapper>
      {values.map((value, i) => {
        return (
          <Square
            key={i}
            onClick={() => {
              if (isGameOver || value) {
                return;
              }
              const nextValues = values.slice();
              nextValues[i] = currentSymbol;
              setValues(nextValues);
              onTurnFinish();
            }}
            value={value}
          />
        );
      })}
    </SquaresWrapper>
  );
}

function App() {
  const players: Array<Value> = ["X", "O"];
  const initialValues: Array<Value | null> = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ];

  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [values, setValues] = useState(initialValues);

  const isGameOver = getIsGameOver(values);
  const winner = getWinner(values);

  useEffect(() => {
    document.title = `Tic Tac Toe (${players[currentPlayer]}'s turn)`;
  });

  function toggleCurrentPlayer() {
    setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
  }

  function resetGame() {
    setValues(initialValues);
    setCurrentPlayer(0);
  }

  function onTurnFinish() {
    toggleCurrentPlayer();
  }

  return (
    <AppWrapper>
      <Squares
        currentSymbol={players[currentPlayer]}
        onTurnFinish={onTurnFinish}
        isGameOver={isGameOver}
        values={values}
        setValues={setValues}
      />
      <PlayerWrapper>
        {isGameOver ? (
          <>
            {winner ? (
              <>
                <div>{`Winner: ${winner}`}</div>
              </>
            ) : (
              <div>Draw</div>
            )}
            <button onClick={resetGame}>New Game</button>
          </>
        ) : (
          `${players[currentPlayer]}'s Turn`
        )}
      </PlayerWrapper>
    </AppWrapper>
  );
}

export default App;
