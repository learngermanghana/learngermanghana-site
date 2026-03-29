import { LINKS } from "@/lib/site";

type Props = {
  className?: string;
};

export function YouTubeSubscribeButton({ className = "" }: Props) {
  return (
    <a
      href={LINKS.youtubeSubscribe}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center rounded-2xl border border-red-200 bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 ${className}`}
    >
      Subscribe on YouTube
    </a>
  );
}
