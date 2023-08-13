import { BrowserRouter } from "react-router-dom";
import { PageContainer } from "./Component/PageContainer/PageContainer";
import { SideNavBar } from "./Component/SideNavBar/SideNavBar";
import { Editemd } from "./Pages/Editemd/Editemd";

function App() {
	return (
		<div className='app_container'>
			<BrowserRouter>
			<Editemd/>
				<SideNavBar />
				<PageContainer />
			</BrowserRouter>
		</div>
	);
}

export default App;
