import { useEffect, useState } from "react";

export default function GameSection() {
  return (
    <div className="card_main_container">
      <Card />
    </div>
  );
}

function Card() {
  const [cardArray, setCardArray] = useState([]);
  const [loading, setLoading] = useState(true);
  //   const [isClicked, setIsClicked] = useState(null);
  const [clickedArray, setClickedArray] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const namesArray = [
      "pikachu",
      "meowth",
      "charmander",
      "mudkip",
      "squirtle",
      "bulbasaur",
      "abra",
      "cyndaquil",
      "lugia",
      "mewtwo",
      "latios",
      "entei",
      "celebi",
      "lucario",
    ];

    // const shuffledNamesArray = shuffleArray([...namesArray]);

    const fetchData = async () => {
      const fetchedData = [];
      for (const name of namesArray) {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          );
          const data = await response.json();
          fetchedData.push(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      setCardArray(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const shuffleArray = (array) => {
      let currentIndex = array.length;
      let temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };

    const shuffledCardArray = shuffleArray([...cardArray]);
    setCardArray(shuffledCardArray);
  }, [clickedArray, currentScore]);

  const handleCardClick = (card) => {
    // const cardId = card.target.getAttribute("id");
    console.log(card);

    //check if the clicked card is already in the clickedArray
    const isCardInClickedArray = clickedArray.includes(card);

    console.log(isCardInClickedArray);

    if (!isCardInClickedArray) {
      //if it is not in the array, then add it to the array. Add one to the current score. if the current score surpasses the best score, update best score.
      setClickedArray((prevClickedArray) => [...prevClickedArray, card]);
      setCurrentScore((prevCurrentScore) => {
        const newScore = prevCurrentScore + 1;

        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        return newScore;
      });
    } else {
      //if it is in the array, reset the current score and reset the clickedArray.
      setClickedArray([]);
      setCurrentScore(0);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="card_container">
      {cardArray.map((card) => (
        <div
          className="card"
          key={card.id}
          onClick={() => handleCardClick(card)}
        >
          <img
            src={card.sprites.other["official-artwork"].front_default}
            alt=""
          />

          {card.name}
        </div>
      ))}

      <div>Current Score: {currentScore}</div>
      <div>Best Score: {bestScore}</div>
    </div>
  );
}
