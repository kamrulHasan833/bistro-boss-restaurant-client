import PropTypes from "prop-types";
import { Parallax } from "react-parallax";
function MenuCover({ category_details }) {
  const { category, desc, cover_image } = category_details;

  return (
    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={cover_image}
      bgImageAlt="image"
      strength={-200}
    >
      <div
        className={` ${
          category === "popular"
            ? "min-h-[572px]"
            : category === "offer" ||
              category === "contact us" ||
              category === "our shop"
            ? "min-h-[800px]"
            : "min-h-[700px]"
        } flex justify-center items-center`}
      >
        <div className="text-center    w-full">
          <div
            className={`max-w-small ${
              category === "popular"
                ? "bg-white text-title-color"
                : category === "offer" ||
                  category === "our shop" ||
                  category === "contact us"
                ? "bg-black bg-opacity-30 text-white mt-16"
                : "bg-black bg-opacity-30 text-white"
            } mx-6  xl:mx-auto min-h-[334px] flex flex-col justify-center px-6 lg:px-0`}
          >
            <h3
              className={`font-cinzel uppercase  mb-2 ${
                category === "offer" ||
                category === "our shop" ||
                category === "cotact us"
                  ? "font-bold text-4xl md:text-5xl lg:text-6xl xl:text-[88px] "
                  : "text-3xl md:text-4xl lg:text-[45px]"
              }`}
            >
              {category === "popular"
                ? "Bistro Boss"
                : category === "offer"
                ? "OUR MENU"
                : category + "s"}
            </h3>
            <p
              className={`max-w-[762px] mx-auto ${
                category === "offer" ||
                category === "our shop" ||
                category === "cotact us"
                  ? "text-lg md:text-2xl font-cinzel"
                  : "text-sm md:text-base"
              }`}
            >
              {desc}
            </p>
          </div>
        </div>
      </div>
    </Parallax>
  );
}

MenuCover.propTypes = {
  category_details: PropTypes.object,
};

export default MenuCover;
