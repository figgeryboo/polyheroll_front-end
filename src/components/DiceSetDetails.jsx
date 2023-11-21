import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const API = 'https://polyheroll-back-end.onrender.com';

function DiceSetDetails() {
  const [diceSet, setDiceSet] = useState({
    character_name: '',
    campaign: '',
    complete_set: false,
    is_in_dice_jail: false,
    character_level: 1,
    d20: 0,
    dice_color_theme: '',
  });
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    const fetchDiceSet = async () => {
      try {
        const response = await fetch(`${API}/dicesets/${id}`);
        const data = await response.json();
        setDiceSet(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiceSet();
  }, [id]);

  const handleDelete = async () => {
    try {
      await fetch(`${API}/dicesets/${id}`, {
        method: 'DELETE',
      });
      navigate('/dicesets');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="diceset-details">
      <h1>{diceSet.character_name}</h1>
      <p>Campaign: {diceSet.campaign}</p>
      <p>Complete Set: {diceSet.complete_set ? 'Yes' : 'No'}</p>
      <p>Character Level: {diceSet.character_level}</p>
      <p>D20: {diceSet.d20}</p>
      <p>Dice Color Theme: <span style={{ color: diceSet.dice_color_theme }}>{diceSet.dice_color_theme}</span></p>
      <div className="showNavigation">
        <div>
          <Link to={`/dicesets/${id}/edit`}>
            <button>Edit</button>
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
        <div>
          <Link to={`/dicesets`}>
            <button>Back to Dice Sets</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DiceSetDetails;
