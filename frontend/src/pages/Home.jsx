import Layout from "../components/Layout";
import RestaurantSearch from "../components/RestaurantSearch";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Layout>
      <div className="justify-center text-center flex flex-col sm:gap-[2rem] gap-[0.5rem]">
        {!isAuthenticated && <h1>Bienvenido a la App de Restaurantes</h1>}
        <h2 className="text-[1.5em] p-[10px] sm:block hidden">Encuentra los mejores restaurantes cerca de ti.</h2>
        {!isAuthenticated && <h2 className="text-[1.5em] p-[10px]">Encuentra los mejores restaurantes cerca de ti.</h2>}
        {isAuthenticated && <RestaurantSearch />}
        {!isAuthenticated && <h2>Por favor ingrese para poder usar la app</h2>}
      </div>
    </Layout>
  );
};

export default Home;
