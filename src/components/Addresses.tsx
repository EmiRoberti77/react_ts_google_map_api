import React, { FC, useCallback, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";

export interface LatLng {
  lat: number;
  lng: number;
}
interface AddressesProps {}

const Addresses: FC<AddressesProps> = (): JSX.Element => {
  const [key] = useState<string>(process.env.REACT_APP_G_API_KEY!);
  const searchBox = useRef<google.maps.places.SearchBox | null>(null);
  const [address, setAddress] = useState<string>("");
  const [coords, setCoords] = useState<LatLng>({
    lat: 0,
    lng: 0,
  });

  const onLoad = (searchBoxInstance: google.maps.places.SearchBox) => {
    searchBox.current = searchBoxInstance;
  };

  const handlePlaceSelect = useCallback(
    (place: google.maps.places.PlaceResult) => {
      const address = place.formatted_address as string;
      const lat = place.geometry?.location?.lat() as number;
      const lng = place.geometry?.location?.lng() as number;

      setAddress(address);
      setCoords({
        lat,
        lng,
      });
    },
    []
  );

  const onPlacesChanged = () => {
    if (searchBox.current) {
      const places = searchBox.current.getPlaces();
      if (places && places.length > 0) {
        handlePlaceSelect(places[0]);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={key}>
      <GoogleMap
        id="map"
        center={coords}
        zoom={10}
        mapContainerStyle={{ height: "400px", width: "100%" }}
      >
        <StandaloneSearchBox
          onLoad={(searchBox) => console.log("SearchBox loaded:", searchBox)}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Enter address"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px",
            }}
          />
        </StandaloneSearchBox>
      </GoogleMap>
    </LoadScript>
  );
};

export default Addresses;
