import { PageContainer } from "./Component/PageContainer/PageContainer";
import { SideNavBar } from "./Component/SideNavBar/SideNavBar";

function App() {
  return (
    <div className="app_container">
      <SideNavBar />
      <PageContainer />
    </div>
  );
}

export default App;
