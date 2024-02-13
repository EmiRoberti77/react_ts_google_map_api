import { useState, FC, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_G_API_KEY!,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading . . .</div>;
  return <EmiMap />;
}

const EmiMap: FC = () => {
  const [selected, setSelected] = useState({ lat: 43.45, lng: -80.49 });
  const [open, setOpen] = useState(false);
  useEffect(() => {}, [selected]);

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>

      <APIProvider apiKey={process.env.REACT_APP_G_API_KEY!}>
        <div style={{ height: "100vh", width: "100%" }}>
          <Map zoom={10} center={selected} mapId={"2b436a3f2f203164"}>
            <AdvancedMarker
              position={selected}
              onClick={() => {
                setOpen(true);
              }}
            >
              <Pin
                background={"yellow"}
                borderColor={"black"}
                glyphColor={"black"}
              />
            </AdvancedMarker>
            {open && (
              <InfoWindow
                position={selected}
                onCloseClick={() => {
                  setOpen(false);
                }}
              >
                <p>I am in Humberg</p>
              </InfoWindow>
            )}
          </Map>
        </div>
      </APIProvider>
    </>
  );
};

const PlacesAutocomplete = ({ setSelected }: any) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: any) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    console.log(lat, lng);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
