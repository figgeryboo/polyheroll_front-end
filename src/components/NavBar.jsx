import { Link } from 'react-router-dom';

export default function NavBar() {
	return (
		<nav className="navbar">
			<Link to="/dicesets">
				<h1>PolyheRoll</h1>
			</Link>
			<button>
				<Link to="/dicesets/new">Organize Your Sets</Link>
			</button>
		</nav>
	);
}
