import "../../styles/Buttons/Todolist.css";
import React, { useState } from "react";
import { FaListUl } from "react-icons/fa";
import TodoListPopup from "./TodoListPopup";

const TodoList = () => {
  const [isTodoOpen, setIsTodoOpen] = useState(false);

  const handleClick = () => {
    setIsTodoOpen((current) => !current);
  };

  return (
    <>
      <div onClick={handleClick} className="timeminder-TodoIcon">
        <FaListUl size={"2em"} className="timeminder-todoIconSidebar" />
      </div>
      {isTodoOpen ? <TodoListPopup /> : null}
    </>
  );
};

export default TodoList;
