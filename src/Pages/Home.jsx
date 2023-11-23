import Contact from "../Components/Sections/Contact";
import FoodsRecomended from "../Components/Sections/FoodsRecomended";
import HotDeals from "../Components/Sections/HotDeals";
import Menu from "../Components/Sections/Menu";
import OrderSlider from "../Components/Sections/OrderSlider";
import Testimonials from "../Components/Sections/Testimonials";
import SectionDivider from "../Components/Shared/SectionDivider";

function Home() {
  return (
    <main>
      <OrderSlider />
      <SectionDivider>
        <Menu />
      </SectionDivider>
      <Contact />
      <FoodsRecomended />
      <HotDeals />
      <Testimonials />
    </main>
  );
}

export default Home;
