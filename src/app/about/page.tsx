import BlueskyTimeline from "../components/BlueSkyTimeline";
import "../styles.scss";

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-[1fr,400px] lg:gap-8">
        <main className="flex flex-col gap-6 font-[family-name:var(--font-geist-sans)]">
          <h1 id="main-content" className="text-center lg:text-left">
            About
          </h1>
          <p>
            Drew is passionate about using design and quality code to create a
            positive impact on people who are not always considered by
            technologists, this shows in their course projects from the Allen
            School at UW and current work at KBCS on a cross functional team.
            They are a published researcher in the field of Data Science, as
            coauthor of the paper, &quot;Practical considerations for variable
            screening in the super learner&quot;, in the The New England Journal
            of Statistics in Data Science. In Drew&apos;s free time they are an
            avid reader, world traveler, and enjoy baking gluten free pastries.
            They live in the Seattle area with their house plants.
          </p>
          <p>
            As a firm believer in accessibility, Drew was the Co-Chair of a
            student organization whose mission was to foster a culture of
            inclusion for people with disabilities in the Allen School and
            educate students about creating accessible software. As Co-Chair of
            Ability, Drew educated the team about accessible document creation
            and started a book club. Drew collaborated with a peer, Lee
            Janzen-Morel, on an initiative called &quot;Multicultural
            Matrix&quot;, which was influential in the creation of a Diversity
            and Access Lounge on the Allen School Campus for underrepresented
            students. In the future, Drew would like to continue working on a
            cross functional team building interactive experiences that are user
            friendly to diverse audiences and creating inclusive communities.
          </p>
          <p>
            Community service and stewardship are values that Drew cares deeply
            about. Although Drew does not use much social media anymore, they
            are an administrator for a bluesky account for the organization
            &quot;Disabled In Computing&quot; and created a website for them on
            Google Sites. Drew also runs a personal bluesky account where they
            talk about their experiences as a technologist.
          </p>
        </main>
        <aside className="mt-8 lg:mt-0">
          <div className="sticky top-4">
            <BlueskyTimeline feedUrl="https://embedbsky.com/feeds/a41fb0eee986d380449f9a22cc7cb8091bc06cf810b4194b3a38279ed633516e.html" />
          </div>
        </aside>
      </div>
    </div>
  );
}
