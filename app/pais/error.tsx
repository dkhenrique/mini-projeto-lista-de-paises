'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Error() {
  return (
    
    <section className="flex flex-col container">
      <Link href="/" className="flex items-center py-2">
        <Image src="/arrow.svg" alt="votar" width={24} height={24} />
        Voltar
      </Link>
      <h1 className="text-5xl text-center font-bold text-gray-800 my-16">Página não encontrada</h1>
    </section>
  )
}