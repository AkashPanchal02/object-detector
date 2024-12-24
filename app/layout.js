import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Object Detector - By Akash Panchal",
  description: "Object detection is a cutting-edge computer vision technology that identifies and locates objects within an image or video. By leveraging advanced algorithms and AI-powered models, object detection goes beyond simple image classification to provide precise boundaries and labels for various objects, making it invaluable for industries like security, e-commerce, healthcare, and autonomous driving. Popular frameworks such as TensorFlow, PyTorch, and YOLO (You Only Look Once) enable developers to build efficient object detection systems. Implementing object detection can enhance user experiences, streamline operations, and drive data-driven insights. Stay ahead in the tech landscape by integrating object detection into your solutions and unleashing its potential for innovation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
