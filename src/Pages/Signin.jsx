import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import Swal from "sweetalert2";
import SignupWithGoogle from "../Components/Shared/SignupWithGoogle";
import useAuth from "../hooks/useAuth";
const Signin = () => {
  const [disabled, setDisabled] = useState(true);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { signin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  // handle email log in
  const handleEmailSignin = (data) => {
    const { email, password } = data;
    signin(email, password).then(() => {
      Swal.fire({
        title: "Success!",
        text: "You have signed in successfully.",
        icon: "success",
      });
      if (state) {
        navigate(state);
      } else {
        navigate("/");
      }
    });
  };
  // handle captcha
  const handleCaptcha = (e) => {
    const typedCaptcha = e.target.value;
    const isMatchedCaptcha = validateCaptcha(typedCaptcha);
    console.log(isMatchedCaptcha);
    if (isMatchedCaptcha) {
      setDisabled(false);
    } else setDisabled(true);
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
            Sign In
          </h3>
          <form
            className="card-body"
            onSubmit={handleSubmit((data) => handleEmailSignin(data))}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Type your email"
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

            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                type="text"
                placeholder="Type captcha here"
                className="input input-bordered rounded-none"
                onBlur={handleCaptcha}
              />
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary bg-submit-color border-none text-white rounded-none hover:bg-secondary-color"
                // disabled={disabled}
              >
                Sign in
              </button>
            </div>
            <p className="text-sm md:text-base font-medium text-submit-color text-center mb-2">
              New here?{" "}
              <Link
                className="cursor-pointer hover:text-secondary-color"
                to="/signup"
              >
                Create a New Account
              </Link>
            </p>
            <SignupWithGoogle text="sign in with" path={state ? state : "/"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
