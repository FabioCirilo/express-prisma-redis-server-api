import React, { useState } from "react";
import axios from "axios";
import image from "../assets/image.webp";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      // Checar se a resposta é um sucesso
      if (response.status === 200) {
        const data = response.data;
        // Armazene o token no localStorage ou sessionStorage
        localStorage.setItem("token", data.token);

        alert("Login bem-sucedido!");
        // Redirecionar ou atualizar o estado da aplicação conforme necessário
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Credenciais inválidas");
      } else {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao conectar com o servidor");
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center font-mono bg-gradient-to-r from-cyan-500 from-10% via-indigo-500 via-50% to sky-500 to-100%">
      <div className="flex shadow-2xl">
        <div className="flex flex-col items-center justify-center text-center p-20 gap-8 bg-white roudend-2xl xl:rounded-tr-none xl:rounded-br-none">
          <h1 className="text-5xl font-bold">Bem-vindo</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
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

              <div className="flex gap-1 items-center">
                <input type="checkbox" />
                <span className="text-base">Lembrar a senha</span>
              </div>
            </div>

            <button className="px-10 py-2 text-2xl rounded-md text-white bg-gradient-to-tr from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
              Login
            </button>
          </form>

          <p className="font'semibold">
            Não tens uma conta?{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Cadastra-se
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
