import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="icon.ico" />
      </head>
      <Analytics />
      <body>{children}</body>
    </html>
  )
}
