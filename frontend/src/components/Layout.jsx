import PropTypes from "prop-types";
import { LoadScript } from "@react-google-maps/api";

const Layout = ({ children }) => {
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div className="h-[100vh] bg-cover justify-center flex flex-col items-center">
        <div className="bg-[url(../../public/restaurante-bg.jpg)] bg-center bg-cover inset-0 absolute -z-10"></div>
        <div className="bg-[#00000080] absolute inset-0 -z-10"></div>
        {children}
      </div>
    </LoadScript>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
