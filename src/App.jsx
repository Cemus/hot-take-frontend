/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import randomFisherYates from "./utils/randomFisherYates";
import Results from "./components/Results";
import "./App.css";

function App() {
  const [take, setTake] = useState(null);
  const [voteVisible, setVoteVisible] = useState(false);
  const [displayResult, setDisplayResult] = useState(false);
  const fetchTakes = async () => {
    const response = await fetch("/api/takes");
    const json = await response.json();

    if (response.ok) {
      const randomizedTakes = await randomFisherYates(json);
      console.log(randomizedTakes);
      setTake(randomizedTakes);
      setVoteVisible(true);
    }
  };

  useEffect(() => {
    fetchTakes();
  }, []);

  const handleFalseSubmit = async (voteType) => {
    const updatedTake = {
      ...take[0],
      votes: voteType === "hot" ? take[0].votes + 1 : take[0].votes - 1,
    };

    const response = await fetch(`/api/takes/${take[0]._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTake),
    });

    if (response.ok) {
      setTake([...take, updatedTake]);
      setVoteVisible(false);
      setDisplayResult(true);
    }
  };

  const nextTake = () => {
    setDisplayResult(false);
    fetchTakes();
  };
  return (
    <div className="container">
      {take && <p className="hot-take">{take[0].content}</p>}
      {voteVisible && (
        <div className="vote">
          <button
            onClick={() => handleFalseSubmit("hot")}
            className="button-true"
            type="button"
          >
            Vrai !
          </button>
          <button
            onClick={() => handleFalseSubmit("cold")}
            className="button-false"
            type="button"
          >
            N'importe quoi !
          </button>
        </div>
      )}

      {displayResult && <Results voteResults={take[0].votes} />}
      <button onClick={nextTake}>Next Take</button>
    </div>
  );
}

export default App;
