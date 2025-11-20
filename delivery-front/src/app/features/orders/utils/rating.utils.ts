import { IconOptions } from "leaflet";

export function getStars(rating: number): string[] {
  const stars: string[] = [];
  
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push('star');
    } else if (rating >= i - 0.5) {
      stars.push('star_half');
    } else {
      stars.push('star_border');
    }
  }
  return stars;
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
