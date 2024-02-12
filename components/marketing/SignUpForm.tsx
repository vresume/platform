"use client"

import { Button } from '~/components/marketing/button';
import { useRouter } from 'next/navigation'



export function SignUpForm() {
  const router = useRouter()

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    router.push('/')
  }

  return (
    <form
      onSubmit={handleSubmit} // Attach the handleSubmit function
      className="relative isolate mt-8 flex items-center pr-1"
    >
      <Button type="submit" arrow className='mr-4'>
        Try for Free
      </Button>

      <a href="https://vresume-server.onrender.com/api" className="text-sm/6 text-gray-300" target="_blank" rel="noopener noreferrer">
        Explore API Docs
      </a>
    </form>
  )
}
