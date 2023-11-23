import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Food from "../Shared/Food";
import SectionHeader from "../Shared/SectionHeader";
import SectionWrapper from "../Shared/SectionWrapper";
function FoodsRecomended() {
  const [foods, setFoods] = useState([]);
  const foodsToShow = foods.slice(0, 3);
  const axioInstance = useAxiosPublic();
  useEffect(() => {
    axioInstance
      .get(`/bistro-boss-restaurant/v1/menu?category=popular`)

      .then(({ data }) => setFoods(data))

      .catch((err) => console.log(err));
  }, [axioInstance]);

  return (
    <section>
      <SectionWrapper>
        <SectionHeader
          title="chef recommends"
          subTitle="Should Try"
        ></SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {foods &&
            foods.length > 0 &&
            foodsToShow.map((food) => <Food key={food._id} food={food} />)}
        </div>
      </SectionWrapper>
    </section>
  );
}

export default FoodsRecomended;
