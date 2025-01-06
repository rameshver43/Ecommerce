import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import InputField from "../shared/InputField";
import api from "../../api/api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { cart } = useSelector((state) => state.carts);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const updateCart = async () => {
    let currentCartState = cart;
    console.log("currentCartState", currentCartState);
    let cartFromBackend = [];
    try {
      const response = await api.get("/carts/users/cart", {
        credentials: "include",
      });
      cartFromBackend = [];
      console.log("cartResponse", response);
    } catch (error) {
      console.error("errr", error);
    }
    let finalCartState = [];

    cart.forEach(item => {
      let isAlreadyInCart = false;
      finalCartState.forEach(finalCart =>{
        if(finalCart.id)
      })
    });

  };
  const loginHandler = async (data) => {
    setLoader(true);
    try {
      const response = await api.post("/auth/signin", {
        username: data.username,
        password: data.password,
      });
      if (response.status === 200) {
        const { data } = response;
        dispatch({
          type: "LOGIN",
          payload: data,
        });

        Cookies.set("user", JSON.stringify(data), { expires: 7 });
        toast.success("Login Success.");

        updateCart();
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center relative">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="sm:w-[450px] w-[360px] bg-white shadow-lg py-8 sm:px-8 px-4 rounded-md animate-fade-in"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <AiOutlineLogin className="text-blue-500 text-5xl" />
          <h1 className="text-gray-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            Login Here
          </h1>
        </div>
        <hr className="mt-2 mb-5" />
        <div className="flex flex-col gap-3">
          <InputField
            label="UserName"
            required
            id="username"
            type="text"
            message="*UserName is required"
            placeholder="Enter your username"
            register={register}
            value={username}
            errors={errors}
            onChange={(e) => setUsername(e.target.value)}
          />

          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Enter your password"
            register={register}
            errors={errors}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          disabled={loader}
          className="bg-gradient-to-r from-blue-500 to-purple-500 flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:bg-gradient-to-l hover:from-purple-500 hover:to-blue-500 transition-all duration-300 rounded-md my-3"
          type="submit"
        >
          {loader ? <span>Loading...</span> : <>Login</>}
        </button>

        <p className="text-center text-sm text-gray-700 mt-6">
          Don't have an account?
          <Link
            className="font-semibold underline hover:text-black"
            to="/register"
          >
            <span> SignUp</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
