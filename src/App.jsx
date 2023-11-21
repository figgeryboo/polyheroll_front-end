import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import List from "./pages/List";
import New from "./pages/New";
import Show from "./pages/Show";
import Edit from "./pages/Edit";
import Error404 from "./pages/Error404"
import './global.css'

function App() {

	return (
		<div className="App">
			<Router>
      <NavBar />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
            <Route path="/dicesets" element={< List />} />
            <Route path="/dicesets/new" element={< New />} />
            <Route path="/dicesets/:id" element={<Show />} />
            <Route path="/dicesets/:id/edit" element={<Edit />} />
            <Route path="*" element={<Error404 />} />
					</Routes>
				</main>
			</Router>
		</div>
	);
}

export default App;
