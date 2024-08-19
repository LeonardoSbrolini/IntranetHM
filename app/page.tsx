"use client"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <>
      <div className="p-5 fles flex-col">
        {JSON.stringify(session?.user)}
        <div>ID: {session?.user?.id}</div>
        <div>NAME: {session?.user?.name}</div>
        <div>IMAGE: {session?.user?.image}</div>
        <div>ROLE: {session?.user?.role}</div>
        <div>COMPANY: {session?.user?.company}</div>
      </div>

      <div>NEXTAUTH_URL: {process.env.NEXTAUTH_URL}</div>


      
    </>
  )
}
