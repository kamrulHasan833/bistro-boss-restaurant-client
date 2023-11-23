import { Link } from "react-router-dom";
import SectionWrapper from "../Shared/SectionWrapper";

function HotDeals() {
  return (
    <div className="bg-[url('https://i.ibb.co/kh9d0dJ/featured.jpg')] bg-fixed  mt-16 md:mt-[92px]">
      <div className="bg-black bg-opacity-60">
        <SectionWrapper>
          <div className="text-center pt-20 md:pt-[130px] pb-8 md:pb-12">
            <h5 className="text-primary-color text-lg md:text-xl pb-3 md:pb-4 ">
              ---Check it out---
            </h5>
            <h3 className="text-3xl md:text-[40px] text-white mx-auto max-w-[424px] border-y-4 border-white py-4 md:py-5 uppercase">
              FROM OUR MENU
            </h3>
          </div>

          <div className="flex items-center flex-col md:flex-row gap-10 md:gap-14 pb-20 md:pb-[130px]">
            <div>
              <img
                src="https://i.ibb.co/wYN20W5/banner2.jpg"
                alt=""
                className="w-full"
              />
            </div>
            <div className="text-white">
              <h4 className="text-base md:text-lg mb-1 ">March 20, 2023</h4>
              <h3 className="text-lg md:text-2xl font-semibold mb-1">
                WHERE CAN I GET SOME?
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                voluptate facere, deserunt dolores maiores quod nobis quas
                quasi. Eaque repellat recusandae ad laudantium tempore
                consequatur consequuntur omnis ullam maxime tenetur.
              </p>
              <div className="pt-12 pb-12 md:pb-14">
                <Link
                  className="uppercase text-lg md:text-xl font-medium text-white py-4 md:py-5 border-b-[3px] border-white rounded-lg px-6 md:px-[30px] hover:bg-white hover:text-title-color"
                  to="/our-menu"
                >
                  add to cart
                </Link>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}

export default HotDeals;
