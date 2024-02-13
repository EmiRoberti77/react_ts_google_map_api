import { Autocomplete } from "@react-google-maps/api";
import "./App.css";
import AddressSearchBox from "./components/AddressSearchBox";
import GMapMarkers from "./components/GMapMarkers";
import Places from "./components/Autocomplete";

function App() {
  // return <GMapMarkers />;
  //return <AddressSearchBox />;

  return <Places />;
}

export default App;
