import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/colleges')
  return null
}
