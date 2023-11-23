import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const UpdateItemForm = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosPrivate = useAxiosPrivate();
  const [item, setItem] = useState({});

  useEffect(() => {
    axiosPublic
      .get(`/bistro-boss-restaurant/v1/menu/${id}`)
      .then(({ data }) => setItem(data))
      .catch((err) => console.log(err));
  }, [axiosPublic, id]);
  const {
    name: defaultName,
    recipe: defaultRecipe,
    image: defaultImage,
    category: defaultCategory,
    price: defaultPrice,
  } = item;
  const { register, handleSubmit } = useForm();

  const handleUpdateItem = async (data) => {
    const { price, name, category, recipe, image } = data;
    const imgbbAPIKey = import.meta.env.VITE_IMGBB_POST_KEY;

    const isNewImage = image.length > 0 ? true : false;
    try {
      const res = isNewImage
        ? await axiosPublic.post(
            `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
            { image: image[0] },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
        : { data: { status: 200, success: true } };

      const { status, success } = res.data;

      if (status === 200 && success) {
        const response = await axiosPrivate.patch(
          `/bistro-boss-restaurant/v1/menu/${id}`,
          {
            price: price ? parseFloat(price) : defaultPrice,
            name: name ? name : defaultName,
            recipe: recipe ? recipe : defaultRecipe,
            image: isNewImage ? res.data.data.display_url : defaultImage,
            category: category ? category : defaultCategory,
          }
        );

        if (response.data.modifiedCount > 0) {
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
            title: "You have udated item  successfully",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-dashboard-bg">
      <form className="card-body" onSubmit={handleSubmit(handleUpdateItem)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-icon-color">
              Recipe name<span className="text-red-600">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Recipe name"
            defaultValue={defaultName}
            className="input input-bordered rounded-none border-border-color  placeholder:text-placeholder-color"
            {...register("name")}
          />
        </div>
        <div className="flex gap-6 ">
          <div className="form-control basis-1/2">
            <label className="label">
              <span className="label-text">
                Category<span className="text-red-600">*</span>
              </span>
            </label>
            <select
              className="input input-bordered rounded-none border-border-color w-full capitalize  "
              defaultValue={defaultCategory}
              {...register("category")}
            >
              <option value="category" disabled>
                category
              </option>
              <option value="salad">salad</option>
              <option value="pizza">pizza</option>
              <option value="soup">soup</option>
              <option value="dessert">desert</option>
              <option value="drinks">drinks</option>
              <option value="popular">popular</option>
              <option value="offered">offered</option>
            </select>
          </div>
          <div className="form-control basis-1/2">
            <label className="label">
              <span className="label-text">
                Price<span className="text-red-600">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Price"
              defaultValue={defaultPrice}
              className="input input-bordered rounded-none border-border-color"
              {...register("price")}
            />
          </div>
        </div>
        <div className="form-control ">
          <label className="label">
            <span className="label-text">
              Recipe Delails<span className="text-red-600">*</span>
            </span>
          </label>
          <textarea
            type="textarea"
            placeholder="Recipe Details*"
            defaultValue={defaultRecipe}
            className="input input-bordered rounded-none border-border-color min-h-[250px]"
            {...register("recipe")}
          />
        </div>

        <div>
          <div className="pt-6 ">
            <p className="text-sm md:text-base mb-1">Item Image:</p>
            <img src={defaultImage} alt="" className="w-28 md:w-40" />
          </div>
          <input
            type="file"
            className="file-input  rounded-none bg-transparent focus:outline-none text-icon-color file:bg-border-color file:text-icon-color file:border-none file:capitalize md:file:text-base pt-6 hover:file:bg-primary-color  box-content file:content-['Image']"
            {...register("image")}
          />
        </div>
        <div className="form-control mt-6 items-center">
          <div>
            {" "}
            <button className="btn bg-primary-color text-white rounded-md md:px-10 capitalize md:text-base">
              Update Recipe Details
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateItemForm;
