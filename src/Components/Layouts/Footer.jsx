import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import SectionWrapperLarge from "../Shared/SectionWrapperLarge";
const Footer = () => {
  return (
    <nav>
      <SectionWrapperLarge>
        <div className="flex flex-col sm:flex-row pt-16 md:pt-[90px]">
          <div className="text-white text-center bg-secondary-color py-16 md:py-24 px-6 lg:px-0 w-full sm:w-1/2">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mb-4 md:mb-6">
              Contact Us
            </h2>
            <p className="text-base md:text-xl font-medium ">
              123 ABS Street, Uni 21, Bangladesh
            </p>
            <p className="text-base md:text-xl font-medium ">+88 123456789</p>
            <p className="text-base md:text-xl font-medium ">
              Mon - Fri: 08:00 - 22:00
            </p>
            <p className="text-base md:text-xl font-medium ">
              Sat - Sun: 10:00 - 23:00
            </p>
          </div>
          <div className="text-white text-center bg-[#111827] py-16 md:py-24 px-6 lg:px-0 w-full sm:w-1/2">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mb-4 md:mb-6">
              Follow Us
            </h2>
            <p className="text-base md:text-xl font-medium mb-6">
              Join us on social media
            </p>
            <div className="flex gap-3 text-4xl justify-center">
              <FaFacebookF />
              <FaInstagram />
              <FaTwitter />
            </div>
          </div>
        </div>
      </SectionWrapperLarge>
    </nav>
  );
};

export default Footer;
