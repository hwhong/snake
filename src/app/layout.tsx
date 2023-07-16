import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NYC Snake",
  description: "One apple at a time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

// const animate = (time: any) => {
//   if (previousTimeRef.current != undefined) {
//     const deltaTime = time - previousTimeRef.current;

//     // const newCoords = [];
//     // for (let i = 0; i < coords.length; i++) {
//     //   newCoords.push({ x: coords[i].x, y: coords[i].y + 1 });
//     // }
//     setCoords((prevCoords) =>
//       prevCoords.map(({ x, y }) => ({ x, y: y + 1 }))
//     );

//     setCount((prevCount) => (prevCount + deltaTime * 0.01) % 100);
//   }

//   previousTimeRef.current = time;
//   requestRef.current = requestAnimationFrame(animate);
// };

// requestRef.current = requestAnimationFrame(animate);
// return () => cancelAnimationFrame(requestRef.current);

// React.useEffect(() => {
//   requestRef.current = requestAnimationFrame(animate);
//   return () => cancelAnimationFrame(requestRef.current);
// }, []);

// console.log(count);
