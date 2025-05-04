import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4040/api/games')
      .then((res) => {
        setGames(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Doosan Bears Game Log</h2>
      {loading ? (
        <p>Loading game logs...</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game._id}>
              <strong>Date:</strong> {game.date} <br />
              <strong>Opponent:</strong> {game.opponent} <br />
              <strong>Location:</strong> {game.location} <br />
              <strong>Result:</strong> {game.result} <br />
              <strong>Score:</strong> {game.score} <br />
              <strong>Memo:</strong> {game.memo}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
