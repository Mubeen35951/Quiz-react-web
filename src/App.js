import React, { useState, useEffect } from "react";
import "./App.css";

// Sample questions array
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: "Mars",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
    correct: "Shakespeare",
  },
  {
    question: "Which is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    correct: "Pacific Ocean",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"],
    correct: "Da Vinci",
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    correct: "8",
  },
  {
    question: "In which year did World War II end?",
    options: ["1942", "1945", "1948", "1950"],
    correct: "1945",
  },
  {
    question: "What is the currency of Japan?",
    options: ["Yuan", "Yen", "Won", "Ringgit"],
    correct: "Yen",
  },
  {
    question: "What is the smallest continent?",
    options: ["Asia", "Australia", "Africa", "Europe"],
    correct: "Australia",
  },
  {
    question: "Who was the first president of the United States?",
    options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"],
    correct: "George Washington",
  },
];

function App() {
  // State variables
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false); // New state for quiz start
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Shuffle the questions array for randomness when the app loads
  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  // Handle next question click
  const handleNextQuestion = () => {
    // Check if the selected option is correct
    if (selectedOption === shuffledQuestions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }

    // Move to the next question or finish the quiz
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(""); // Reset selected option
    } else {
      setQuizFinished(true);
    }
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  // Start the quiz
  const handleStartQuiz = () => {
    setQuizStarted(true); // Set quiz to started
    setCurrentQuestionIndex(0); // Reset to first question
    setScore(0); // Reset score
    setQuizFinished(false); // Reset finished state
  };

  // Retry the quiz if the score is less than 7
  const handleRetry = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuizFinished(false);
    setSelectedOption("");
    setShuffledQuestions([...questions].sort(() => Math.random() - 0.5)); // Shuffle again for a new random quiz
  };

  // Conditionally render the congratulatory message or failure message
  const renderResultMessage = () => {
    if (score >= 7) {
      return (
        <div className="congratulations">
          <h2>Congratulations! 🎉</h2>
          <p>You scored {score} out of {shuffledQuestions.length}</p>
          <p>Well done! Keep up the good work!</p>
        </div>
      );
    } else {
      return (
        <div className="failed">
          <h2>Oh no, you failed! 😞</h2>
          <p>Your score: {score} / {shuffledQuestions.length}</p>
          <button className="retry-btn" onClick={handleRetry}>
            Retry Quiz
          </button>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <div className="quiz-container">
        {!quizStarted ? (
          // If quiz not started, show the "Start Quiz" button
          <div className="start-screen">
            <h1>Welcome to the Quiz</h1>
            <button className="start-btn" onClick={handleStartQuiz}>
              Start Quiz
            </button>
          </div>
        ) : (
          // If quiz started, show the questions
          <>
            {!quizFinished ? (
              <>
                <h2>Question {currentQuestionIndex + 1}:</h2>
                <p>{shuffledQuestions[currentQuestionIndex]?.question}</p>
                <div className="options">
                  {shuffledQuestions[currentQuestionIndex]?.options.map((option, index) => (
                    <button
                      key={index}
                      className={`option-btn ${
                        selectedOption === option ? "selected" : ""
                      }`}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <button
                  className="next-btn"
                  onClick={handleNextQuestion}
                  disabled={!selectedOption} // Disable button if no option is selected
                >
                  {currentQuestionIndex === shuffledQuestions.length - 1 ? "Finish" : "Next"}
                </button>
              </>
            ) : (
              renderResultMessage() // Show result with either congratulations or failure message
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
