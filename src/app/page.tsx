import PreviewCard from "./components/PreviewCard";
import resitogether from "./resitogether/resitogether";
import HSR from "./high-speed-rail/high-speed-rail";
import kbcs from "./kbcs/kbcs";
import mindmii from "./mindmii/mindmii";
import slScreens from "./sl-screens/sl-screens";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles.scss";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="row-start-2 flex flex-col items-center justify-center gap-6">
          <h1 className="text-center">
            Welcome to my portfolio!
          </h1>
          <p className="text-center">
            My name is Drew and I am an aspring software engineer with a degree in Computer Science from the Paul G Allen School. I am passionate about creating software that is both beautiful and accessible. I have experience with a variety of technologies and am always looking to learn more. I am currently looking for a full-time software engineering role.
          </p>
          <h2 className="text-center">
            Projects
          </h2>
          <p>Each of these projects were completed during my undergraduate education. Click on one to learn more.</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <PreviewCard
              metadata={HSR}
            />
            <PreviewCard
              metadata={kbcs}
            />
            <PreviewCard
              metadata={mindmii}
            />
            <PreviewCard
              metadata={resitogether}
            />
            <PreviewCard
              metadata={slScreens}
            />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
