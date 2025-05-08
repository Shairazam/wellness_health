import Link from "next/link"
import { Button } from "../app/components/ui/button"
import Image from "next/image"
import img1 from "../../public/img1.png"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-serif font-bold">Mental Wellness Coach</h1>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/login">
              <Button>Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 font-roboto">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold -tracking-wider sm:text-4xl md:text-5xl">
                  Your Personal Mental Wellness Coach
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connect with our AI-powered reflection-based coaching tool for mental wellness. Your conversations are
                  secure, private, and HIPAA-compliant.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button className="w-full min-[400px]:w-auto text-lg py-3 px-6">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button className="w-full min-[400px]:w-auto border border-gray-300">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-xl">
                  <Image
                    alt="Mental wellness illustration"
                    src={img1}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides a secure space for reflection and growth with AI-assisted coaching.
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 max-w-4xl">
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white dark:bg-gray-800">
                  <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Connect</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Sign up and start a conversation with your personal wellness coach.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white dark:bg-gray-800">
                  <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Secure</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Your conversations are encrypted and HIPAA-compliant for complete privacy.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white dark:bg-gray-800">
                  <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Continuous</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Your coach remembers previous conversations for meaningful ongoing support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Mental Wellness Coach. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
