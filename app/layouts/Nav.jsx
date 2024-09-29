import { memo } from "react";
import { Link, NavLink } from "@remix-run/react";

const CustomNavLink = ({ to, name }) => (
  <NavLink
    to={`/${to}`}
    className={({ isActive, isPending }) =>
      `p-2.5 rounded-md transition-colors duration-300 ${
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
      <header className="w-full bg-[#1c6b44] text-white py-4 shadow-md">
        <h1 className="text-4xl font-bold text-center">
          Bienvenido a POLIsales
        </h1>
      </header>
      <nav className="flex justify-around bg-[#1c6b44] py-3">
        <CustomNavLink to="" name="Publicaciones" />
        <CustomNavLink to="new" name="Crear publicación" />
        <CustomNavLink to="publications" name="Mis publicaciones" />
        <CustomNavLink to="chats" name="Chats abiertos" />
        <CustomNavLink to="me" name="Mi perfil" />
        <Link
          to="/logout"
          className="text-white bg-[#196844] hover:bg-[#024006] focus:ring-4 focus:ring-[#A3BF3F] font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-300"
        >
          Cerrar Sesión
        </Link>
      </nav>
    </div>
  );
};

export default memo(Nav);