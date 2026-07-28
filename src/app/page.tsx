import Sidebar from "@/components/site/Sidebar";
import MobileNav from "@/components/site/MobileNav";
import AboutSection from "@/components/site/sections/AboutSection";
import ExperienceSection from "@/components/site/sections/ExperienceSection";
import ProjectsSection from "@/components/site/sections/ProjectsSection";
import WritingSection from "@/components/site/sections/WritingSection";
import SkillsSection from "@/components/site/sections/SkillsSection";
import ContactSection from "@/components/site/sections/ContactSection";
import SiteFooter from "@/components/site/SiteFooter";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <div className="grid gap-8 py-14 lg:grid-cols-[minmax(300px,1fr)_2fr] lg:gap-16 lg:pb-20 lg:pt-0">
        <Sidebar />

        <main className="flex min-w-0 flex-col">
          <MobileNav />

          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <WritingSection />
          <SkillsSection />
          <ContactSection />

          <SiteFooter />
        </main>
      </div>
    </div>
  );
}
