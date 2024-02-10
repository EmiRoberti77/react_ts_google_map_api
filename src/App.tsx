import React, { useState } from "react";
import "./App.css";
import Addresses from "./components/Addresses";
import { LoadScript } from "@react-google-maps/api";
import Map from "./components/Map";
function App() {
  //const [key] = useState(process.env.REACT_APP_G_API_KEY);

  return <Map />;
  // return (
  //   // <LoadScript googleMapsApiKey={key!} libraries={["places"]}>
  //   //   <Addresses />
  //     <Map />
  //   {/* </LoadScript> */}
  // );
}

export default App;
