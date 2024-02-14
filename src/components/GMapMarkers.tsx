import React, { FC } from "react";
import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
//import type { Marker } from "@googlemaps/markerclusterer";
import treeList, { trees } from "../data/trees";

const GMapMarkers: FC = () => {
  console.log("mapid", process.env.REACT_APP_G_API_KEY);
  return (
    <APIProvider apiKey={process.env.REACT_APP_G_API_KEY!}>
      <div style={{ height: "50vh", width: "100%" }}>
        <Map
          center={{ lat: 43.64, lng: -79.41 }}
          zoom={10}
          mapId={"2b436a3f2f203164"}
        >
          <Markers points={treeList} />
        </Map>
      </div>
    </APIProvider>
  );
};

export default GMapMarkers;

type Point = google.maps.LatLngAltitudeLiteral & { key: string };
type Prop = {
  points: Point[];
};
const Markers = ({ points }: Prop) => {
  return (
    <>
      {points.map((point, index) => (
        <AdvancedMarker key={index} position={point}>
          <span>🔻</span>
        </AdvancedMarker>
      ))}
    </>
  );
};
