import ShopTabs from "../Components/Sections/ShopTabs";
import MenuCover from "../Components/Shared/MenuCover";

const OurShop = () => {
  return (
    <main>
      <MenuCover
        category_details={{
          category: "our shop",
          desc: "Would you like to try a dish?",
          cover_image: "https://i.ibb.co/wYN20W5/banner2.jpg",
        }}
      />

      <ShopTabs />
    </main>
  );
};

export default OurShop;
