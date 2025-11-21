import { IconOptions } from "leaflet";

export function getStars(rating: number): { icon: string, filled: boolean }[] {
  return Array.from({ length: 5 }, (_, i) => {
    const index = i + 1;
    if (rating >= index) return { icon: 'star', filled: true };
    if (rating >= index - 0.5) return { icon: 'star_half', filled: true };
    return { icon: 'star', filled: false };
});
}

export function getMarkerIconOptions(iconPath: string): IconOptions {
  return {
    iconUrl: iconPath,
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [0, 0]
  };
}
