import { Merriweather, DM_Sans } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { DeleteDialogProvider } from "@/components/delete-dialog-context"

const fontSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" })

const fontSerif = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "700", "900"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark no-scrollbar font-sans antialiased",
        fontSans.variable,
        fontSerif.variable
      )}
    >
      <body>
        <DeleteDialogProvider>{children}</DeleteDialogProvider>
      </body>
    </html>
  )
}
