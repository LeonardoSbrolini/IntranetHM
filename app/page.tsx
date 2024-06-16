
export default function Home() {
  return (
    <>
      <div>NEXTAUTH_URL: {process.env.NEXTAUTH_URL}</div>
      <div>NEXTAUTH_SECRET: {process.env.NEXTAUTH_SECRET}</div>
      <div>DATABASE_URL: {process.env.DATABASE_URL}</div>
      <div>NEXT_PUBLIC_API_URL: {process.env.NEXT_PUBLIC_API_URL}</div>
    </>
  )
}
