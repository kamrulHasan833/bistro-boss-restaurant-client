import { Outlet } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Footer from "./Components/Layouts/Footer";
import Header from "./Components/Layouts/Header";
function App() {
  return (
    <div className=" font-inter">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
