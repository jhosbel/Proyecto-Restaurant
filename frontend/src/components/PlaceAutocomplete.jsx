import PropTypes from "prop-types";
import { useState/* , useEffect  */} from "react";
import { Autocomplete } from "@react-google-maps/api";

const PlaceAutocomplete = ({ onPlaceSelected }) => {
  const [searchResult, setSearchResult] = useState(null);
  //const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  /* useEffect(() => {
    if (window.google && window.google.maps) {
      setIsScriptLoaded(true);
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }&libraries=places`;
      script.async = true;
      script.onload = () => setIsScriptLoaded(true);
      document.head.appendChild(script);
    }
  }, []); */

  const onLoad = (autocomplete) => {
    setSearchResult(autocomplete);
  };

  const onPlaceChanged = () => {
    if (!searchResult) return;
    const place = searchResult.getPlace();
    //console.log("Lugar seleccionado:", place);
    if (!place.geometry || !place.geometry.location) {
      console.error(
        "⚠️ No se encontró geometry en el lugar seleccionado:",
        place
      );
      return;
    }
    onPlaceSelected({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
  };

  /* if (!isScriptLoaded) {
    return <div>Cargando Google Maps...</div>;
  } */

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <input
        type="text"
        placeholder="Buscar un lugar..."
        className="w-[20rem] p-[10px] border bg-[#2f2f2f61] rounded-[10px]"
      />
    </Autocomplete>
  );
};

PlaceAutocomplete.propTypes = {
  onPlaceSelected: PropTypes.func.isRequired,
};

export default PlaceAutocomplete;
