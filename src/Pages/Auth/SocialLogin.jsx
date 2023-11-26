import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosNormal from "../../Hooks/useAxiosNormal";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const axiosNormal = useAxiosNormal();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleLogin().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        profile: result.user?.photoURL,
      };
      navigate("/");
      axiosNormal.post("/users", userInfo).then((res) => {
        console.log(res.data);
      });
    });
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn} className="btn w-full">
        <FaGoogle />
        SignUp with Google
      </button>
    </div>
  );
};

export default SocialLogin;
