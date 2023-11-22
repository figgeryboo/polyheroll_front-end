import frontPageGif from '/assets/frontpage.gif';

function Home() {
	return (
		<div>
			<h2 className="homeMessage">You got dice?</h2>
			<h3>At PolyHEROll, you can organize your D20's by character, campaign and theme.
				Take a look, and maybe put a d20 in dice jail.
			</h3>
			<br />
			<img
				src={frontPageGif}
				alt={'Rolling a D20'}
				style={{ width: '690px', height: '450px'}}
			/>
		</div>
	);
}

export default Home;
