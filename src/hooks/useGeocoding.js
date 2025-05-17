import { useState } from "react";
import { geocodeAddress, reverseGeocode } from "../utils/api";

const useGeocoding = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchGeocode = async (address) => {
    setLoading(true);
    const result = await geocodeAddress(address);
    setData(result);
    setLoading(false);
  };

  const fetchReverseGeocode = async (lat, lon) => {
    setLoading(true);
    const result = await reverseGeocode(lat, lon);
    setData(result);
    setLoading(false);
  };

  return { data, loading, fetchGeocode, fetchReverseGeocode };
};

export default useGeocoding;
