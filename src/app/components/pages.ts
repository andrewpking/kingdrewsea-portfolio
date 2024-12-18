import PageMetadata from "./Metadata";

/** Create an object that contains a map of all pages **/
/** The URL should be the key **/
/** The value should be a Record object **/
const pages: Record<string, PageMetadata> = {
    '/': {
        title: 'Welcome to my portfolio!',
        description: 'My name is Drew and I am an aspring software engineer with a degree in Computer Science from the Paul G Allen School. I am passionate about creating software that is both beautiful and accessible. I have experience with a variety of technologies and am always looking to learn more. I am currently looking for a full-time software engineering role.',
        image: '/images/cover.png',
        imageAlt: 'A photo of Drew in front of a computer with a plant in the background.',
        href: '/'
    }
}

const projects: Record<string, PageMetadata> = {
    '/high-speed-rail': {
        title: 'High Speed Rail',
        description: 'Reimagining the Future of Travel',
        image: '/images/high-speed-rail-cover.png',
        imageAlt: 'A screenshot of the High Speed Rail project, showing a map of the United States with a train route drawn on it.',
        href: '/high-speed-rail'
    },
    '/mindmii': {
        title: "MindMii",
        description: "Talk calmly, when you're ready.",
        image: "/images/mindmii/MindMii_Cover.png",
        imageAlt: "A banner created in figma of mindmii screens on a phone, with 8 pages oriented in a eight by two grid and skewed to the right.",
        href: '/mindmii'
    },
    '/resitogether': {
        title: 'ResiTogether',
        description: 'An app designed to increase employment among formerly incarcerated persons',
        image: '/images/resitogether/ResiTogether_cover.png',
        imageAlt: 'Screenshots of ResiTogether final design with the logo and job search pages displayed in on a phone in a grid layout that is intentionally styled off center for each column of the grid.',
        href: '/resitogether'
    },
    '/kbcs': {
        title: 'KBCS Theme',
        description: 'The KBCS Accessibility Proposal aims to make the KBCS website a more welcoming and accessible space for all abilities. The project focuses on improving the website’s design and usability by following modern accessibility standards and best practices. This effort shows KBCS\'s dedication to service its diverse audience by ensuring everyone can fully access and enjoy the website.',
        image: '/images/KBCS_Menu-Bar_Flow.png',
        imageAlt: 'Three screenshots stitched together of the KBCS website with using voiceover output on the bottom. All three screenshots show a similar appearing website with a brown menu bar on top with three elements, a hamburger menu button, the KBCS logo outlined in white which reads, "91.3" KBCS, and a listen icon. Below is now playing widget on a grey background that says "Roots Rock and Soul with Iaan Hughes" and a banner below for the show which has an orange background and red highly stylezed text on top of a record player.',
        href: '/kbcs'
    },
    '/sl-screens': {
        title: 'SL Screens',
        description: 'Investigating the use of screens in Super Learner ensembles',
        image: '/images/lasso_vs_sl.png',
        imageAlt: 'A chart comparing the performance of SL with screens and Lasso',
        href: '/sl-screens'
    }
}

export { pages, projects };