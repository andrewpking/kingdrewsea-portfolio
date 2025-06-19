import BlueskyTimeline from "../components/BlueSkyTimeline";
import "../styles.scss";

export default function Home() {
  return (
    <div className="lg:container mx-auto px-6 sm:px-2 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-[1fr,400px] lg:gap-8">
        <main className="flex flex-col gap-6 font-[family-name:var(--font-geist-sans)]">
          <h1 id="main-content" className="text-4xl font-bold mb-8">
            About
          </h1>
          <p>
            Drew is passionate about using design and quality code to create a
            positive impact on people who are not always considered by
            technologists, this shows in their course projects from the Allen
            School at UW and current work at KBCS on a cross functional team.
            They are a published researcher in the field of Data Science, as
            coauthor of the paper, &quot;
            <a href="https://doi.org/10.51387/25-NEJSDS82">
              Practical considerations for variable screening in the super
              learner
            </a>
            &quot;, in the{" "}
            <a href="https://nejsds.nestat.org/journal/NEJSDS">
              The New England Journal of Statistics in Data Science
            </a>
            . In Drew&apos;s free time they are an avid reader, world traveler,
            and enjoy baking gluten free pastries. They live in the Seattle area
            with their house plants.
          </p>
          <p>
            As a firm believer in accessibility, Drew was the Co-Chair of a
            student organization whose mission was to foster a culture of
            inclusion for people with disabilities in the Allen School and
            educate students about creating accessible software. As Co-Chair of{" "}
            <a href="https://ability.cs.washington.edu/">Ability</a>, Drew
            educated the team about accessible document creation and started a
            book club. Drew collaborated with a peer, Lee Janzen-Morel, on an
            initiative called &quot;
            <a href="https://multiculturalmatrix.github.io/">
              Multicultural Matrix
            </a>
            &quot;, which was influential in the creation of a Diversity and
            Access Lounge on the Allen School Campus for underrepresented
            students. In the future, Drew would like to continue working on a
            cross functional team building interactive experiences that are user
            friendly to diverse audiences and creating inclusive communities.
          </p>
          <p>
            Community service and stewardship are values that Drew cares deeply
            about. Although Drew does not use much social media anymore, they
            are an administrator for a{" "}
            <a href="https://disabledincs.bsky.social">
              bluesky account for the organization &quot;Disabled In
              Computing&quot;
            </a>{" "}
            and created a{" "}
            <a href="https://sites.google.com/view/disabledincs">
              website for them on Google Sites
            </a>
            . Drew also runs a personal bluesky account where they talk about
            their experiences as a technologist.
          </p>
        </main>
        <aside className="mt-8 lg:mt-0">
          <div className="sticky top-4">
            <BlueskyTimeline feedUrl="https://embedbsky.com/feeds/fa5c0936fa2155b9866b43b6f00f89ef867f4216b75e7cd68c68ba113f9df8c4.html" />
          </div>
        </aside>
      </div>
    </div>
  );
}
