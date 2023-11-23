import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import SignupWithGoogle from "../Components/Shared/SignupWithGoogle";
import useAuth from "../hooks/useAuth";
import useCreateUser from "../hooks/useCreateUser";
const Signup = () => {
  const createUser = useCreateUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signup, profileUpdate } = useAuth();
  const handleSignup = (data) => {
    const { name, email, password, image } = data;

    signup(email, password)
      .then(({ user }) => {
        profileUpdate(name, image)
          .then(() => {
            const { displayName, photoURL, email } = user;
            createUser({ displayName, photoURL, email });

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
              title: "You have signed up successfully.",
            });
            navigate("/");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="hero min-h-screen bg-[url('https://i.ibb.co/9TxZJRs/authentication.png')] bg-cover ">
      <div className="hero-content max-w-standard w-full mx-auto flex-col lg:flex-row shadow-lg">
        <div className="text-center lg:text-left">
          <div className="flex">
            <img src="https://i.ibb.co/6mX9rC5/authentication2.png" alt="" />
          </div>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm  ">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-title-color">
            Sign Up
          </h3>
          <form
            className="card-body"
            onSubmit={handleSubmit((data) => handleSignup(data))}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Type your name"
                className="input input-bordered rounded-none"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500 ">Name name is required.</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="text"
                placeholder="Type image url"
                className="input input-bordered rounded-none"
                {...register("image", { required: true })}
              />
              {errors.image && (
                <p className="text-red-500 ">Image url name is required.</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Type you email"
                className="input input-bordered rounded-none"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 ">Email name is required.</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered rounded-none"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 ">Password name is required.</p>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary bg-submit-color border-none text-white rounded-none hover:bg-secondary-color">
                Sign in
              </button>
            </div>
            <p className="text-sm md:text-base font-medium text-submit-color text-center mb-2">
              Already have an account?{" "}
              <Link
                className="cursor-pointer hover:text-secondary-color"
                to="/signin"
              >
                Please sign in
              </Link>
            </p>
            <SignupWithGoogle text="sign up with" path="/" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
