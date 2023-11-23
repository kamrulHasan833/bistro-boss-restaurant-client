import { useForm } from "react-hook-form";
import { ImSpoonKnife } from "react-icons/im";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const AddItemForm = () => {
  const axiosPublic = useAxiosPublic();
  const axiosPrivate = useAxiosPrivate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const handleAddItem = async (data) => {
    const { price, name, category, recipe, image } = data;
    const imgbbAPIKey = import.meta.env.VITE_IMGBB_POST_KEY;
    try {
      const res = await axiosPublic.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        { image: image[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { status, success } = res.data;

      if (status === 200 && success) {
        const response = await axiosPrivate.post(
          "/bistro-boss-restaurant/v1/menu",
          {
            price: parseFloat(price),
            name: name,
            recipe,
            image: res.data.data.display_url,
            category,
          }
        );

        if (response.data.insertedId) {
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
            title: "You have created item  successfully",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-dashboard-bg">
      <form className="card-body" onSubmit={handleSubmit(handleAddItem)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-icon-color">
              Recipe name<span className="text-red-600">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Recipe name"
            className="input input-bordered rounded-none border-border-color  placeholder:text-placeholder-color"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-red-500 ">Recipe name is required.</p>
          )}
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
              defaultValue="category"
              {...register("category", { required: true })}
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
            {errors.category && (
              <p className="text-red-500 ">Category is required.</p>
            )}
          </div>
          <div className="form-control basis-1/2">
            <label className="label">
              <span className="label-text">
                Price<span className="text-red-600">*</span>
              </span>
            </label>
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered rounded-none border-border-color"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <p className="text-red-500 ">Price is required.</p>
            )}
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
            className="input input-bordered rounded-none border-border-color min-h-[250px]"
            {...register("recipe", { required: true })}
          />
          {errors.recipe && (
            <p className="text-red-500 ">Recipe Details is required.</p>
          )}
        </div>

        <div>
          <input
            type="file"
            className="file-input  rounded-none bg-transparent focus:outline-none text-icon-color file:bg-border-color file:text-icon-color file:border-none file:capitalize md:file:text-base pt-6 hover:file:bg-primary-color  box-content file:content-['Image']"
            {...register("image", { required: true })}
          />
          {errors.image && <p className="text-red-500 ">Image is required.</p>}
        </div>
        <div className="form-control mt-6 items-center">
          <div>
            {" "}
            <button className="btn bg-primary-color text-white rounded-md md:px-10 capitalize md:text-base">
              Add Item <ImSpoonKnife />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
