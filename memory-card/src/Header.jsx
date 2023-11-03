import { useState } from "react";
import pokemonText from "./assets/pokemon_text.png";

export default function Header() {
  return (
    <div className="header_container">
      <LeftHeader />
      <RightHeader />
    </div>
  );
}

function LeftHeader() {
  return (
    <div className="left_header">
      <img src={pokemonText} alt="" />
      <div>Memory Game</div>
    </div>
  );
}

function RightHeader() {
  return (
    <div className="right_header">
      <ScoreBoard />
    </div>
  );
}

function ScoreBoard() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return (
    <div className="scoreboard">
      <div className="current_score">Current Score: {currentScore}</div>
      <div className="best_score">Best Score: {bestScore}</div>
    </div>
  );
}
