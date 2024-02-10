import React, { FC } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const api_key: string = process.env.REACT_APP_G_API_KEY!;

const Map: FC = () => {
  console.log(api_key);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: api_key,
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} />
  ) : (
    <div>Loading...</div>
  );
};

export default Map;
