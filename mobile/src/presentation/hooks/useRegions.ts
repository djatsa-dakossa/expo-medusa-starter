import { useState, useEffect } from 'react';
import { MedusaRegion, IMedusaDataSource } from '@/src/data/datasources/IMedusaDataSource';
import { container } from '@/src/core/di/Container';

export interface Country {
  id: string;
  iso2: string;
  iso3: string;
  name: string;
  displayName: string;
  regionId: string;
}

export interface Region {
  id: string;
  name: string;
  currencyCode: string;
  taxRate: number;
  countries: Country[];
}

export function useRegions() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRegions = async () => {
      setLoading(true);
      setError(null);
      try {
        const medusaDataSource = container.get<IMedusaDataSource>('MedusaDataSource');
        const response = await medusaDataSource.getRegions();
        console.log("response.regions", response.regions[0]);
        // Map regions to domain format
        const mappedRegions: Region[] = response.regions.map((region: MedusaRegion) => ({
          id: region.id,
          name: region.name,
          currencyCode: region.currency_code,
          taxRate: region.tax_rate,
          countries: region.countries.map(country => ({
            id: country.id,
            iso2: country.iso_2,
            iso3: country.iso_3,
            name: country.name,
            displayName: country.display_name,
            regionId: country.region_id,
          })),
        }));

        setRegions(mappedRegions);

        // Extract all unique countries from all regions
        const allCountries: Country[] = [];
        mappedRegions.forEach(region => {
          region.countries.forEach(country => {
            console.log("country.id", country.id);
            if (!allCountries.find(c => c.id === country.id)) {
              allCountries.push(country);
            }
          });
        });

        setCountries(allCountries);
      } catch (err) {
        setError(err as Error);
        setRegions([]);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  return { regions, countries, loading, error };
}
