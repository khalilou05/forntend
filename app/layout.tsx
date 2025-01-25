import "@/css/global.css";
import localFont from "next/font/local";

const myFont = localFont({
  src: "./font.ttf",
});
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      dir="rtl"
      className={myFont.className}
    >
      <body>{children}</body>
    </html>
  );
}
