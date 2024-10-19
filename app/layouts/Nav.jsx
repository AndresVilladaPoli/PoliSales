import { memo } from "react";
import { Link, NavLink } from "@remix-run/react";

const CustomNavLink = ({ to, name }) => (
  <NavLink
    to={`/${to}`}
    className={({ isActive, isPending }) =>
      `p-2 rounded-md transition-colors duration-300 ${
        isActive && !isPending
          ? "bg-[#cedad3] text-[#1c6b44]"
          : "text-white hover:bg-[#cedad3] hover:text-[#1c6b44]"
      }`
    }
  >
    {name}
  </NavLink>
);

const Nav = () => {
  return (
    <div className="w-full">
      <header className="relative w-full bg-[#1c6b44] text-white py-4 shadow-md flex justify-center items-center">
        <div className="w-full sm:w-auto flex justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-center">
            Bienvenido a POLIsales
          </h1>
        </div>
        <img
          src="../public/img/logo_polisales_white.png"
          alt="Logo"
          className="absolute right-8 top-1/2 transform -translate-y-1/2 h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20"
        />
      </header>

      {/* add responsive */}
      <nav className="flex flex-col sm:flex-row justify-around bg-[#1c6b44] py-3 text-sm sm:text-base">
        <CustomNavLink to="" name="Publicaciones" />
        <CustomNavLink to="new" name="Crear publicación" />
        <CustomNavLink to="publications" name="Mis publicaciones" />
        <CustomNavLink to="chats" name="Chats abiertos" />
        <CustomNavLink to="me" name="Mi perfil" />
        <Link
          to="/logout"
          className="text-white bg-[#196844] hover:bg-[#024006] focus:ring-4 focus:ring-[#A3BF3F] font-medium rounded-lg px-4 py-2 mt-2 sm:mt-0 sm:ml-4 transition-colors duration-300"
        >
          Cerrar Sesión
        </Link>
      </nav>
    </div>
  );
};

export default memo(Nav);
