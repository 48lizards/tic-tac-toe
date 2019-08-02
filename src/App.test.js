import React from "react";
import ReactDOM from "react-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";
afterEach(cleanup);

it.skip("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("starts on X's turn", () => {
  const { getByText } = render(<App />);
  getByText("X's Turn");
});

it("switches turns if you click on an empty square", () => {
  const { getByText, getAllByTestId } = render(<App />);
  const squares = getAllByTestId("square");
  getByText("X's Turn");
  fireEvent.click(squares[0]);
  getByText("O's Turn");
  fireEvent.click(squares[1]);
  getByText("X's Turn");
});

it("does not switch turns if you click on square multiple times", () => {
  const { getByText, getAllByTestId } = render(<App />);
  const squares = getAllByTestId("square");
  getByText("X's Turn");
  fireEvent.click(squares[0]);
  getByText("O's Turn");
  fireEvent.click(squares[0]);
  getByText("O's Turn");
});

it("alternates putting Xs and Os in squares", () => {
  const { getAllByTestId } = render(<App />);
  const squares = getAllByTestId("square");
  fireEvent.click(squares[0]);
  expect(squares[0]).toHaveTextContent("X");
  fireEvent.click(squares[1]);
  expect(squares[1]).toHaveTextContent("O");
  fireEvent.click(squares[2]);
  expect(squares[2]).toHaveTextContent("X");
});

it("reports when someone wins", () => {
  const { getByText, getAllByTestId } = render(<App />);
  const squares = getAllByTestId("square");
  fireEvent.click(squares[0]);
  fireEvent.click(squares[3]);
  fireEvent.click(squares[1]);
  fireEvent.click(squares[4]);
  fireEvent.click(squares[2]);
  getByText("Winner: X");
});
