import React from "react";
import { useShopping } from "../Contexts";
import { useState } from "react";

function ListItem({ list }) {
  const [isListEditable, setIsListEditable] = useState(false);
  const [listMsg, setListMsg] = useState(list.list);
  const { updatedList, deleteList, toggleComplete } = useShopping();

  const editList = () => {
    updatedList(list.id, { ...list, list: listMsg });
    setIsListEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(list.id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        list.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={list.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isListEditable ? "border-black/10 px-2" : "border-transparent"
        } ${list.completed ? "line-through" : ""}`}
        value={listMsg}
        onChange={(event) => setListMsg(event.target.value)}
        readOnly={!isListEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (list.completed) return;

          if (isListEditable) {
            editList();
          } else setIsListEditable((prev) => !prev);
        }}
        disabled={list.completed}
      >
        {isListEditable ? "📁" : "✏️"}
      </button>
      {/* Delete List Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteList(list.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default ListItem;
