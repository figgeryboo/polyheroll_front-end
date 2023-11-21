import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../global.css';

const API = import.meta.env.VITE_API_URL;

function DiceSetNewForm() {
  const navigate = useNavigate();
  const [diceSet, setDiceSet] = useState({
    character_name: "",
    campaign: "",
    complete_set: false,
    is_in_dice_jail: false,
    character_level: 1,
    d20: 0,
    dice_color_theme: "",
  });

  const handleTextChange = (event) => {
    setDiceSet({ ...diceSet, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    setDiceSet({ ...diceSet, [event.target.id]: event.target.checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addDiceSet();
  };

  const addDiceSet = () => {
    const diceSetData = {
      character_name: diceSet.character_name,
      campaign: diceSet.campaign,
      complete_set: diceSet.complete_set,
      is_in_dice_jail: diceSet.is_in_dice_jail,
      character_level: diceSet.character_level,
      d20: diceSet.d20,
      dice_color_theme: diceSet.dice_color_theme,
    };

    try {
      fetch(`${API}/dicesets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(diceSetData),
      })
        .then((res) => res.json())
        .then(() => navigate("/dicesets"));
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="character_name">Character Name:</label>
        <input
          id="character_name"
          value={diceSet.character_name}
          type="text"
          onChange={handleTextChange}
          placeholder="Character Name"
          required
        />

        <label htmlFor="campaign">Campaign:</label>
        <input
          id="campaign"
          value={diceSet.campaign}
          type="text"
          onChange={handleTextChange}
          placeholder="Campaign"
          required
        />

        <label htmlFor="complete_set">Complete Set:</label>
        <input
          id="complete_set"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={diceSet.complete_set}
        />

        <label htmlFor="is_in_dice_jail">In Dice Jail:</label>
        <input
          id="is_in_dice_jail"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={diceSet.is_in_dice_jail}
        />

        <label htmlFor="character_level">Character Level:</label>
        <input
          id="character_level"
          value={diceSet.character_level}
          type="number"
          onChange={handleTextChange}
          placeholder="Character Level"
          required
        />

        <label htmlFor="d20">Number of D20:</label>
        <input
          id="d20"
          value={diceSet.d20}
          type="number"
          onChange={handleTextChange}
          placeholder="Number of D20"
          required
        />

        <label htmlFor="dice_color_theme">Dice Color Theme:</label>
        <input
          id="dice_color_theme"
          value={diceSet.dice_color_theme}
          type="text"
          onChange={handleTextChange}
          placeholder="Dice Color Theme"
          required
        />

        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <div>
        <Link to={`/dicesets`}>
          <button>Back to Dice Sets</button>
        </Link>
      </div>
    </div>
  );
}

export default DiceSetNewForm;
