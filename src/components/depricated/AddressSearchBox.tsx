import React, { FC, useRef } from "react";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";

const AddressSearchBox: FC = () => {
  const searchBoxRef = useRef<any>(null);

  function handleLoad() {
    searchBoxRef.current = searchBoxRef;
  }

  function handlePlacesChanged() {
    if (searchBoxRef.current) {
      console.log(searchBoxRef.current);
      const places = searchBoxRef.current.getPlaces();
      console.log(places);
    }
  }

  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey=""
      version="weekly"
      loadingElement={<div style={{ height: "100%" }} />}
      libraries={["places", "drawing", "maps"]}
      onLoad={handleLoad}
    >
      <StandaloneSearchBox
        ref={searchBoxRef}
        onPlacesChanged={handlePlacesChanged}
      >
        <input
          ref={searchBoxRef}
          type="text"
          placeholder="type in your address"
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
    </LoadScript>
  );
};

export default AddressSearchBox;
