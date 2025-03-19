import { useEffect, useState } from "react";
import axios from "axios";
import { CompanyInfo } from "../types/types";

export const useCompanies = () => {
  const [companies, setCompanies] = useState<CompanyInfo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("/fake_api/companies-lookup.json");
        setCompanies(response.data);
      } catch (err) {
        setError("Failed to fetch company information");
      }
    };
    fetchCompanies();
  }, []);

  return { companies, error };
};
