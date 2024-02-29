import React from "react";
import { useState } from "react";
import { useShopping } from "../Contexts";

function ListForm() {
  const [list, setList] = useState("");

  const { addList } = useShopping();

  const add = (event) => {
    event.preventDefault();

    if (!list) return;
    addList({ list, completed: false });
    setList("");
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write List..."
        value={list}
        onChange={(event) => setList(event.target.value)}
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default ListForm;
