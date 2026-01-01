import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { reviews } from "@/data/content";
import { RandomReviews } from "@/components/RandomReviews";

export default function ReviewsPage() {
  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle title="Reviews" subtitle="Real feedback from our students (shown in random order)." />
        <RandomReviews reviews={reviews} count={9} />
      </section>
    </Container>
  );
}
