import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LogOut from "./LogOut";

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="bg-[#000000bf] bg-opacity-70 p-4 fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-center items-center space-x-8">
        <Link className="text-white hover:text-gray-300" to="/">
          Inicio
        </Link>
        {!isAuthenticated && (
          <Link className="text-white hover:text-gray-300" to="/signup">
            Registrarse
          </Link>
        )}
        {!isAuthenticated && (
          <Link className="text-white hover:text-gray-300" to="/signin">
            Iniciar Sesión
          </Link>
        )}
        {isAuthenticated && (
          <Link className="text-white hover:text-gray-300" to="/profile">
            Perfil
          </Link>
        )}
        {isAuthenticated && <LogOut />}
      </div>
    </nav>
  );
};

export default Navbar;
