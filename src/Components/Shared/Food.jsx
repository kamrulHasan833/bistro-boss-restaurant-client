import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Food({ food }) {
  const { name, recipe, image, _id, price, category } = food;
  const axiosInstance = useAxiosPrivate();
  const { pathname } = useLocation();
  const { user } = useAuth();
  const { email } = user ? user : {};

  const navigate = useNavigate();
  // handle add to cart
  const handleAddToCart = async () => {
    if (user && email) {
      const foodForCart = {
        name,
        recipe,
        image,
        food_id: _id,
        price,
        user_email: email,
        category,
      };
      try {
        const { data } = await axiosInstance.post(
          "/bistro-boss-restaurant/v1/cart",
          foodForCart
        );
        if (data.insertedId) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "You have added food to cart  successfully",
          });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      Swal.fire({
        title: "Notice!",
        text: "Without singin, you won't be able to add food to cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign In",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signin", {
            state: pathname,
          });
        }
      });
    }
  };
  return (
    <div className="bg-card-bg">
      <div>
        <img src={image} alt="" className="w-full" />
      </div>
      <div>
        <h3 className="text-lg md:text-2xl font-semibold text-title-color mt-6 md:mt-8 text-center">
          {name}
        </h3>
        <p
          className={`text-title-color text-sm md:text-base mt-1 md:mt-2 ${
            pathname === "/" ? "text-center" : ""
          }`}
        >
          {recipe.length > 40 ? recipe.slice(0, 40) + "..." : recipe}
        </p>
      </div>
      <div className="text-center py-6 md:py-10">
        <button
          className="uppercase text-lg md:text-xl font-medium text-primary-color py-4 md:py-5 border-b-[3px] bg-border-color border-primary-color rounded-lg px-6 md:px-[30px] hover:bg-secondary-color hover:text-white"
          onClick={handleAddToCart}
        >
          add to cart
        </button>
      </div>
    </div>
  );
}

Food.propTypes = {
  food: PropTypes.object,
};

export default Food;
