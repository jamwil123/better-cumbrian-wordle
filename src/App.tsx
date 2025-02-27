import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"

import "./App.css"

import {
  boardDefault,
  boardStatusDefault,
  computeGuessStatus,
  LetterStatus,
} from "./helpers"
import Board from "./components/Board"
import Keyboard from "./components/Keyboard"
import GameOver from "./components/GameOver"

// Import the Cumbrian dictionary
import cumbrianWords from "./cumbrian-dictionary.json"

export interface IWordleGameContext {
  board: string[][]
  setBoard: Dispatch<SetStateAction<string[][]>>
  boardStatus: LetterStatus[][]
  setBoardStatus: Dispatch<SetStateAction<LetterStatus[][]>>
  currAttempt: { attempt: number; letterPos: number }
  setCurrAttempt: Dispatch<
    SetStateAction<{ attempt: number; letterPos: number }>
  >
  onDelete: () => void
  onEnter: () => void
  onSelectLetter: (key: string) => void
  correctWord: string
  letterStatus: Map<string, LetterStatus>
  setLetterStatus: Dispatch<SetStateAction<Map<string, LetterStatus>>>
  gameOver: { gameOver: boolean; guessedWord: boolean }
  setGameOver: Dispatch<
    SetStateAction<{ gameOver: boolean; guessedWord: boolean }>
  >
}

export const AppContext = createContext<IWordleGameContext>(
  {} as IWordleGameContext
)

function App() {
  const [board, setBoard] = useState(boardDefault)
  const [boardStatus, setBoardStatus] = useState(boardStatusDefault)
  const [currAttempt, setCurrAttempt] = useState({
    attempt: 0,
    letterPos: 0,
  })
  const [wordSet, setWordSet] = useState(new Set<string>())
  const [letterStatus, setLetterStatus] = useState(new Map())
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  })

  // Use Cumbrian words from the JSON
  const [correctWord, setCorrectWord] = useState("RIGHT")

  // Load Cumbrian words and set them
  useEffect(() => {
    const words = cumbrianWords as string[] // Cast to a string array
    const acceptableWordSet = new Set(words.map((word) => word.toUpperCase())) // Create a Set for acceptable words
    setWordSet(acceptableWordSet)

    // Choose a random word for the correct word
    setCorrectWord(
      words[Math.floor(Math.random() * words.length)].toUpperCase()
    )
  }, [])

  const onSelectLetter = (key: string) => {
    if (currAttempt.letterPos >= 5) return
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = key.toUpperCase() // Ensure letter is uppercase
    setBoard(newBoard)
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 })
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = ""
    setBoard(newBoard)
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 })
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return

    let currWord = board[currAttempt.attempt].join("").toUpperCase() // Ensure input is uppercase
    if (!wordSet.has(currWord)) return alert("Word not found")

    // Compute the status of the letters
    const newBoardStatus = [...boardStatus]
    newBoardStatus[currAttempt.attempt] = computeGuessStatus(
      currWord,
      correctWord
    )
    setBoardStatus(newBoardStatus)

    // Defining here because it won't be refreshed after the setCurrAttempt
    const nextAttemptCount = currAttempt.attempt + 1

    setCurrAttempt({
      attempt: nextAttemptCount,
      letterPos: 0,
    })

    if (currWord === correctWord) {
      setGameOver({
        gameOver: true,
        guessedWord: true,
      })
    } else if (nextAttemptCount === 6) {
      setGameOver({
        gameOver: true,
        guessedWord: false,
      })
    }
  }

  return (
    <div className="App">
      <nav>
        <h1>Cumbrian Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          boardStatus,
          setBoardStatus,
          currAttempt,
          setCurrAttempt,
          onDelete,
          onEnter,
          onSelectLetter,
          correctWord,
          letterStatus,
          setLetterStatus,
          gameOver,
          setGameOver,
        }}
      >
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  )
}

export default App
