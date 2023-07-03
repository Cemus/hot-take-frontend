export default function Results(props) {
  const { voteResults } = props;
  console.log(voteResults);
  return (
    <div className="results-container">
      <p>{voteResults}</p>
      <div className="bar-container">
        <div
          className="bar-results"
          style={{ "--width": `${voteResults}%` }}
        ></div>
      </div>
    </div>
  );
}
