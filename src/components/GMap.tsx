import React, { FC, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const GMap: FC = () => {
  const position = { lat: 53.54, lng: 10 };
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey={process.env.REACT_APP_G_API_KEY!}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map zoom={10} center={position} mapId={"2b436a3f2f203164"}>
          <AdvancedMarker
            position={position}
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
              position={position}
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
  );
};
export default GMap;
