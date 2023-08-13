import { BrowserRouter } from "react-router-dom";
import { PageContainer } from "./Component/PageContainer/PageContainer";
import { SideNavBar } from "./Component/SideNavBar/SideNavBar";

function App() {
  return (
    <div className="app_container">
      <BrowserRouter>
        <SideNavBar />
        <PageContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
