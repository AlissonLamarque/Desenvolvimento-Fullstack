import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Login bem-sucedido!");
                // You might want to store the token here, e.g., in localStorage
                // localStorage.setItem('token', data.token);
                setEmail("");
                setPassword("");
            } else {
                setMessage(data.message || "Erro ao fazer login. Verifique suas credenciais.");
            }

            setTimeout(() => setMessage(""), 3000);

        } catch (error) {
            setMessage("Erro ao conectar ao servidor. Tente novamente mais tarde.");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login de Usuário</h2>

                {message && (
                    <p className={`text-center mb-4 p-3 rounded-md ${
                        message.includes("sucesso") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                        {message}
                    </p>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
