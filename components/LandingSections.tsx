import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Check, X } from "lucide-react";
import Image from "next/image";

const LandingSections = () => {
  return (
    <div className="w-full h-full">
      
        
        
      <Image
        src="/fondowayki.jpg"
        alt="hero"
        width={2000}
        height={2000}
        className="w-[5500px] opacity-60"
      />


    </div>
  );
};

export default LandingSections;
