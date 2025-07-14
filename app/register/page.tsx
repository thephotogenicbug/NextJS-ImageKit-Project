"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      alert("Password do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center mt-20">
      <h1 className="text-2xl text-gray-600 font-semibold">Register</h1>
      <div>
        <form
          className=" flex flex-col justify-center items-center space-y-5 mt-4 "
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" bg-gray-200 py-2 px-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" bg-gray-200 py-2 px-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className=" bg-gray-200 py-2 px-3 rounded-lg"
          />
          <button
            type="submit"
            className="bg-green-400 px-5 py-2.5 text-white rounded-lg cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
      <div className=" mt-2">
        <p className=" text-gray-500">
          Already have an account ?{" "}
          <a href="/login" className=" underline text-blue-400">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
