import { Container } from "@/components/Container";
import { LINKS } from "@/lib/site";
export default function FreeLessonsPage() {
  // Vercel redirects directly to YouTube before invoking the static fallback.
  return <Container><section className="py-16 text-center">
    <h1 className="text-2xl font-bold">Free German lessons</h1>
    <p className="mt-3 text-neutral-700">Watch our free lessons on YouTube.</p>
    <a className="mt-6 inline-block rounded-xl bg-red-700 px-5 py-3 font-semibold text-white" href={LINKS.youtubeSubscribe}>Watch free lessons</a>
  </section></Container>;
}
