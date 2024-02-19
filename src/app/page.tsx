"use client"
import { useState } from "react";

 

export default function Home() {	
	const [name, setName ] = useState('')
  return (
    <main className="">
		Find homes stress free with Homenest
		<input type="text"  value={name} onChange={e => setName(e.target.value)}
			className="bg-red-300"
		/>

		<h1>Name: { name }</h1>
    </main>
  );
}
