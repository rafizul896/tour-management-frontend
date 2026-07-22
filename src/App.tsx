import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";
import Nabvar from "./components/shared/Nabvar";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <CommonLayout>
      <Nabvar />
      <Outlet />
      <Footer />
    </CommonLayout>
  );
}

export default App;
