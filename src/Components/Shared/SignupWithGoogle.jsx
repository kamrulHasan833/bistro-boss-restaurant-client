import PropTypes from "prop-types";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useCreateUser from "../../hooks/useCreateUser";
function SignupWithGoogle({ text, path }) {
  const createUser = useCreateUser();
  const { signupWithGoogle } = useAuth();
  const navigate = useNavigate();
  const handleSignupWithGoogle = () => {
    signupWithGoogle().then(({ user }) => {
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
        title: "You have signed in successfully.",
      });
      navigate(path);
    });
  };
  return (
    <div className=" mb-4 md:mb-6 ">
      <h3 className="text-lg md:text-xl ">Or, {text} </h3>
      <span onClick={handleSignupWithGoogle}>
        <FaGoogle className="text-xl md:text-2xl border-2 px-2 md:px-3 py-2 md:py-3 text-icon-color border-icon-color box-content rounded-full cursor-pointer inline-block mt-4" />
      </span>
    </div>
  );
}

SignupWithGoogle.propTypes = {
  text: PropTypes.string,
  path: PropTypes.string,
};
export default SignupWithGoogle;
