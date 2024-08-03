import { useState, useEffect } from 'react'
import './App.css'

function App() {
  let inputDir = { x: 0, y: 0 }
  let speed = 2
  let lastPaintTime = 0 // The last time at which the screen was painted
  let snakeArr = [
    { x: 13, y: 13 }
  ]
  let food = { x: 9, y: 9 }
  let score = 0
  let time = 0

  useEffect(() => {


    const main = (ctime) => {
      // console.log(lastPaintTime)
      window.requestAnimationFrame(main)
      if ((ctime - lastPaintTime) / 1000 < (1 / speed)) { // This makes sure that there is a 1/speed seconds of gap between each frame
        return
      }
      lastPaintTime = ctime

      gameEngine()
    }

    window.requestAnimationFrame(main)
    window.addEventListener('keydown', e => {
      
      switch (e.key) {
        case 'ArrowLeft':
          console.log('ArrowLeft')
          inputDir = { x: -1, y: 0 }
          break;

        case 'ArrowUp':
          console.log('ArrowUp')
          inputDir = { x: 0, y: -1 }
          break;

        case 'ArrowRight':
          console.log('ArrowRight')
          inputDir = { x: 1, y: 0 }
          break;

        case 'ArrowDown':
          console.log('ArrowDown')
          inputDir = { x: 0, y: 1 }
          break;

        default:
          break;
      }
    })

  }, [])


  const isCollide = (snakeArr) => {
    // Bumping into self
    for (let i = 1; i < snakeArr.length; i++) {
      if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
        return true
      }
    }

    if (snakeArr[0].x >= 18 || snakeArr[0].x === 0 || snakeArr[0].y >= 18 || snakeArr[0].y === 0) {
      return true
    }
  }


  const gameEngine = () => {
    let board = document.querySelector(".board")

    // Updating snake and food
    if (isCollide(snakeArr)) {
      inputDir = { x: 0, y: 0 }
      alert('Game Over! Press any key to play again')
      snakeArr = [{ x: 13, y: 13 }]
      score = 0
      time = 0
    }

    // Eating food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
      snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
      food = { x: Math.round(2 + (14) * Math.random()), y: Math.round(2 + (14) * Math.random()) }
      speed += .2
      score += 1
      document.querySelector(".scoreBoard").innerHTML = `Your Score is: ${score}`
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
      const element = snakeArr[i];
      snakeArr[i + 1] = { ...snakeArr[i] }
    }
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y

    // Displaying snake 
    board.innerHTML = "" // This resets the board so that mutliple snakes dont render
    snakeArr.forEach((e, index) => {
      let snakeElement = document.createElement('div')
      snakeElement.style.gridRowStart = e.y
      snakeElement.style.gridColumnStart = e.x

      if (index === 0) {
        snakeElement.classList.add('snakeHead')
      }
      else {
        snakeElement.classList.add('snakeBody')
      }

      board.appendChild(snakeElement)
    })

    // Displaying food 
    snakeArr.forEach((e, index) => {
      let foodElement = document.createElement('div')
      foodElement.style.gridRowStart = food.y
      foodElement.style.gridColumnStart = food.x

      foodElement.classList.add('food')
      board.appendChild(foodElement)
    })
  }


  return (
    <>
      <div className="area">
        <div className="scoreBoard">Your Score is: {score}</div>
        <div className="board"></div>
      </div>
    </>
  )
}

export default App
