import { withInteractable } from "@tambo-ai/react";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { z } from "zod";

const ICON = icon({
  iconUrl: "/marker.png",
  iconSize: [32, 32],
})

export interface MapProps {
  center?: {
    lat: number;
    lng: number;
  };
  markers?: {
    lat: number;
    lng: number;
    title: string;
    description: string;
  }[];
  zoom?: number;
}

// Component to handle map updates when props change
function MapUpdater({ center = { lat: 0, lng: 0 }, zoom = 1 }: MapProps) {
  const map = useMap();

  useEffect(() => {
    map.setView([center.lat, center.lng], zoom);
  }, [map, center.lat, center.lng, zoom]);

  return null;
}

export default function Map({
  center = { lat: 0, lng: 0 },
  zoom = 1,
  markers = [],
}: MapProps) {
  console.log(center, zoom);
  return (
    <div className="w-[600px] h-[400px] rounded-xl overflow-hidden border ">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <MapUpdater center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker key={marker.title} position={[marker.lat, marker.lng]} icon={ICON}>
            <Popup>{marker.description}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export const mapPropsSchema = z.object({
  center: z.object({
    lat: z.number().describe("The latitude of the center of the map"),
    lng: z.number().describe("The longitude of the center of the map"),
  }),
  zoom: z.number().describe("The zoom level of the map."),
  markers: z.array(z.object({
    lat: z.number().describe("The latitude of the marker"),
    lng: z.number().describe("The longitude of the marker"),
    title: z.string().describe("The title of the marker"),
    description: z.string().describe("The description of the marker"),
  })).describe("The markers to display on the map"),
});

export const InteractableMap = withInteractable(Map, {
  componentName: "map",
  description: "A map component for displaying a map",
  propsSchema: mapPropsSchema,
});
