import { Merriweather, DM_Sans } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { DeleteDialogProvider } from "@/components/delete-dialog-context"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/query-client"
import Header from "@/components/header"
import Footer from "@/components/footer"

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
        <Header />
        <QueryClientProvider client={queryClient}>
          <DeleteDialogProvider>{children}</DeleteDialogProvider>
        </QueryClientProvider>
        <Footer />
      </body>
    </html>
  )
}
