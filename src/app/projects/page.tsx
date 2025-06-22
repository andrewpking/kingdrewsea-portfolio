import Project from "../components/Project";
import { projects } from "../components/pages";
import "../styles.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Drew King",
  description:
    "Explore Drew King's portfolio of software engineering and UX design projects",
  alternates: {
    canonical: "/projects",
  },
};

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <p className="text-lg mb-8">
        Drew has worked on a variety of projects throughout their career. Here
        are some of their most notable projects:
      </p>
      <Project metadata={projects.kbcs}>
        <p>
          Drew is currently an operations support specialist at KBCS, building
          quality interactive experiences for their website and ensuring that
          existing content is accessible to humans and machines. Spearheading an
          initiative to improve accessibility and SEO, they have doubled organic
          traffic to the KBCS website from google by adding semantics to the
          theme and resolving errors.
        </p>
      </Project>
      <Project metadata={projects.HighSpeedRail}>
        <p>
          As a recent graduate from the University of Washington Seattle, Drew
          has had the opportunity to participate in a variety of projects. Their
          most recent project was for a data visualization course. In this
          project, Drew was responsible for creating an interactive
          visualization where people could create their own high speed rail
          network and get the estimate ridership for each line. This project was
          created in d3.js and deployed using CI/CD pipelines through github.
        </p>
      </Project>
      <Project metadata={projects.MindMii}>
        <p>
          In an increasingly connected world, it can be hard for people to keep
          up. MindMii is a design prototype created to help neurodivergent and
          incredibly busy people to respond to important messages. This design
          is supported by a diary study and contextual inquiry. The prototype
          was designed in Figma by Drew. MindMii won an award for quality design
          as the top choice by Teaching Assistants for the UW course
          Introduction to HCI.
        </p>
      </Project>
      <Project metadata={projects.ResiTogether}>
        <p>
          Many people who are formerly incarcerated experience underemployment
          after release from prison. ResiTogether is an interactive prototype of
          an app designed to help formerly incarcerated people achieve their
          employment goals. Contextual inquiry was the primary methodology for
          creating personas, along with a survey of the career related
          experiences of people who are formerly incarcerated. The resulting
          interactive prototype was created in Figma by Drew for an introductory
          Informatics Course.
        </p>
      </Project>
      <Project metadata={projects.SLScreens}>
        <p>
          For clinical research trials on diseases which have small populations,
          often datasets with many variables are generated with few entries.
          These datasets are analyzed to identify potential relationships with
          clinical outcomes. Machine learning techniques are increasingly
          employed for such analyses, yet little is known about the accuracy of
          algorithms for variable selection in different settings. This
          research, published in the The New England Journal of Statistics in
          Data Science, aims to establish guidelines for combining variable
          selection algorithms to assess accuracy under various conditions.
        </p>
      </Project>
    </main>
  );
}
