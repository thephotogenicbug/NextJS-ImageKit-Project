"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      console.log(res.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center mt-20">
      <h1 className="text-2xl text-gray-600 font-semibold">Login</h1>
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

          <button
            type="submit"
            className="bg-green-400 px-5 py-2.5 text-white rounded-lg cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
      <div className=" mt-2">
        <p className=" text-gray-500">
          Don't have an account ?{" "}
          <a href="/register" className=" underline text-blue-400">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
