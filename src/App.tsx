import React, { Component, useEffect, useState } from "react"
import useInterval from "./useInterval"
import "./App.css"

type Point = {
  x: number
  y: number
  color: string
}

type Shape = Array<Array<Point>>

type CurrShape = Array<Point>

type Fallen = Array<Point>

type Game = {
  shapeIndex: number
  currShape: Shape
  fallen: Fallen
}

const HEIGHT = 20
const WIDTH = 10

const rectColor = "#61dcfb"
const squareColor = "#92e980"
const lShapeColor = "#fa5cc5f3"
const zShapeColor = "#fdd224"
const zShapeReverseColor = "rgb(157, 252, 252)"
const tShapeColor = "rgb(192, 122, 249)"
const lShapeReverseColor = "rgb(252, 255, 92)"

let square = () => [
  [
    { x: 4, y: 0, color: squareColor },
    { x: 4, y: 1, color: squareColor },
    { x: 5, y: 0, color: squareColor },
    { x: 5, y: 1, color: squareColor }
  ]
]
let rect = () => [
  [
    { x: 3, y: 0, color: rectColor },
    { x: 4, y: 0, color: rectColor },
    { x: 5, y: 0, color: rectColor },
    { x: 6, y: 0, color: rectColor }
  ],
  [
    { x: 4, y: -1, color: rectColor },
    { x: 4, y: 0, color: rectColor },
    { x: 4, y: 1, color: rectColor },
    { x: 4, y: 2, color: rectColor }
  ]
]
let lShape = () => [
  [
    { x: 4, y: 0, color: lShapeColor },
    { x: 4, y: 1, color: lShapeColor },
    { x: 4, y: 2, color: lShapeColor },
    { x: 5, y: 2, color: lShapeColor }
  ],
  [
    { x: 3, y: 0, color: lShapeColor },
    { x: 3, y: 1, color: lShapeColor },
    { x: 4, y: 0, color: lShapeColor },
    { x: 5, y: 0, color: lShapeColor }
  ],
  [
    { x: 3, y: 0, color: lShapeColor },
    { x: 4, y: 0, color: lShapeColor },
    { x: 4, y: 1, color: lShapeColor },
    { x: 4, y: 2, color: lShapeColor }
  ],
  [
    { x: 3, y: 1, color: lShapeColor },
    { x: 4, y: 1, color: lShapeColor },
    { x: 5, y: 1, color: lShapeColor },
    { x: 5, y: 0, color: lShapeColor }
  ]
]
let lShapeReverse = () => [
  [
    { x: 4, y: 0, color: lShapeReverseColor },
    { x: 4, y: 1, color: lShapeReverseColor },
    { x: 4, y: 2, color: lShapeReverseColor },
    { x: 3, y: 2, color: lShapeReverseColor }
  ],
  [
    { x: 3, y: 0, color: lShapeReverseColor },
    { x: 3, y: 1, color: lShapeReverseColor },
    { x: 4, y: 1, color: lShapeReverseColor },
    { x: 5, y: 1, color: lShapeReverseColor }
  ],
  [
    { x: 5, y: 0, color: lShapeReverseColor },
    { x: 4, y: 0, color: lShapeReverseColor },
    { x: 3, y: 0, color: lShapeReverseColor },
    { x: 5, y: 1, color: lShapeReverseColor }
  ],
  [
    { x: 3, y: 1, color: lShapeReverseColor },
    { x: 4, y: 1, color: lShapeReverseColor },
    { x: 5, y: 1, color: lShapeReverseColor },
    { x: 5, y: 0, color: lShapeReverseColor }
  ]
]
let tShape = () => [
  [
    { x: 3, y: 0, color: tShapeColor },
    { x: 4, y: 0, color: tShapeColor },
    { x: 5, y: 0, color: tShapeColor },
    { x: 4, y: 1, color: tShapeColor }
  ],
  [
    { x: 4, y: 0, color: tShapeColor },
    { x: 4, y: 1, color: tShapeColor },
    { x: 4, y: 2, color: tShapeColor },
    { x: 3, y: 1, color: tShapeColor }
  ],
  [
    { x: 4, y: 0, color: tShapeColor },
    { x: 3, y: 1, color: tShapeColor },
    { x: 4, y: 1, color: tShapeColor },
    { x: 5, y: 1, color: tShapeColor }
  ],
  [
    { x: 4, y: 0, color: tShapeColor },
    { x: 4, y: 1, color: tShapeColor },
    { x: 4, y: 2, color: tShapeColor },
    { x: 5, y: 1, color: tShapeColor }
  ]
]
let zShape = () => [
  [
    { x: 4, y: 0, color: zShapeColor },
    { x: 4, y: 1, color: zShapeColor },
    { x: 5, y: 1, color: zShapeColor },
    { x: 5, y: 2, color: zShapeColor }
  ],
  [
    { x: 4, y: 0, color: zShapeColor },
    { x: 5, y: 0, color: zShapeColor },
    { x: 3, y: 1, color: zShapeColor },
    { x: 4, y: 1, color: zShapeColor }
  ]
]
let zShapeReverse = () => [
  [
    { x: 4, y: 0, color: zShapeReverseColor },
    { x: 5, y: 0, color: zShapeReverseColor },
    { x: 4, y: 1, color: zShapeReverseColor },
    { x: 3, y: 1, color: zShapeReverseColor }
  ],
  [
    { x: 4, y: 0, color: zShapeReverseColor },
    { x: 4, y: 1, color: zShapeReverseColor },
    { x: 5, y: 1, color: zShapeReverseColor },
    { x: 5, y: 2, color: zShapeReverseColor }
  ]
]

let shapes = [square, rect, lShape, tShape, zShape, lShapeReverse, zShapeReverse]

let pickRandomShape = () => {
  let num = Math.floor(Math.random() * 7) + 0
  return shapes[num]()
}

export let isCellOccupied = (fallen: Fallen, x: number, y: number) => {
  return fallen.some(point => point.x === x && point.y === y)
}

// moves falling shape shape down, checks rotation, removes rows. returns a new game state
export let advanceGameState = (dir: "left" | "right" | "up" | "down" = "down") => (game: Game): Game => {
  //if any of the points of fallingShape are occupied by fallen
  let lost = game.currShape[game.shapeIndex].some(point => isCellOccupied(game.fallen, point.x, point.y))
  if (lost) {
    window.alert("you lose")
    return { currShape: [], shapeIndex: 0, fallen: [] }
  }

  // calculate falling shape's new position based on direction moved
  let newFallingShape
  if (dir === "left") {
    if (!game.currShape[game.shapeIndex].some(point => point.x == 0)) {
      newFallingShape = game.currShape.map(shape =>
        shape.map(point => ({ x: point.x - 1, y: point.y + 1, color: point.color }))
      )
    }
  }
  if (dir === "right") {
    if (!game.currShape[game.shapeIndex].some(point => point.x >= WIDTH - 1)) {
      newFallingShape = game.currShape.map(shape =>
        shape.map(point => ({ x: point.x + 1, y: point.y + 1, color: point.color }))
      )
    }
  }
  if (dir == "down") {
    newFallingShape = game.currShape.map(shape =>
      shape.map(point => ({ x: point.x, y: point.y + 1, color: point.color }))
    )
  }

  if (dir == "up") {
    let hasOutOfBoundsPoints = game.currShape.some(shape =>
      shape.some(point => point.x < 0 || point.x > WIDTH - 1 || point.y < 0)
    )
    if (game.shapeIndex < game.currShape.length - 1 && !hasOutOfBoundsPoints) {
      game.shapeIndex = game.shapeIndex + 1
    } else {
      game.shapeIndex = 0
    }
  }

  // checks if the falling shape has reached the bottom or reached an occupied cell
  let isOccupied = false
  let isAtBottom = false
  if (newFallingShape) {
    for (let point of newFallingShape[game.shapeIndex]) {
      if (point.y >= HEIGHT) {
        isAtBottom = true
      }
      for (let fallenPoint of game.fallen) {
        if (point.x === fallenPoint.x && point.y === fallenPoint.y) {
          isOccupied = true
        }
      }
    }
  }

  if (isOccupied || isAtBottom) {
    let fallen: Array<Point> = game.fallen.concat(...game.currShape[game.shapeIndex])
    return { currShape: pickRandomShape(), shapeIndex: 0, fallen: removeFullRows(fallen) }
  } else {
    if (newFallingShape) {
      return { ...game, currShape: newFallingShape }
    }
  }

  return game
}

let matrix: Array<Array<number>> = []
for (let i = 0; i < WIDTH; i++) {
  matrix[i] = []
  for (let j = 0; j < HEIGHT; j++) {
    matrix[i].push(0)
  }
}

let removeFullRows = (fallen: Fallen): Fallen => {
  // let points: Array<Point> = game.flat(2)
  let keepClearing = false
  for (let y = HEIGHT - 1; y > 0; y--) {
    let numOfOccupiedCells = fallen.filter(point => point.y == y).length
    // let currShape = game.slice(game.length - 2, game.length - 1)
    if (numOfOccupiedCells == WIDTH) {
      keepClearing = true
      // go thru all points and remove the ones with curr y
      let stateWithRemovedRow = fallen.filter(point => point.y !== y)
      let finalState = stateWithRemovedRow.map((point: Point) => {
        if (point.y < y) {
          let newYPos = point.y + 1
          return { ...point, y: newYPos }
        } else {
          return point
        }
      })
      return keepClearing ? removeFullRows(finalState) : finalState
    }
  }

  return fallen
}

let App = () => {
  let [game, setGame] = React.useState<Game>({ currShape: [[]], shapeIndex: 0, fallen: [] })

  let getCell = (x: number, y: number) => {
    if (game.currShape.length > 0) {
      let points = game.currShape[game.shapeIndex].concat(...game.fallen)
      return points.find(point => point.x === x && point.y === y)
    }
  }

  useInterval(() => {
    if (game.currShape) {
      setGame(advanceGameState("down"))
    }
  }, 400)

  let checkMove = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      setGame(advanceGameState("left"))
    }
    if (e.key === "ArrowRight") {
      setGame(advanceGameState("right"))
    }
    if (e.key === "ArrowDown") {
      setGame(advanceGameState("down"))
    }
    if (e.key === "ArrowUp") {
      setGame(advanceGameState("up"))
    }
  }

  return (
    <div className="App" onKeyDown={checkMove} tabIndex={0}>
      <div className="title">Tetris</div>
      <button
        className="start-button"
        onClick={() => setGame({ currShape: pickRandomShape(), shapeIndex: 0, fallen: [] })}
      >
        Start Game
      </button>
      <div className="game">
        <div className="board-container">
          <div className="board">
            {matrix.map((col, x) => (
              <div className="column">
                {col.map((row, y) => {
                  let cell: Point | undefined = getCell(x, y)
                  let cellRight: Point | undefined = getCell(x + 1, y)
                  let cellLeft: Point | undefined = getCell(x - 1, y)
                  let cellTop: Point | undefined = getCell(x, y - 1)
                  return (
                    <div
                      key={`${x}, ${y}`}
                      style={{
                        height: 30,
                        width: 30,
                        boxSizing: "border-box",
                        borderBottom: cell ? "1px solid black" : "1px solid white",
                        borderRight: cell ? "1px solid black" : "1px solid white",
                        borderTop: cell && !cellTop ? "1px solid black" : `1px solid ${cell ? cell.color : "white"}`,
                        borderLeft: cell && !cellLeft ? "1px solid black" : `1px solid ${cell ? cell.color : "white"}`,
                        backgroundColor: cell ? cell.color : "white"
                      }}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
