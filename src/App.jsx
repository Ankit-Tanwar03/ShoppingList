import { useState } from "react";
import { useEffect } from "react";
import { ShoppingProvider } from "./Contexts";
import ListForm from "./components/ListForm";
import ListItem from "./components/ListItems";

function App() {
  const [lists, setLists] = useState([]);

  const addList = (list) => {
    setLists((prev) => [{ id: Date.now(), ...list }, ...prev]);
  };

  const updatedList = (list, id) => {
    setLists((prev) =>
      prev.map((prevList) => (prevList.id === id ? list : prevList))
    );
  };

  const deleteList = (id) => {
    setLists((prev) => prev.filter((list) => list.id !== id));
  };

  const toggleComplete = (id) => {
    setLists((prev) =>
      prev.map((prevList) =>
        prevList.id === id
          ? { ...prevList, completed: !prevList.completed }
          : prevList
      )
    );
  };

  useEffect(() => {
    const lists = JSON.parse(localStorage.getItem("lists"));

    if (lists && lists.length > 0) {
      setLists(lists);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  return (
    <ShoppingProvider
      value={{ lists, addList, updatedList, deleteList, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="bg-[#742b236c] w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Shopping List
          </h1>
          <div className="mb-4">
            <ListForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {lists.map((list) => (
              <div key={list.id} className="w-full">
                <ListItem list={list} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ShoppingProvider>
  );
}

export default App;
