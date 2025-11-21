"use client";

import { DisasterEvent } from "@/types";
import dynamic from "next/dynamic";
import { memo } from "react";
import type { MapContainerProps } from "react-leaflet";

const LeafletMap = dynamic(async () => import("./MapViewInternal"), {
  ssr: false,
});

type MapViewProps = {
  center: [number, number];
  disasters: DisasterEvent[];
} & Partial<MapContainerProps>;

function MapViewBase({ center, disasters, ...props }: MapViewProps) {
  return <LeafletMap center={center} disasters={disasters} {...props} />;
}

export const MapView = memo(MapViewBase);

