"use client";
import axios from "axios";
import Image from "next/image";
import { useState, useCallback } from "react";
import localFont from "next/font/local";

const ananda = localFont({ src: "./fonts/ananda.ttf" });

export default function Home() {
  const [answer, setAnswer] = useState("");
  const [name, setName] = useState("");
  const [late, setLate] = useState(false);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    if (
      answer.toLowerCase() === "control room" ||
      answer.toLowerCase() === "cr"
    ) {
      setLoading(true);
      try {
        const getCodes = await axios.get("/api/answer");
        const codes = getCodes.data;

        if (codes.length === 0) {
          setLate(true);
          const res = await axios.post("/api/answer", {
            name: name,
            clue: "late",
            late: true,
          });

          if (!res) {
            throw new Error("Error");
          }
          setSuccess("Too late to claim the Treasure. Better luck next time!");
        } else {
          setLate(false);
          const res = await axios.post("/api/answer", {
            name: name,
            clue: codes[0]["text"] as string,
            late: false,
          });

          if (!res) {
            throw new Error("Error");
          }
          setSuccess(codes[0]["text"] as string);
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          alert(e.message);
        }
      } finally {
        setLoading(false);
      }
    } else {
      alert("Wrong answer");
    }
  }, [answer, name]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="mt-10">
          <div className="bg-[#E7A223] w-20 h-20 rounded-full mx-auto duration-200 m-8 animate-ping"></div>
        </div>
      );
    }

    if (success) {
      return (
        <div className="flex flex-col mt-10 items-center">
          {late ? (
            <div></div>
          ) : (
            <p
              className={`${ananda.className} text-center text-4xl text-white`}
            >
              Take the code and run to venue!
            </p>
          )}
          <p className="font-bold mt-4 text-center text-4xl bg-[#E7A223] p-4 rounded-xl">
            {success}
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center">
        <p
          className={`${ananda.className} text-lg md:text-3xl tracking-wider max-w-screen-md text-center text-[#E7A223]`}
        >
          Where plans are woven and secrets bloom,
          <br /> The heart of the fest beats in this room.
          <br /> Wires hum and screens all gleam,
          <br /> Find the source that drives the dream.
        </p>
        <div className="flex flex-col w-full mt-8">
          <input
            className="m-2 p-2 md:p-4 text-base md:text-xl bg-[#def4fe] rounded-xl placeholder:text-black/40 placeholder:font-semibold text-black outline-none"
            name="answer"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer"
          />
          <input
            className="m-2 p-2 md:p-4 text-base md:text-xl bg-[#def4fe] rounded-xl placeholder:text-black/40 placeholder:font-semibold text-black outline-none"
            name="teamname"
            id="teamname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Team name"
          />
        </div>
        <button
          className={`${ananda.className} px-4 py-2 text-4xl bg-[#E7A223] text-black rounded-2xl m-4 hover:bg-[#f3d9a9] hover:border-[#f3d9a9] border-4 border-[#E7A223] transition duration-300`}
          onClick={onSubmit}
        >
          SUBMIT
        </button>
      </div>
    );
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center px-4 bg-[url('/space.jpeg')] relative">
      <div className="bg-black absolute inset-0 opacity-55"></div>
      <div className="flex flex-col items-center py-10 z-0">
        <div className="flex items-center justify-center gap-4">
          <Image
            src="/bmsce-ieee-cs.png"
            width={150}
            height={150}
            alt="cs logo"
          />
          <Image src="/utsav.png" width={150} height={150} alt="utsav logo" />
        </div>
        <h1
          className={`${ananda.className} text-5xl md:text-7xl mt-8 bg-clip-text text-transparent bg-gradient-to-r from-[#a0c4ff] via-[#bdb2ff] to-[#ffc6ff] tracking-wider`}
        >
          Anthar Maze
        </h1>
        <div className="flex flex-col w-full items-center">
          <Image
            className="rounded-full"
            src="/chest.jpg"
            width={400}
            height={400}
            alt="time"
          />
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
