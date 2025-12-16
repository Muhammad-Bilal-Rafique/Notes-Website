"use client";
import Navbar from "./components/Navbar";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import Welcome from "./components/Welcome";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute";
export default function Home() {
  const [notes, setnotes] = useState([]);
  const [title, settitle] = useState("");
  const [note, setnote] = useState("");
  const [id, setid] = useState("")
  const [refresh, setrefresh] = useState(true);
  const [isEditting, setisEditting] = useState(false);

  const getNotes = async () => {
    const res = await axios.get("/api/notes");
    setnotes(res.data.notes);
    console.log(res.data.notes);
  };
  useEffect(() => {
    getNotes();
  }, [refresh]);

  // HANDLE UPDATE FUNCTION
   function showPopup(id, title, note) {
    setisEditting(true);
    settitle(title);
    setnote(note);
    setid(id)
  }
  async function updateNote() {
    const res = await axios.patch("/api/notes" , {id , title , note})
    console.log("Update:",res.data);
    setisEditting(false)
    setrefresh(!refresh)
    
  }

  // HANDLE DELETE FUNCTION
  async function handleDelete(id) {
    await axios.delete("/api/notes", { data: { id: id } });
    setrefresh(!refresh);
  }

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <Welcome />
        {isEditting && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs z-50">
    <div
      className="bg-(--card-background) p-6 rounded-xl w-2/3 shadow-lg flex flex-col gap-4"
    >
      <h2 className="text-(--text-color) text-xl font-semibold">
        Edit Note
      </h2>

      <div className="flex flex-col gap-2">
        <label className="text-(--subtext-color)" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-(--primary-color)"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-(--subtext-color)" htmlFor="note">
          Note
        </label>
        <textarea
          id="note"
          placeholder="Write your note..."
          value={note}
          onChange={(e) => setnote(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-(--primary-color) resize-none "
          required
          rows={12}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={updateNote}
          className="bg-(--primary-color) text-white px-4 py-2 rounded-md hover:bg-(--hover-color) transition"
        >
          Save
        </button>
        <button
          onClick={() => setisEditting(false)}
          className="bg-(--subtext-color) text-white px-4 py-2 rounded-md hover:opacity-80 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Your Notes
          </h2>
          {notes.length === 0 ? (
            <p className="text-gray-500">
              You don't have any notes yet. Create one!
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow duration-200 relative"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">
                      {note.title}
                    </h3>
                    <div className="flex gap-2">
                      <button className="cursor-pointer text-blue-500 hover:text-blue-700">
                        <FaEdit
                          onClick={() =>
                            showPopup(note._id, note.title, note.note)
                          }
                          size={17}
                        />
                      </button>
                      <button className="cursor-pointer text-red-500 hover:text-red-700">
                        <FaTrash
                          onClick={() => handleDelete(note._id)}
                          size={17}
                        />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600">{note.note}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
