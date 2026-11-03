import { Container } from "@/components/Container";
export default function BlogPage() {
  // Vercel's routing-layer redirect sends visitors to Falowen Blog.
  // Keep a useful static fallback for hosts that do not apply vercel.json.
  return <Container><section className="py-16 text-center">
    <h1 className="text-2xl font-bold">Falowen Blog</h1>
    <p className="mt-3 text-neutral-700">Our articles are now on Falowen.</p>
    <a className="mt-6 inline-block rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white" href="https://blog.falowen.app/">Visit Falowen Blog</a>
  </section></Container>;
}
