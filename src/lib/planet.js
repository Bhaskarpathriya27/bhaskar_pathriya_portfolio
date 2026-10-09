// The hero planet is only rendered at this width and up, so the model is only
// fetched — and only waited on by the page loader — when it will be shown.
export const PLANET_MEDIA_QUERY = "(min-width: 854px)";
export const PLANET_MODEL_URL = "/models/Planet.glb";

export const shouldShowPlanet = () =>
  typeof window !== "undefined" &&
  window.matchMedia(PLANET_MEDIA_QUERY).matches;

// Resolves once <Planet> has mounted, i.e. the GLB is downloaded and parsed.
let resolvePlanet;
export const planetReady = new Promise((resolve) => {
  resolvePlanet = resolve;
});
export const markPlanetReady = () => resolvePlanet();
