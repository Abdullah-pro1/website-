"use client"
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
    <button onClick={()=>{router.push("/dashboard")}} className='bg-white text-black px-3 py-1 my-5'>
      Dashboard Page 
    </button>

    <button onClick={()=>{router.push("/login")}} className='bg-white text-black px-3 py-1 my-5'>
      Login Page 
    </button>
    </main>
  )
}
