import * as React from "react"
import Image from "next/image";
import img2 from "../../../../public/avator.jpeg"

export function Avatar({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 ${className}`}>
      {children}
    </div>
  )
}

export function AvatarImage({ alt }: { src: string; alt: string }) {
  return (
    <Image src={img2} alt={alt} className="h-full w-full rounded-full object-cover" />
  )
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-medium text-gray-500">
      {children}
    </span>
  )
}
