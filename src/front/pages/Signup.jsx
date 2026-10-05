import { useState } from "react";
import { Link } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
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
          <div className="fs-1 mb-2">👤</div>
          <h1 className="h2 fw-bold">Crear cuenta</h1>
          <p className="text-secondary mb-0">
            Regístrate para acceder al área privada
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="signup-email" className="form-label fw-semibold">
              Correo electrónico
            </label>
            <input
              id="signup-email"
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
            <label htmlFor="signup-password" className="form-label fw-semibold">
              Contraseña
            </label>
            <input
              id="signup-password"
              className="form-control form-control-lg"
              type="password"
              placeholder="Introduce una contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          <button className="btn btn-primary btn-lg w-100" type="submit">
            Registrarse
          </button>
        </form>

        <p className="text-center text-secondary mt-4 mb-0">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/Login" className="fw-semibold text-decoration-none">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
};