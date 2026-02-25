import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { RandomReviews } from "@/components/RandomReviews";
import { getReviews } from "@/lib/reviews";

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle title="Reviews" subtitle="Real feedback from our students (shown in random order)." />
        <RandomReviews reviews={reviews} count={9} />
      </section>
    </Container>
  );
}
