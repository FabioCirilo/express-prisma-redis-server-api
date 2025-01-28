import axios from "axios";

const API_URL = "http://localhost:3000/api/auth"; // URL de seu backend

const AuthService = {
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    // Supondo que o servidor retorna um objeto com o token
    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Salva o token
    }
    return response;
  },

  register: async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      return response; // Retorna a resposta para uso posterior
    } catch (error) {
      console.error("Erro ao registrar:", error);
      throw error; // Lança o erro para ser tratado onde o service é chamado
    }
  },

  validateToken: async (token: string) => {
    // Exemplo de uma função para validar o token, se necessário
    // Nota: Algumas APIs não requerem uma chamada para validar o token,
    // podem verificar diretamente na aplicação
    return !!token;
  },

  logout: () => {
    localStorage.removeItem("token"); // Limpa o token ao sair
  },
};

export default AuthService;
