import { redirect } from "next/navigation";
import { LINKS } from "@/lib/site";

export default function BlogPage() {
  redirect(LINKS.blog);
}
