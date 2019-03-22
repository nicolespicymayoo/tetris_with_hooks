import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { advanceGameState, isCellOccupied } from "./App"

it("renders without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

let sum = (a: number, b: number): number => a + b

test("adds 2 + 2 to equal 4", () => {
  expect(sum(2, 2)).toBe(4)
})

test("advance game function moves a falling cell down by one", () => {
  let game = {
    currShape: [[{ x: 2, y: 18, color: "blue" }]],
    shapeIndex: 0,
    fallen: [{ x: 0, y: 19, color: "blue" }, { x: 1, y: 19, color: "blue" }]
  }
  let newGameState = {
    currShape: [[{ x: 2, y: 19, color: "blue" }]],
    shapeIndex: 0,
    fallen: [{ x: 0, y: 19, color: "blue" }, { x: 1, y: 19, color: "blue" }]
  }
  expect(advanceGameState("down")(game)).toEqual(newGameState)
})

test("advance game function changes the current shape to the next rotation", () => {
  let game = {
    currShape: [[{ x: 2, y: 18, color: "blue" }], [{ x: 3, y: 18, color: "blue" }]],
    shapeIndex: 0,
    fallen: [{ x: 0, y: 19, color: "blue" }, { x: 1, y: 19, color: "blue" }]
  }
  let newGameState = {
    currShape: [[{ x: 2, y: 18, color: "blue" }], [{ x: 3, y: 18, color: "blue" }]],
    shapeIndex: 1,
    fallen: [{ x: 0, y: 19, color: "blue" }, { x: 1, y: 19, color: "blue" }]
  }
  expect(advanceGameState("up")(game)).toEqual(newGameState)
})
