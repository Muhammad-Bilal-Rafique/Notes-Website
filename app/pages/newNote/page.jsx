"use client";

import React,{useState} from "react";
import { useForm } from "react-hook-form";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const Page = () => {
  const [success, setsuccess] = useState(false)
  const {
    register,
    handleSubmit,reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    try {
      const res = await axios.post("/api/notes",{title:data.title , longNote:data.longNote})
      setsuccess(res.data.success)
      reset()
      setTimeout(() => {
        setsuccess(false)
      }, 3000);
      
    } catch (error) {
      console.log(error);
      alert("Something went wrong.")
    }
  };

  return (
    <ProtectedRoute>
    <Navbar/>
    {success && (
  <p className="text-center w-full fixed bottom-4 right-4 bg-(--secondary-color) text-white px-4 py-2 rounded-md shadow-lg animate-fadeIn">
    Your Note has been successfullu saved!
  </p>
)}

    <div className="min-h-screen  flex  justify-center bg-(--background-color) p-4">
      <div className="w-full max-w-2/3 bg-(--card-background) rounded-xl shadow-lg px-6 py-2">
        <h1 className="text-2xl font-bold text-(--primary-color) mb-2">Add a New Note</h1>
        <p className="text-(--subtext-color) mb-6 text-sm">
          Keep all your thoughts organized. Add a title and note below.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-(--text-color) text-xl font-medium mb-1"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter title"
              {...register("title", {
                maxLength: { value: 20, message: "Title too long." },
              })}
              className={`w-full px-4 py-2 rounded-md border ${
                errors.title
                ? "border-(--error-color)"
                  : "border-(--subtext-color)"
                } focus:outline-none focus:ring-2 focus:ring-(--primary-color)`}
            />
            {errors.title && (
              <p className="text-(--error-color) text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Note */}
          <div>
            <label
              htmlFor="note"
              className="block text-(--text-color) text-xl mb-1"
            >
              Note:
            </label>
            <textarea
              id="note"
              placeholder="Enter Your Note......."
              {...register("longNote", {
                minLength: { value: 5, message: "Note too short." },
              })}
              className={`w-full px-4 py-2 rounded-md border ${
                errors.note
                ? "border-(--error-color)"
                : "border-(--subtext-color)"
              } focus:outline-none focus:ring-2 focus:ring-(--primary-color) resize-none`}
              rows={19}
            />
            {errors.note && (
              <p className="text-(--error-color) text-sm mt-1">
                {errors.note.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-(--primary-color) text-white py-2 rounded-md font-semibold hover:bg-(--hover-color) transition"
          >
            Save Note
          </button>
        </form>
      </div>
    </div>
    <Footer/>
            </ProtectedRoute>
  );
};

export default Page;
