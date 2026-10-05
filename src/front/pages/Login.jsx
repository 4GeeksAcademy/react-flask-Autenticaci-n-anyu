import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );

        const data = await response.json();
        console.log(data);

        if (data.token) {
            localStorage.setItem("token", data.token);
            navigate("/private");
        }
    };

    return (
        <main
            className="d-flex align-items-center justify-content-center px-3"
            style={{
                minHeight: "calc(100vh - 70px)",
                background: "linear-gradient(135deg, #f5f7ff 0%, #eef2ff 100%)",
            }}
        >
            <div
                className="card border-0 shadow-lg rounded-4 p-4 p-md-5"
                style={{ width: "100%", maxWidth: "460px" }}
            >
                <div className="text-center mb-4">
                    <div className="fs-1 mb-2">🔐</div>
                    <h1 className="h2 fw-bold">Iniciar sesión</h1>
                    <p className="text-secondary mb-0">
                        Accede de forma segura a tu área privada
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="login-email" className="form-label fw-semibold">
                            Correo electrónico
                        </label>
                        <input
                            id="login-email"
                            className="form-control form-control-lg"
                            type="email"
                            placeholder="nombre@correo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="login-password" className="form-label fw-semibold">
                            Contraseña
                        </label>
                        <input
                            id="login-password"
                            className="form-control form-control-lg"
                            type="password"
                            placeholder="Introduce tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button className="btn btn-primary btn-lg w-100" type="submit">
                        Iniciar sesión
                    </button>
                </form>

                <p className="text-center text-secondary mt-4 mb-0">
                    ¿Todavía no tienes una cuenta?{" "}
                    <Link to="/signup" className="fw-semibold text-decoration-none">
                        Regístrate
                    </Link>
                </p>
            </div>
        </main>
    );
};