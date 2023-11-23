import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionHeader from "../Shared/SectionHeader";
import SectionWrapper from "../Shared/SectionWrapper";
import Testimonial from "../Shared/Testimonial";
function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const axiosInstance = useAxiosPublic();
  useEffect(() => {
    axiosInstance
      .get("/bistro-boss-restaurant/v1/reviews")
      .then(({ data }) => setTestimonials(data))
      .catch((err) => console.log(err));
  }, [axiosInstance]);
  return (
    <section>
      <SectionWrapper>
        <SectionHeader title="TESTIMONIALS" subTitle="What Our Clients Say" />
        <Swiper
          navigation={true}
          loop={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {testimonials &&
            testimonials.length > 0 &&
            testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial._id}>
                <Testimonial testimonial={testimonial} />
              </SwiperSlide>
            ))}
        </Swiper>
      </SectionWrapper>
    </section>
  );
}

export default Testimonials;
