'use client'

import CountryCard from "@/components/country-card";
import Search from "@/components/country-search";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type Country = {
  name: {
    common: string;
  };
  translations: {
    por: {
      common: string;
    };
  };
  flags: {
    svg: string;
    alt: string;
  };
  region: string;
  subregion: string;
  capital: string;
  population: number;
  languages?: {
    [key: string]: string;
  }
  borders?: string[];
  cca3: string;
}

async function getCountries(): Promise<Country[]> {
  const response = await fetch('https://restcountries.com/v3.1/all');
  return response.json();
}

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search') || ''

  useEffect(() => {
    async function fetchCountries() {
      const countries = await getCountries();
      setCountries(countries);
      setFilteredCountries(countries);
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(country => 
        country.translations.por.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm, countries]);


  return (
    <main className="container flex flex-col">
      <div className="w-full">
  
        <div className="container w-full mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Pesquisar países..." />
        </div>
        
      </div>
      <section className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-16 w-full">
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.name.common}
            name={country.name.common}
            ptName={country.translations.por.common}
            flag={country.flags.svg}
            alt={country.flags.alt}
          />
        ))}
      </section>
    </main>
    
  );
}
