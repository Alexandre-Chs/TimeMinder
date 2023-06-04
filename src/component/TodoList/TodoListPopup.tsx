import "../../styles/Todolist/Todolist.css";
import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";

const TodoListPopup = () => {
  const [allTasks, setAllTasks] = useState<string[]>([]);
  const [deleteTasks, setDeleteTasks] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submitValue = formData.get("text") as string;
    setAllTasks((current) => [...current, submitValue]);

    const key = "allTasksStorage";

    chrome.storage.local.get([key], (result) => {
      const allTasksStorage = result[key] || [];
      allTasksStorage.push(submitValue);
      chrome.storage.local.set({ [key]: allTasksStorage });
    });
    event.currentTarget.reset();
  };

  const handleFinishTask = (task: string) => {
    const newTasks = allTasks.filter((allTask) => allTask !== task);
    setDeleteTasks((current) => [...current, task]);
    setAllTasks(newTasks);

    const key = "deleteTasksStorage";
    chrome.storage.local.get([key], (result) => {
      const deleteTasksStorage = result[key] || [];
      deleteTasksStorage.push(task);
      chrome.storage.local.set({ [key]: deleteTasksStorage });
    });

    const key2 = "allTasksStorage";
    chrome.storage.local.set({ [key2]: newTasks });
  };

  const handleDelete = (task: string) => {
    const lastDeleteTasks = deleteTasks.filter((delTasks) => delTasks !== task);
    setDeleteTasks(lastDeleteTasks);

    const key = "deleteTasksStorage";
    chrome.storage.local.set({ [key]: lastDeleteTasks });
  };

  //Setup storage with useEffect
  useEffect(() => {
    chrome.storage.local.get("allTasksStorage", (result) => {
      if (result.allTasksStorage.length > 0) {
        setAllTasks(result.allTasksStorage);
      }
    });

    chrome.storage.local.get("deleteTasksStorage", (result) => {
      if (result.deleteTasksStorage.length > 0) {
        setDeleteTasks(result.deleteTasksStorage);
      }
    });
  }, []);

  return (
    <div className="timeminder-TodoPopup">
      <div className="timeminder-TodoHeader">
        <h1 className="timeminder-TodoHeaderTitle">TodoList</h1>
      </div>

      <form className="timeminder-TodoTaskManager" onSubmit={handleSubmit}>
        <input
          className="timeminder-TodoInputTask"
          type="text"
          placeholder="Add a new task"
          name="text"
        ></input>
        <label className="timeminder-TodoLabelTask">
          <button className="timeminder-todoButtonAddTask">
            <IoMdAdd size={"2em"} color="white" />
          </button>
        </label>
      </form>

      <div className="timeminder-TodoListTasks">
        <ul>
          {allTasks
            ? allTasks.map((task, index) => (
                <li
                  className="timeminder-TodoHoverLi"
                  onClick={() => handleFinishTask(task)}
                  key={index}
                >
                  {task}
                </li>
              ))
            : null}
        </ul>
      </div>

      <div className="timeminder-TodoListTasksEnd">
        {deleteTasks.length > 0 ? (
          <p className="timeminder-TodoTaskCompleted">Tasks completed :</p>
        ) : null}
        <ul>
          {deleteTasks
            ? deleteTasks.map((task, index) => (
                <div key={index} className="timeminder-TodoLiDelete">
                  <li className="timeminder-TodoLiDeleteLine">{task}</li>
                  <button
                    onClick={() => handleDelete(task)}
                    className="timeminder-TodoButtonDelete"
                  >
                    <AiFillDelete
                      size={"1em"}
                      color="white"
                      className="timeminder-TodoButtonIconDelete"
                    />
                  </button>
                </div>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default TodoListPopup;
