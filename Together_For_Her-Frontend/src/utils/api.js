const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";

export const geocodeAddress = async (address) => {
  const response = await fetch(`${NOMINATIM_BASE_URL}/search?q=${address}&format=json`);
  return await response.json();
};

export const reverseGeocode = async (lat, lon) => {
  const response = await fetch(`${NOMINATIM_BASE_URL}/reverse?lat=${lat}&lon=${lon}&format=json`);
  return await response.json();
};
