import type { Country } from "@/app/page"
import Image from "next/image";
import Link from "next/link";
import CountryCard from "@/components/country-card";

// async function getCountryByName(name: string): Promise<Country> {
//   const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
//   return (await response.json())[0];
// }

async function getCountryByName(name: string): Promise<Country> { // busca com cache 
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const countries: Country[] = await response.json();

  return countries.find((country: Country) => country.name.common === name)!;
}

async function getCountryBorderByName(name: string) {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const countries: Country[] = await response.json();

  const country = countries.find((country => country.name.common === name))!;

  return country.borders?.map(border => {
    const borderCountry = countries.find((country => country.cca3 === border))!;
    return {
      name: borderCountry.name.common,
      ptName: borderCountry.translations.por.common,
      flag: borderCountry.flags.svg,
      alt: borderCountry.flags.alt
    }
  })
}

export default async function CountryPage( {params: {name} }: {params: {name: string} }) {
  
  const country = await getCountryByName(decodeURI(name));
  const borderCountries = await getCountryBorderByName(decodeURI(name));


  const formatter = Intl.NumberFormat('en', {notation: 'compact'});

  return (
    <section className="flex flex-col container">
      <h1 className="text-5xl text-center font-bold text-gray-800 my-16">{country.translations.por.common}</h1>
      
      <Link href="/" className="flex items-center py-2">
        <Image src="/arrow.svg" alt="votar" width={24} height={24} />
        Voltar
      </Link>

      <article className="flex md:flex-row flex-col justify-between min-w-full p-10 bg-white rounded-xl">
        <section className="">
          {country.capital && <h2 className="text-xl mt-3 text-gray-800"><b>🏙️ Capital: </b>{country.capital}</h2>}
          <h2 className="text-xl mt-3 text-gray-800"><b>🗺️ Continente: </b>{country.region} { country.subregion && `- ${country.subregion}`}</h2>
          <h2 className="text-xl mt-3 text-gray-800"><b>👨‍👩‍👧‍👦 População: </b>{formatter.format(country.population)}</h2>
          {country.languages && (<h2 className="text-xl mt-3 text-gray-800">
            <b>🗣️ Línguas faladas: </b>
            
            {Object.values(country.languages).map((language) => (
              <span key={language} className="mr-2 px-2 text-white text-sm inline-block bg-indigo-700 rounded-full">{language}</span>
            ))}
          </h2>
          )}
        </section>
        
        <div className="relative w-96 h-48 my-2 md:h-auto order-first md:order-last p-2 overflow-hidden rounded-xl shadow-md">
          <Image src={country.flags.svg} alt={country.flags.alt} fill className="object-cover"/>
        </div>
      </article>

      <section>
        <h3 className="mt-12 text-2xl font-semibold text-gray-800">Países que fazem fronteira</h3>
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-4 w-full">
          {borderCountries?.map((border) => (
            // eslint-disable-next-line react/jsx-key
            <CountryCard {...border}/>
          ))}
        </div>
      </section>
    </section>
  )
}