"use client"
import React, { useState, useEffect, useCallback } from "react";

type MultiplicationAppProps = object;

const MultiplicationApp: React.FC<MultiplicationAppProps> = () => {
  const [range, setRange] = useState<number>(10);
  const [num1, setNum1] = useState<number | null>(null);
  const [num2, setNum2] = useState<number | null>(null);
  const [towerHeight, setTowerHeight] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [options, setOptions] = useState<number[]>([]);
  const [hasSelectedRange, setHasSelectedRange] = useState<boolean>(false);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const generateOptions = useCallback((correctAnswer: number): number[] => {
    const answers = new Set<number>();
    answers.add(correctAnswer);
    while (answers.size < 6) {
      answers.add(Math.floor(Math.random() * (range * range)) + 1);
    }
    return Array.from(answers).sort(() => Math.random() - 0.5);
  }, [range]);

  const handleSubmit = (selectedAnswer: number) => {
    if (num1 === null || num2 === null || isVictory) return;
    const correctAnswer = num1 * num2;
    let updatedHeight = towerHeight;
    if (selectedAnswer === correctAnswer) {
      if (updatedHeight < 30) {
        updatedHeight += 1;
      }
      if (updatedHeight >= 30) {
        setIsVictory(true);
        setFeedback("🏆 Victory! You reached 30 levels!");
        return;
      }
      setFeedback(`Correct! 🎉 Total Levels: ${updatedHeight}`);
    } else {
      updatedHeight = Math.max(updatedHeight - 4, 0);
      setFeedback(`Incorrect! You lost 4 levels! Total Levels: ${updatedHeight}. The correct answer was ${correctAnswer}`);
    }
    setTowerHeight(updatedHeight);

    const newNum1 = Math.floor(Math.random() * range) + 1;
    const newNum2 = Math.floor(Math.random() * range) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
  };

  const resetGame = () => {
    setRange(10);
    setTowerHeight(0);
    setFeedback("");
    setHasSelectedRange(false);
    setIsVictory(false);
    setGameStarted(false);
    setNum1(null);
    setNum2(null);
  };

  const startGame = () => {
    if (!hasSelectedRange) setRange(10);
    setGameStarted(true);
    setHasSelectedRange(true);
  };

  useEffect(() => {
    if (hasSelectedRange && gameStarted) {
      const newNum1 = Math.floor(Math.random() * range) + 1;
      const newNum2 = Math.floor(Math.random() * range) + 1;
      setNum1(newNum1);
      setNum2(newNum2);
    }
  }, [range, hasSelectedRange, gameStarted]);

  useEffect(() => {
    if (num1 !== null && num2 !== null) {
      setOptions(generateOptions(num1 * num2));
    }
  }, [num1, num2, generateOptions]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRange = parseInt(e.target.value);
    setRange(newRange);
    setHasSelectedRange(true);
  };

  if (isVictory) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-500 text-white pt-10 px-4 md:px-0">
        <div className="text-4xl text-blue-400 mb-4">🏆 Victory! You reached 30 levels!</div>
        <button onClick={resetGame} className="bg-blue-700 text-white border rounded p-4 md:p-6 text-2xl md:text-3xl font-bold hover:bg-blue-600 w-24 md:w-28 text-center flex items-center justify-center">Restart</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-500 text-white pt-10 px-4 md:px-0">
      <div className="flex flex-row items-center mb-4">
        {Array.from({ length: towerHeight }).map((_, index) => (
          <div
            key={index}
            className="h-12 w-3 md:h-16 md:w-4 bg-yellow-500 border border-black mr-1"
          ></div>
        ))}
      </div>
      <div className="text-xl text-red-300 text-center px-2 mb-4">{feedback}</div>
      {!gameStarted && (
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl mb-6 font-bold">Multiplication Game</h1>
          <label className="mb-6 text-2xl md:text-3xl font-bold">
            Select Maximum Number:
            <select defaultValue="10" onChange={handleRangeChange} className="ml-2 p-2 border rounded text-lg md:text-xl bg-white text-black">
              <option value="" disabled>Choose...</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </label>
          <div className="mt-4">
            <button onClick={startGame} className="bg-blue-700 text-white border rounded p-4 md:p-6 text-2xl md:text-3xl font-bold hover:bg-blue-600 w-24 md:w-28 text-center">Start</button>
          </div>
        </div>
      )}
      {gameStarted && (
        <>
          <div className="text-4xl md:text-6xl font-bold mb-6">{num1} × {num2} = ?</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSubmit(option)}
                className="bg-blue-700 text-white border rounded p-4 md:p-6 text-2xl md:text-3xl font-bold hover:bg-blue-600 w-24 md:w-28 text-center"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MultiplicationApp;
