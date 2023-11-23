import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function HeroSLider() {
  return (
    <div className="max-w-large mx-auto">
      <Carousel showArrows={true}>
        <div>
          <img src="https://i.ibb.co/Q82hsG9/01.jpg" />
        </div>
        <div>
          <img src="https://i.ibb.co/PTxV80Z/02.jpg" />
        </div>
        <div>
          <img src="https://i.ibb.co/CJbbn5P/03.png" />
        </div>
        <div>
          <img src="https://i.ibb.co/Wx1ZNJ7/04.jpg" />
        </div>
        <div>
          <img src="https://i.ibb.co/D10bB7C/05.png" />
        </div>
      </Carousel>
    </div>
  );
}

export default HeroSLider;
