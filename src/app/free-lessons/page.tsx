import { redirect } from "next/navigation";
import { SOCIAL_LINKS } from "@/lib/site";

export default function FreeLessonsPage() {
  redirect(SOCIAL_LINKS.youtube);
}
