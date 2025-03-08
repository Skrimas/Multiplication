"use client"
import React, { useState, useEffect } from "react";

interface MultiplicationAppProps {}

const MultiplicationApp: React.FC<MultiplicationAppProps> = () => {
  const [range, setRange] = useState<number>(5);
  const [num1, setNum1] = useState<number | null>(null);
  const [num2, setNum2] = useState<number | null>(null);
  const [towerHeights, setTowerHeights] = useState<number[]>([0]);
  const [feedback, setFeedback] = useState<string>("");
  const [options, setOptions] = useState<number[]>([]);
  const [hasSelectedRange, setHasSelectedRange] = useState<boolean>(false);

  const generateOptions = (correctAnswer: number): number[] => {
    const answers = new Set<number>();
    answers.add(correctAnswer);
    while (answers.size < 6) {
      answers.add(Math.floor(Math.random() * (range * range)) + 1);
    }
    return Array.from(answers).sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const newNum1 = Math.floor(Math.random() * range) + 1;
    const newNum2 = Math.floor(Math.random() * range) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
  }, [range]);

  useEffect(() => {
    if (num1 !== null && num2 !== null) {
      setOptions(generateOptions(num1 * num2));
    }
  }, [num1, num2]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRange = parseInt(e.target.value);
    setRange(newRange);
  };

  const handleSubmit = (selectedAnswer: number) => {
    if (!hasSelectedRange) setHasSelectedRange(true);
    if (num1 === null || num2 === null) return;
    const correctAnswer = num1 * num2;
    let updatedHeights = [...towerHeights];
    if (selectedAnswer === correctAnswer) {
      if (updatedHeights[updatedHeights.length - 1] < 10) {
        updatedHeights[updatedHeights.length - 1] += 1;
      } else {
        updatedHeights.push(1);
      }
      setFeedback("Correct! 🎉 Tower level: " + updatedHeights.join(", "));
    } else {
      updatedHeights = [0];
      setFeedback("Incorrect! All towers collapsed to level 0. The correct answer was " + correctAnswer);
    }
    setTowerHeights(updatedHeights);

    const newNum1 = Math.floor(Math.random() * range) + 1;
    const newNum2 = Math.floor(Math.random() * range) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
  };

  if (num1 === null || num2 === null) {
    return <div className="text-center text-2xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-500 text-white pt-10 px-4 md:px-0">
      <h1 className="text-3xl md:text-4xl mb-6 font-bold">Multiplication Game</h1>
      <div className="flex flex-row items-end mb-10 flex-wrap justify-center">
        {towerHeights.map((height, i) => (
          <div key={i} className="flex flex-col-reverse items-center mb-4 mr-2">
            {Array.from({ length: height }).map((_, index) => (
              <div
                key={index}
                className="w-12 h-3 md:w-16 md:h-4 bg-yellow-500 border border-black mb-1"
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center">
        {!hasSelectedRange && (
          <label className="mb-6 text-2xl md:text-3xl font-bold">
            Select Maximum Number:
            <select defaultValue="5" onChange={handleRangeChange} className="ml-2 p-2 border rounded text-lg md:text-xl bg-white text-black">
              <option value="" disabled>Choose...</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </label>
        )}
        <div className="mb-8">
          <span className="text-4xl md:text-6xl font-bold">{num1} × {num2} = ?</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSubmit(option)}
              className="bg-blue-700 text-white border rounded p-4 md:p-6 text-2xl md:text-3xl font-bold hover:bg-blue-600"
            >
              {option}
            </button>
          ))}
        </div>
        <div className="text-xl text-red-300 text-center px-2">{feedback}</div>
      </div>
    </div>
  );
};

export default MultiplicationApp;
