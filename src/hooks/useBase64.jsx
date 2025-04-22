import { useState } from "react";

const useBase64 = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const convertFile = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const base = await toBase64(file)
      return base;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, convertFile };
};

export default useBase64;
