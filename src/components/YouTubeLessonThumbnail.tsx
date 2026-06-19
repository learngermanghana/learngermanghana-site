"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type YouTubeLessonThumbnailProps = {
  videoId: string;
  title: string;
  thumbnail: string;
};

function buildThumbnailFallbacks(videoId: string, thumbnail: string) {
  return Array.from(
    new Set([
      thumbnail,
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    ]),
  );
}

export function YouTubeLessonThumbnail({
  videoId,
  title,
  thumbnail,
}: YouTubeLessonThumbnailProps) {
  const fallbacks = useMemo(
    () => buildThumbnailFallbacks(videoId, thumbnail),
    [thumbnail, videoId],
  );
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const imageSrc = fallbacks[fallbackIndex] ?? thumbnail;

  return (
    <Image
      src={imageSrc}
      alt={`Thumbnail for ${title}`}
      fill
      unoptimized
      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
      className="object-cover transition duration-300 group-hover:scale-[1.03]"
      onError={() => {
        setFallbackIndex((currentIndex) =>
          currentIndex < fallbacks.length - 1 ? currentIndex + 1 : currentIndex,
        );
      }}
    />
  );
}
