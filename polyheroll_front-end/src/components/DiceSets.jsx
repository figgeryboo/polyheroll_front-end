import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DiceSet from './DiceSet';
const API = 'https://polyheroll-back-end.onrender.com';

function DiceSets() {
	const [diceSets, setDiceSets] = useState([]);
	const [displayedSets, setDisplayedSets] = useState(2);

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

	const loadMore = () => {
		setDisplayedSets(displayedSets + 2);
	};

	return (
		<div className="DiceSets">
			<section>
				<div className="dicesets-container">
					{diceSets.slice(0, displayedSets).map((diceSet) => (
						<div key={diceSet.id} className="diceset-card">
							<span style={{ color: diceSet.dice_color_theme }}>
								<h1>{diceSet.character_name}</h1>
							</span>
							<p>Campaign: {diceSet.campaign}</p>
							<p>Complete Set: {diceSet.complete_set ? 'Yes' : 'No'}</p>
							<p>Character Level: {diceSet.character_level}</p>
							<p>
								Dice Color Theme:{' '}
								<span style={{ color: diceSet.dice_color_theme }}>
									{diceSet.dice_color_theme}
								</span>
							</p>
							{diceSet.d20 > 0 && (
								<div>
									<p>
										Number of D20's:
										{[...Array(diceSet.d20)].map((_, index) => (
											<img
												key={index}
												src={`/assets/d20.png`}
												alt={`D20s: ${diceSet.d20}`}
												style={{
													marginInlineStart: '5px',
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
			{displayedSets < diceSets.length && (
				<button onClick={loadMore}>Load More</button>
			)}
		</div>
	);
}

export default DiceSets;
