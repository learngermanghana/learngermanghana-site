import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { SITE, LINKS } from "@/lib/site";

export default function AboutPage() {
  return (
    <Container>
      <section className="py-12 sm:py-16">
        <SectionTitle
          title="About Learn Language Education Academy"
          subtitle="German and French language tutoring in Awoshie, Accra — onsite & online. Powered by Falowen."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main story */}
          <div className="lg:col-span-2 rounded-3xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Who we are</h2>
            <p className="mt-3 text-neutral-700 leading-7">
              <span className="font-semibold">Learn Language Education Academy</span> is a German and French language
              school in Awoshie, Accra, founded by the creators of the{" "}
              <span className="font-semibold">Falowen German & French learning app</span>. We help learners of all ages
              build real speaking confidence through structured lessons, consistent practice, and strong tutor guidance
              — both <span className="font-semibold">onsite</span> and{" "}
              <span className="font-semibold">online</span>.
            </p>

            <p className="mt-4 text-neutral-700 leading-7">
              Our teaching approach is practical and exam-focused: we train students to communicate naturally, write with
              clarity, and prepare effectively for Goethe examinations using proven strategies and supportive coaching.
            </p>

            <div className="mt-6 rounded-3xl bg-neutral-50 p-5 ring-1 ring-black/5">
              <h3 className="text-base font-semibold">What makes us different</h3>
              <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                <li className="flex gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-brand-600" />
                  <span><span className="font-semibold">Personalized tutoring</span> for beginners to advanced levels.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-brand-600" />
                  <span><span className="font-semibold">Hybrid learning</span>: flexible onsite & online classes.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-brand-600" />
                  <span><span className="font-semibold">Resources + Falowen App</span> for practice outside class.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-brand-600" />
                  <span><span className="font-semibold">Exam preparation</span> with a record of helping students pass Goethe exams.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold">Services & Courses</h2>
              <p className="mt-3 text-neutral-700 leading-7">
                We offer German courses from <span className="font-semibold">Beginner</span> to <span className="font-semibold">Proficiency</span> levels,
                including private tutoring and structured class programs.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
                  <div className="font-semibold">Tutoring style</div>
                  <div className="mt-1 text-sm text-neutral-700">
                    Personalized private tutoring for all ages and levels.
                  </div>
                </div>

                <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
                  <div className="font-semibold">Learning formats</div>
                  <div className="mt-1 text-sm text-neutral-700">
                    Online classes + onsite tutoring to fit your schedule.
                  </div>
                </div>

                <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
                  <div className="font-semibold">Resources</div>
                  <div className="mt-1 text-sm text-neutral-700">
                    Structured materials, writing guidance, and Falowen practice tools.
                  </div>
                </div>

                <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
                  <div className="font-semibold">Exam preparation</div>
                  <div className="mt-1 text-sm text-neutral-700">
                    Focused preparation for Goethe exams with tips and feedback.
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={LINKS.falowen}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900"
                >
                  Sign up on Falowen
                </a>
                <a
                  href={LINKS.blog}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold hover:bg-neutral-50"
                >
                  Read our blog
                </a>
              </div>
            </div>
          </div>

          {/* Contact card */}
          <aside className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Location & Contact</h3>

            <div className="mt-4 space-y-3 text-sm text-neutral-700">
              <div>
                <div className="text-xs text-neutral-500">Address</div>
                <div className="font-semibold">Kwamisa Street GA 5808547, Awoshie, Accra</div>
              </div>

              <div>
                <div className="text-xs text-neutral-500">Phone</div>
                <a className="font-semibold hover:underline" href="tel:+233205706589">
                  +233 20 570 6589
                </a>
              </div>

              <div>
                <div className="text-xs text-neutral-500">Email</div>
                <a className="font-semibold hover:underline" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </div>

              <div>
                <div className="text-xs text-neutral-500">Website</div>
                <div className="font-semibold">www.learngermanghana.com</div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl bg-neutral-50 p-5 ring-1 ring-black/5">
              <div className="text-sm font-semibold">Opening hours</div>
              <div className="mt-3 space-y-2 text-sm text-neutral-700">
                <div className="flex justify-between"><span>Monday – Tuesday</span><span className="text-neutral-600">7 AM – 5 PM</span></div>
                <div className="flex justify-between"><span>Wednesday</span><span className="text-neutral-600">9 AM – 5 PM</span></div>
                <div className="flex justify-between"><span>Thursday – Saturday</span><span className="text-neutral-600">7 AM – 5 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span><span className="text-neutral-600">7:30 AM – 5 PM</span></div>
              </div>
            </div>

            <div className="mt-6">
              <a
                href={LINKS.falowen}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-brand-950 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-900"
              >
                Register on Falowen
              </a>
              <p className="mt-3 text-xs text-neutral-500">
                Registration & class enrollment is done via Falowen.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </Container>
  );
}
