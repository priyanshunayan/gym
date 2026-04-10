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
      <div className="flex h-32 items-center justify-center rounded-md bg-muted">
        <Dumbbell className="h-8 w-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="relative h-40 w-full overflow-hidden rounded-md bg-muted">
      <Image
        src={images[frame]}
        alt={name}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 400px"
      />
    </div>
  );
}
