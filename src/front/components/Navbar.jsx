import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-sm navbar-light bg-light shadow-sm">
			<div className="container">
				<Link to="/" className="navbar-brand fw-bold text-decoration-none">
					Sistema de autenticación
				</Link>

				<div className="d-flex gap-2">
					<Link to="/signup" className="btn btn-primary">
						Registrarse
					</Link>

					<Link to="/Login" className="btn btn-outline-primary">
						Iniciar sesión
					</Link>
				</div>
			</div>
		</nav>
	);
};