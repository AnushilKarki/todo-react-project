
import { useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from 'axios'
import { redirect, useNavigate } from "react-router-dom";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChangePassword />
    </QueryClientProvider>
  );
}
const ChangePassword = () => {
  // const [registerdata, setRegisterdata] = useState({
  //   email: "",
  //   password: "",
  //   username:"",
  // });

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
    const id=localStorage.getItem('user');
  const mutation = useMutation({ mutationFn:  newTodo => {
    return axios.put('http://localhost:3013/user/'+id, newTodo)
  } })
  //create mutation done
  const navigation=useNavigate();
  const onChangePassword = e => {
    e.preventDefault()
    mutation.mutate({ password })
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigation('/');
  }

  return (
    <div>
      <div className="bg-[#5f5959] h-screen ">
        <div className="px-10  py-8 font-sans h-screen tracking-wide flex flex-col justify-center items-center w-full ">
          <div className="w-[450px] relative bg-white px-8 rounded-lg py-5">
            <div className="flex gap-5 flex-col">
              <div className="w-full h-10 font-medium flex items-center text-xl text-[#111111]">
                Change password
              </div>
              <form onSubmit={onChangePassword}>
              {/* <div className="font-400  flex flex-col gap-2 text-black">
                <label htmlFor="username">Email</label>
                <input
                  type="email"
                  className="w-full outline-none text-sm py-2 px-1 font-light border-b-2"
                  placeholder="Email"
                  name="username"
                  value={email}
                  onChange={(e) =>
                  setEmail(e.target.value)
                  }
                  id="username"
                />
              </div> */}
              <div className=" flex flex-col gap-2 text-black">
                <label htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type="password"
                    id="password"
                    className="w-full font-light outline-none border-b-2 text-sm py-2 px-1"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                     setPassword(e.target.value)
                    }
                    required
                  />
                  <div className="absolute right-1 top-1 text-black/60 cursor-pointer"></div>
                </div>
              </div>
              <button className="bg-blue-500 w-full h-12 rounded-full text-white" type="submit">
            Update
              </button>
             </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;