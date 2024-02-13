import Link from 'next/link'
import { siteConfig } from "~/common/config/site"
import { SignUpForm } from '~/common/components/marketing/signup-form'

export function Intro() {
  return (
    <>
      <div>
        <Link href="/" className='text-white'>
          {siteConfig.name}
        </Link>
      </div>
      <h1 className="mt-14 font-display text-4xl/tight font-light text-white">
        {/* gradient left to right using text-sky-300 */}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-300">
          {siteConfig.tagline}
        </span>
      </h1>
      <p className="mt-4 text-sm/6 text-gray-300">
        {siteConfig.description}
      </p>
      <SignUpForm />
    </>
  )
}

export function IntroFooter() {
  return (
    <p className="flex items-baseline gap-x-2 text-[0.8125rem]/6 text-gray-500">

    </p>
  )
}
