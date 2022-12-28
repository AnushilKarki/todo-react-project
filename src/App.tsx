import { useState } from "react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import "./App.css";

import TodoPage from "./views/todos-page";
import Login from "./views/login";
import Register from "./views/register";
import ChangePassword from "./views/changepassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todos" element={<TodoPage />} />
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
