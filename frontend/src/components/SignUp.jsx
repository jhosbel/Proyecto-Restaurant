import { useState, useContext } from "react";
import { signUp } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Layout from "./Layout";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp(email, password);
      console.log(response.data);
      login(response.data.token);
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="border border-solid p-8 flex flex-col items-center justify-around h-[60vh] md:h-[50vh] bg-[#00000047] rounded-2xl">
        <h2 className="text-2xl">Registrese a continuación</h2>
        <h2 className="text-2xl text-center">Complete el formulario para registrarse</h2>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
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
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
