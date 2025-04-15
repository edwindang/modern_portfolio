
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import DarkModeToggle from "@/components/ui/DarkModeToggle"
import {Analytics} from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio | Edwin Dang",
  description: "Personal portfolio showcasing my projects and skills",
  icons:{
    icon: [{url : '/personal_logo_mod.png', sizes: 'any'}],
  }

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        {children}
        <DarkModeToggle />
        <Analytics />
      </body>
    </html>
  )
}
