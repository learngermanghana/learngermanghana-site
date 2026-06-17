import { redirect } from "next/navigation";
import { LINKS } from "@/lib/site";

export default function FreeLessonsPage() {
  redirect(LINKS.youtubeSubscribe);
}
