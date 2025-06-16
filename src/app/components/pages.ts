import PageMetadata from "./Metadata";

/** Create an object that contains a map of all pages **/
/** The URL should be the key **/
/** The value should be a Record object **/
const pages: Record<string, PageMetadata> = {
  "/": {
    title: "Home",
    description:
      "My name is Drew and I am an aspring software engineer with a degree in Computer Science from the Paul G Allen School. I am passionate about creating software that is both beautiful and accessible. I have experience with a variety of technologies and am always looking to learn more. I am currently looking for a full-time software engineering role.",
    image: "",
    imageAlt: "",
    href: "/",
    date: "2024-12-15",
    authors: "Drew King",
  },
  "/about": {
    title: "About",
    description: "Learn more about me",
    image: "",
    imageAlt: "",
    href: "/about",
    date: "2025-06-15",
    authors: "Drew King",
  },
  "/projects": {
    title: "Projects",
    description: "A collection of my projects",
    image: "",
    imageAlt: "",
    href: "/projects",
    date: "2025-06-15",
    authors: "Drew King",
  },
  "/Drew_King-cv.pdf": {
    title: "CV",
    description: "My CV",
    image: "",
    imageAlt: "",
    href: "/Drew_King-cv.pdf",
    date: "2025-06-15",
    authors: "Drew King",
  },
};

const projects: Record<string, PageMetadata> = {
  "/high-speed-rail": {
    title: "High Speed Rail",
    description: "Visualization reimagining the future of travel",
    image: "/images/high-speed-rail-cover.png",
    imageAlt:
      "A screenshot of the High Speed Rail project, showing a map of the United States with a train route drawn on it.",
    href: "/projects/high-speed-rail",
    date: "2024-12-15",
    authors: "Drew King, Joey Krueger, Jack Rosenbloom",
  },
  "/kbcs": {
    title: "KBCS Theme",
    description: "WordPress theme update following accessibility principles",
    image: "/images/KBCS_Menu-Bar_Flow.png",
    imageAlt:
      'Three screenshots stitched together of the KBCS website with using voiceover output on the bottom. All three screenshots show a similar appearing website with a brown menu bar on top with three elements, a hamburger menu button, the KBCS logo outlined in white which reads, "91.3" KBCS, and a listen icon. Below is now playing widget on a grey background that says "Roots Rock and Soul with Iaan Hughes" and a banner below for the show which has an orange background and red highly stylezed text on top of a record player.',
    href: "/projects/kbcs",
    date: "2024-12-15",
    authors: "Drew King, Sama Khalid, Colin Xiao, Sophia Lin",
  },
  "/mindmii": {
    title: "MindMii",
    description: "Talk calmly, when you're ready.",
    image: "/images/mindmii/MindMii_Cover.png",
    imageAlt:
      "A banner created in figma of mindmii screens on a phone, with 8 pages oriented in a eight by two grid and skewed to the right.",
    href: "/projects/mindmii",
    date: "2024-03-07",
    authors: "Drew King, Lee Janzen, Christoph Bendix",
  },
  "/resitogether": {
    title: "ResiTogether",
    description:
      "App prototype to improve employment among formerly incarcerated persons",
    image: "/images/resitogether/ResiTogether_cover.png",
    imageAlt:
      "Screenshots of ResiTogether final design with the logo and job search pages displayed in on a phone in a grid layout that is intentionally styled off center for each column of the grid.",
    href: "/projects/resitogether",
    date: "2023-06-05",
    authors:
      "Drew King, Weather Nguyen, Taylor Richmond, Julie McUne, Jessica Wang",
  },
  "/sl-screens": {
    title: "SL Screens",
    description: "Investigating the use of screens in Super Learner ensembles",
    image: "/images/lasso_vs_sl.png",
    imageAlt: "A chart comparing the performance of SL with screens and Lasso",
    href: "/projects/sl-screens",
    date: "2021-08-08",
    authors: "Drew King, Brian D Williamson, Ying Huang",
  },
};

export { pages, projects };
