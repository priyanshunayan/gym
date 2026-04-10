"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Dumbbell, X } from "lucide-react";

interface ExerciseImageProps {
  images: [string, string] | null;
  name: string;
}

export function ExerciseImage({ images, name }: ExerciseImageProps) {
  const [frame, setFrame] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!images) return;
    const interval = setInterval(() => {
      setFrame((f) => (f === 0 ? 1 : 0));
    }, 1200);
    return () => clearInterval(interval);
  }, [images]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  if (!images) {
    return (
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-muted">
        <Dumbbell className="h-6 w-6 text-muted-foreground/60" />
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted ring-offset-background transition-transform active:scale-95"
      >
        <Image
          src={images[frame]}
          alt={name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative mx-4 aspect-square w-full max-w-sm overflow-hidden rounded-2xl bg-muted"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[frame]}
              alt={name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 90vw, 400px"
              priority
            />
            <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-8 text-center text-sm font-semibold text-white">
              {name}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
