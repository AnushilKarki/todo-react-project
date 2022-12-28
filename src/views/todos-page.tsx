import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { MdModeEditOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import CreateTodo from "../components/create-todo-modal";
import UpdateModal from "../components/update-todo-modal";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoPage />
    </QueryClientProvider>
  );
}
const TodoPage = () => {
 
  const [opencreate, setOpenCreate] = useState(false);
  const [items, setItems] = useState(Array);
  const [openedit, setOpenEdit] = useState("");
  const [edit, setEdit] = useState(Object);
  const [update, setUpdate] = useState();
  //save your todolist in setItems

  const [select,setSelect]=useState("all");
  //set Your Edit in item in setEdit

  const handleCreate = () => {};
  const [data,setData]=useState();
  const { isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3013/${select}`);
      setData(data);
      return data;
    },
  });

  const alldata = async () => {
    const { data } = await axios.get(`http://localhost:3013/all`);
    setData(data);
    return data;
  }
  const completeddata = async () => {
    const { data } = await axios.get(`http://localhost:3013/feed`);
    setData(data);
    return data;
  }
  const notcompleteddata = async () => {
    const { data } = await axios.get(`http://localhost:3013/nsfeed`);
    setData(data);
    return data;
  }
  const completed=()=> {
    setSelect("feed");
    completeddata();
  }
  const notStarted=()=>{
    setSelect("nsfeed");
    notcompleteddata();
  }
  const all=()=>{
    setSelect("all");
    alldata();
  }
  const navigation = useNavigate();
  const logout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigation('/');
  }

  const deletemutation = useMutation({
    mutationFn: (id) => {
      return axios.delete("http://localhost:3013/todo/" + id);
    },
  });
  //
  return (
    <div>
      <div className="w-full h-screen bg-slate-100 flex justify-center items-center">
        <div className="w-[50%] min-h-[50%] relative p-5 bg-white">
          <div className="w-full  justify-between flex items-center h-14">
            <div className="flex gap-4 w-[70%]">
              <button type="submit" onClick={all}>all</button>
              <button type="submit" onClick={completed}>completed</button>
              <button type="submit" onClick={notStarted}>not completed</button>
             {/* <buttton onClick={()=>setSelect("all")} className={`h-8 rounded-md border px-3 ${select==="all"&&"bg-blue-500 text-white"}`}>All</buttton>
             <buttton onClick={()=>setSelect("feed")} className={`h-8 rounded-md border px-3 ${select==="feed"&&"bg-blue-500 text-white"}`}>Completed</buttton>
             <buttton onClick={()=>setSelect("nsfeed")} className={`h-8 rounded-md border px-3 ${select==="nsfeed"&&"bg-blue-500 text-white"}`}>Not Completed</buttton> */}
            </div>
            <button
              onClick={() => {
                setOpenCreate(!opencreate);
                setOpenEdit("");
              }}
              className="px-4 text-white h-8  text-sm rounded-md bg-red-500"
            >
              {" "}
              Create Todo
            </button>
          </div>
          <div className="w-full  h-full mt-3">
            {opencreate ? (
              <>
                {openedit !== "Edit" ? (
                  <CreateTodo func={() => setOpenCreate(!opencreate)} />
                ) : (
                  <UpdateModal
                    items={edit}
                    func={() => setOpenCreate(!opencreate)}
                  />
                )}
              </>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-left h-10 border-b text-[#2C4373] font-medium">
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((todo) => (
                    <tr key={todo.id} className="text-sm border-b h-10 ">
                      <td>{todo.title}</td>
                      <td>{todo.description}</td>
                      <td>{todo.status}</td>
                      <td className="w-20">
                        <div className="text-sm w-[100px] flex justify-center items-center gap-5 text-primary_text font-semibold ">
                          <button
                            onClick={() => {
                              setOpenCreate(true);
                              setEdit(todo);
                              setOpenEdit("Edit");
                            }}
                            className="text-primary_green"
                          >
                            <MdModeEditOutline size={18} />
                          </button>
                          <button
                            className="text-primary_red"
                            onClick={() => {
                              deletemutation.mutate(todo.id);
                            }}
                          >
                            <AiOutlineDelete size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <Link to={"/"}>
              <div className="cursor-pointer absolute bottom-4 right-4 text-[24px]   ">
                <FiLogOut onClick={logout}/>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
function componentWillUnmount() {
  throw new Error("Function not implemented.");
}

