import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <main className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center"
        style={{ minHeight: "75vh" }}
      >
        <h1 className="display-4 fw-bold mb-3">
          Sistema de autenticación
        </h1>

        <p className="lead text-secondary mb-4">
          Crea una cuenta o inicia sesión para acceder al área privada.
        </p>

        <div className="d-flex flex-column flex-sm-row gap-3">
          <Link to="/signup" className="btn btn-primary btn-lg">
            Registrarse
          </Link>

          <Link to="/Login" className="btn btn-outline-primary btn-lg">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </main>
  );
};