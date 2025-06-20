import MainHeader from "@/components/main-header/MainHeader";
import "./globals.css";
import MainHeaderBackground from "@/components/main-header/MainHeaderBackground";

export const metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
