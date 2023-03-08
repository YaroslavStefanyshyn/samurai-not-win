import { useEffect, useState } from "react";
import { ApiUrl } from "../constants";

interface ResponseData {
  name: string;
  field: number;
}

interface ModifiedData {
  value: string;
  label: string;
  field: number;
}

export const useGetModeData = () => {
  const [modeData, setModeData] = useState<ModifiedData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModeData = async () => {
      setLoading(true);
      try {
        const response = await fetch(ApiUrl);
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        const modified = data.map((mode: ResponseData) => ({
          field: mode.field,
          value: mode.name.toLowerCase(),
          label: mode.name,
        }));
        setModeData(modified);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!modeData) {
      fetchModeData();
    }
  }, [modeData]);

  return { modeData, loading, error };
};
