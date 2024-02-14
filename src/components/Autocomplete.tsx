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
import "./css/autocomplete.css";

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_G_API_KEY!,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading . . .</div>;
  return <EMap />;
}

interface MapPoint {
  lat: number;
  lng: number;
}

const initPosition: MapPoint = {
  lat: 43.45,
  lng: -80.49,
};

const EMap: FC = () => {
  const [mapPoint, setMapPoint] = useState<MapPoint>(initPosition);
  const [mapAddress, setMapAddress] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);
  useEffect(() => {}, [mapPoint]);

  return (
    <>
      <div className="header">Find your address</div>
      <div className="places-container">
        <PlacesAutocomplete
          setMapPoint={setMapPoint}
          setMapAddress={setMapAddress}
        />
      </div>

      <APIProvider apiKey={process.env.REACT_APP_G_API_KEY!}>
        <div style={{ height: "100vh", width: "100%" }}>
          <Map zoom={20} center={mapPoint} mapId={"2b436a3f2f203164"}>
            <AdvancedMarker
              position={mapPoint}
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
                position={mapPoint}
                onCloseClick={() => {
                  setOpen(false);
                }}
              >
                <p>{mapAddress}</p>
              </InfoWindow>
            )}
          </Map>
        </div>
      </APIProvider>
    </>
  );
};

interface PlacesAutocompleteProps {
  setMapPoint: any;
  setMapAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
}
const PlacesAutocomplete: FC<PlacesAutocompleteProps> = ({
  setMapPoint,
  setMapAddress,
}: any) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: any) => {
    setValue(address, false);
    setMapAddress(address);

    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    console.log(address, lat, lng);
    setMapPoint({ lat, lng });
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
