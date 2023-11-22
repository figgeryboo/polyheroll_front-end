import { Link } from "react-router-dom";

function DiceSet({ diceSet }) {
  return (
    <tr>
      <td>
        {diceSet.is_in_dice_jail ? (
          <span>⛓️</span>
        ) : (
          <span>&nbsp; &nbsp; &nbsp;</span>
        )}
      </td>
      <td>
        <Link to={`/dicesets/${diceSet.id}`}>{diceSet.character_name}</Link>
      </td>
      <td>{diceSet.campaign}</td>
      <td>{diceSet.complete_set ? "Yes" : "No"}</td>
      <td>{diceSet.character_level}</td>
      <td>{diceSet.d20}</td>
      <td style={{ color: diceSet.dice_color_theme }}>{diceSet.dice_color_theme} </td>
    </tr>
  );
}

export default DiceSet;
