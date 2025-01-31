import { useContext, useState } from "react";
import { signIn } from "../services/api";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { AuthContext } from "../context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", { email, password });
    try {
      const response = await signIn(email, password);
      console.log(response.data);
      login(response.data.token);
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="border border-solid p-8 flex flex-col items-center justify-around h-[50vh] bg-[#00000047] rounded-2xl">
        <h2 className="text-2xl">Bienvenido</h2>
        <h2 className="text-2xl">Por favor ingrese sus datos</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="bg-black text-white text-sm rounded-lg  w-full p-2.5"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="bg-black text-white text-sm rounded-lg  w-full p-2.5"
          />
          <button type="submit">Ingresa</button>
        </form>
      </div>
    </Layout>
  );
};

export default SignIn;
