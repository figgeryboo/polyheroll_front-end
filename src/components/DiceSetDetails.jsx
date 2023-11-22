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

	const [jailReasons, setJailReasons] = useState([]);
	const [newReason, setNewReason] = useState('');

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

	useEffect(() => {
		const storedJailReasons = localStorage.getItem(`diceJail_${id}`);
		const parsedJailReasons = storedJailReasons
			? JSON.parse(storedJailReasons)
			: [];
		setJailReasons(parsedJailReasons);
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

	const handleAddReason = () => {
		const updatedReasons = [...jailReasons, newReason];
		setJailReasons(updatedReasons);
		localStorage.setItem(`diceJail_${id}`, JSON.stringify(updatedReasons));
		setNewReason('');
	};

	return (
		<div className="diceset-details">
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
								alt={`${diceSet.d20}`}
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
			<div className="diceJail">
				<h2>DICE JAIL</h2>
				<ul>
					{jailReasons.map((reason, index) => (
						<li key={index}>⛓️{reason}⛓️</li>
					))}
				</ul>
				<hr />
				<label htmlFor="reason">Reason for Jail:</label>
				<input
					type="text"
					id="reason"
					value={newReason}
					onChange={(event) => setNewReason(event.target.value)}
				/>
				<br />
				<button onClick={handleAddReason}>Add to Jail</button>
			</div>
		</div>
	);
}

export default DiceSetDetails;
