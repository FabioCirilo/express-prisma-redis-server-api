import { useState } from "react";
import image from "../assets/image.webp";
import { useNavigate } from "react-router-dom";
import AuthService from "@/services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(email, password);
      alert("Login bem-sucedido!");

      // Agora você pode usar a variável 'response' se precisar acessar dados dela
      const token = response.data.token; // Supondo que o token esteja na resposta como 'data.token'
      localStorage.setItem("token", token); // Armazena o token em localStorage

      // Validação do token após login
      const isValidToken = await AuthService.validateToken(token);

      if (isValidToken) {
        navigate("/App"); // Redireciona apenas se o token for válido
      } else {
        alert("Ocorreu um problema com a validação do token.");
      }
    } catch (err) {
      alert("Credenciais inválidas");
      console.log(err);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center font-mono bg-gradient-to-r from-cyan-500 from-10% via-indigo-500 via-50% to sky-500 to-100%">
      <div className="flex shadow-2xl">
        <div className="flex flex-col items-center justify-center text-center p-20 gap-8 bg-white rounded-2xl xl:rounded-tr-none xl:rounded-br-none">
          <h1 className="text-5xl font-bold">Bem-vindo</h1>
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className="px-10 py-2 text-2xl rounded-md text-white bg-gradient-to-tr from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
            >
              Login
            </button>
          </form>
          <p className="font-semibold">
            Não tens uma conta?{" "}
            <a href="/cadastrar" className="text-blue-400 hover:underline">
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
