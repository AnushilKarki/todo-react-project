import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { BsApple, BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from 'axios';
const queryClient = new QueryClient();
function App(){
  return (
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  );
}
const Login = () => {
  const navigate = useNavigate();
  const [showpassword, setShowPassword] = useState(Boolean);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const mutation = useMutation({ mutationFn:  newTodo => {
    return axios.post('http://localhost:3013/auth/login', newTodo)
  } })
  // console.log(mutation.data?.data.access_token)
  localStorage.setItem('user',mutation.data?.data.user.id);
  localStorage.setItem('token', mutation.data?.data.access_token);
  //create mutation done
  const onLogin = e => {
    e.preventDefault();
    mutation.mutate({ email , password })
    localStorage.setItem('user',mutation.data?.data.user.id);
    localStorage.setItem('token', mutation.data?.data.access_token);
  }
  return (
    <div>
      {" "}
      <div className="bg-[#F8F8F8] h-screen ">
        <div className="px-10  py-8 font-sans h-screen tracking-wide flex flex-col justify-center items-center w-full ">
          <div className="w-[450px] relative bg-white px-8 rounded-lg py-5">
          
            <div className="flex gap-5 flex-col">
        
              <div className="w-full h-10 font-medium flex items-center text-xl text-[#111111]">
                Login
              </div>
              <form onSubmit={onLogin}>
              <div className="font-400  flex flex-col gap-2 text-black">
                <label htmlFor="username">Email</label>
                <input
                  type="email"
                  className="w-full outline-none text-sm py-2 px-1 font-light border-b-2"
                  placeholder="Email"
                  value={email}
                  onChange={(e) =>
                   setEmail(e.target.value)
                  }
                  name="username"
                  id="username"
                />
              </div>
              <div className=" flex flex-col gap-2 text-black">
                <label htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) =>
                     setPassword(e.target.value)
                    }
                    type={`${showpassword ? "text" : "password"}`}
                    className="w-full font-light outline-none border-b-2 text-sm py-2 px-1"
                    placeholder="Enter your password"
                    required
                  />
                  <div
                    onClick={() => setShowPassword(!showpassword)}
                    className="absolute right-1 top-1 text-black/60 cursor-pointer"
                  >
                    {!showpassword ? <FiEyeOff /> : <FiEye />}
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center h-10 underline text-gray-500 text-sm font-normal">
                <span className=" hover:text-[#ff5959] cursor-pointer">
                  Forget password?
                </span>
              </div>
              <button className="bg-blue-500 w-full h-12 rounded-full text-white">
                Log In
              </button>
              </form>
              <div className="w-full flex text-gray-700 mb-2 text-sm font-light items-center justify-center">
                Don't have an account?
                <Link to={"/signin"}>
                  <span className=" font-normal underline  hover:text-blue-500 cursor-pointer">
                    Sign up
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
