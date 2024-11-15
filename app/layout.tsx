import "@/css/global.css";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../public/font/ReadexPro-VariableFont_HEXP,wght.ttf",
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
