import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/auth";
import image from "../assets/image.webp";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await AuthService.register(name, email, password);
      if (response.status === 201) {
        alert("Cadastro realizado com sucesso! Redirecionando para login.");
        navigate("/"); // Redireciona para a página de login
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Falha no cadastro. Tente novamente.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center font-mono bg-gradient-to-r from-cyan-500 from-10% via-indigo-500 via-50% to sky-500 to-100%">
      <div className="flex shadow-2xl">
        <div className="flex flex-col items-center justify-center text-center p-20 gap-8 bg-white rounded-2xl xl:rounded-tr-none xl:rounded-br-none">
          <h1 className="text-5xl font-bold">Cadastra-se</h1>
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col text-2xl text-left gap-1">
              <span>Nome</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-md p-1 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50"
              />
            </div>
            <div className="flex flex-col text-2xl text-left gap-1">
              <span>Email</span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md p-1 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50"
              />
            </div>
            <div className="flex flex-col text-2xl text-left gap-1">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md p-1 border-2 outline-none focus:border-cyan-400 focus:bg-slate-50"
              />
            </div>
            <button
              type="submit"
              className="px-10 py-2 text-2xl rounded-md text-white bg-gradient-to-tr from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
            >
              Cadastrar
            </button>
          </form>
          <p className="font-semibold">
            Já tens uma conta?{" "}
            <a href="/" className="text-blue-400 hover:underline">
              Login
            </a>{" "}
          </p>
        </div>
        <img
          src={image}
          alt="Decorative"
          className="w-[450px] object-cover xl:rounded-tr-2xl xl:rounded-br-2xl xl:block hidden"
        />
      </div>
    </section>
  );
}
