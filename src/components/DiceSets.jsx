import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DiceSet from './DiceSet';

const API = 'https://polyheroll-back-end.onrender.com';

function DiceSets() {
	const [diceSets, setDiceSets] = useState([]);

	const fetchData = async () => {
		try {
			fetch(`${API}/dicesets`)
				.then((res) => res.json())
				.then((res) => {
					setDiceSets(res);
				});
		} catch (error) {
			return error;
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="DiceSets">
			<section>
				<div className="dicesets-container">
					{diceSets.map((diceSet) => (
						<div key={diceSet.id} className="diceset-card">
							<h1>{diceSet.character_name}</h1>
							<p>Campaign: {diceSet.campaign}</p>
							<p>Complete Set: {diceSet.complete_set ? 'Yes' : 'No'}</p>
							<p>Character Level: {diceSet.character_level}</p>
							<p>D20: {diceSet.d20}</p>
							<p>
								Dice Color Theme:{' '}
								<span style={{ color: diceSet.dice_color_theme }}>
									{diceSet.dice_color_theme}
								</span>
							</p>
							{diceSet.d20 > 0 && (
								<div>
									<p>
										D20's:
										{[...Array(diceSet.d20)].map((_, index) => (
											<img
												key={index}
												src={`./src/assets/d20.png`}
												alt={`D20s: ${diceSet.d20}`}
												style={{
													width: '20px',
													height: '20px',
													backgroundColor: diceSet.dice_color_theme,
												}}
											/>
										))}
									</p>
								</div>
							)}

							<button>
								<Link to={`/dicesets/${diceSet.id}`}>View Details</Link>
							</button>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}

export default DiceSets;
