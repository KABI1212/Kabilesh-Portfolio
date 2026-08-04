import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Skills from '@/components/Skills'
import Certifications from '@/components/Certifications'
import FeaturedProjects from '@/components/FeaturedProjects'
import GithubSection from '@/components/GithubSection'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import SparkleBackground from '@/components/SparkleBackground'

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen relative">
      <SparkleBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Certifications />
        <FeaturedProjects />
        <GithubSection />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
