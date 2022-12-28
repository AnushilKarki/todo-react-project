import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  func: Function;
};

const CreateTodo = ({ func }: Props) => {
  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post("http://localhost:3013/todo", newTodo);
    },
  });
  //create mutation done
 
  const [createdata, setCreateData] = useState({
    title: "",
    description: "",
    status: "",
  });
const navigation = useNavigate();
  const onCreateTodo = (e) => {
    e.preventDefault();
    mutation.mutate(createdata);
    func();
    navigation('/todos');
  };

  return (
    <div className="w-full h-full flex justify-center">
      <form
        className="flex w-[90%] py-8 flex-col gap-4"
        onSubmit={(e) => onCreateTodo(e)}
      >
        <input
          type="text"
          value={createdata?.title}
          placeholder="Title"
          className="h-10 w-full px-2 outline-none border rounded-md "
          onChange={(e)=>setCreateData({...createdata,title:e.target.value})}
        />

        <input
          type="text"
          value={createdata?.description}
          placeholder="Descriptions..."
          className="h-10 w-full px-2 outline-none border rounded-md "
          onChange={(e)=>setCreateData({...createdata,description:e.target.value})}
        />

{/* <div className="w-full h-10 flex items-center justify-center"> */}
       <select name="" value={createdata?.status} onChange={(e)=>setCreateData({...createdata,status:e.target.value})} className='h-8 border rounded-md outline-none ' id="">
          <option value="">---Select---</option>
          <option value="not_started">Uncomplete</option>
          <option value="completed">Complete</option>
        </select>
       {/* </div> */}
        <div className="flex justify-center items-center">
          <button
            className="h-8 rounded-md px-5 text-white bg-green-500"
            type="submit"
            onClick={onCreateTodo}
          >
            Create Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTodo;
