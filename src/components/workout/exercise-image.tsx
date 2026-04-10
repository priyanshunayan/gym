"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Dumbbell } from "lucide-react";

interface ExerciseImageProps {
  images: [string, string] | null;
  name: string;
}

export function ExerciseImage({ images, name }: ExerciseImageProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!images) return;
    const interval = setInterval(() => {
      setFrame((f) => (f === 0 ? 1 : 0));
    }, 1200);
    return () => clearInterval(interval);
  }, [images]);

  if (!images) {
    return (
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-muted">
        <Dumbbell className="h-6 w-6 text-muted-foreground/60" />
      </div>
    );
  }

  return (
    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
      <Image
        src={images[frame]}
        alt={name}
        fill
        className="object-cover"
        sizes="80px"
      />
    </div>
  );
}
