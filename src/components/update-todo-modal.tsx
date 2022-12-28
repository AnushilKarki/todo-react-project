import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
type Props = {
  items: object;
  func: Function;
};
const UpdateModal = ({ items, func }: Props) => {
  // console.log(id);
  // const [createdata, setCreateData] = useState<Object>(items);
  // const [createdata, setCreateData] = useState({
  //   title: "",
  //   description: "",
  //   status: "",
  // });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  // const id=localStorage.getItem('user');
  const updatemutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.put(`http://localhost:3013/todo/${items?.id}`, newTodo);
    },
  });
const navigate=useNavigate();
  const onUpdateTodo = (e) => {
    e.preventDefault();
    updatemutation.mutate({ title, description, status });
    func();
    navigate('/todos');
  };

  return (
    <div className="w-full h-full flex justify-center">
      <form
        className="flex w-[90%] py-8 flex-col gap-4"
        onSubmit={(e) => onUpdateTodo(e)}
      >
        <input
          type="text"
          value={title}
          placeholder="Title"
          className="h-10 w-full px-2 outline-none border rounded-md "
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="text"
          value={description}
          placeholder="Descriptions..."
          className="h-10 w-full px-2 outline-none border rounded-md "
          onChange={(e) =>
     setDescription(e.target.value)
          }
        />

        {/* <div className="w-full h-10 flex items-center justify-center"> */}
       <select name="" value={status} onChange={(e)=>setStatus(e.target.value)} className='h-8 border rounded-md outline-none ' id="">
          <option value="">---Select---</option>
          <option value="not_started">Uncomplete</option>
          <option value="completed">Complete</option>
        </select>
       {/* </div> */}
        <div className="flex justify-center items-center">
          <button
            className="h-8 rounded-md px-5 text-white bg-green-500"
            type="submit"
            onClick={() => onUpdateTodo}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateModal;
