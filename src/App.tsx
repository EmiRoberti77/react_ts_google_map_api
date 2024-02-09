import React, { useState } from "react";
import "./App.css";
import Addresses from "./components/Addresses";
import { LoadScript } from "@react-google-maps/api";
function App() {
  const [key] = useState(process.env.REACT_APP_G_API_KEY);

  return (
    <LoadScript googleMapsApiKey={key!} libraries={["places"]}>
      <Addresses />
    </LoadScript>
  );
}

export default App;
