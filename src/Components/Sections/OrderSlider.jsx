import { Swiper, SwiperSlide } from "swiper/react";
import SectionHeader from "../Shared/SectionHeader";
import SectionWrapper from "../Shared/SectionWrapper";

// Import Swiper styles
import { useEffect, useState } from "react";

import { Pagination } from "swiper/modules";
import OrderSlide from "../Shared/OrderSlide";

function OrderSlider() {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    fetch(`${location.origin}/foods.json`)
      .then((res) => res.json())
      .then((foods) => setFoods(foods))
      .catch((err) => console.log(err));
  }, []);
  return (
    <section>
      <SectionWrapper>
        <SectionHeader
          title="order online"
          subTitle="From 11:00am to 10:00pm"
        />

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={true}
          loop={true}
          breakpoints={{
            580: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {foods &&
            foods.length > 0 &&
            foods.map((food) => (
              <SwiperSlide key={food.id}>
                <OrderSlide food={food} />
              </SwiperSlide>
            ))}
        </Swiper>
      </SectionWrapper>
    </section>
  );
}

export default OrderSlider;
