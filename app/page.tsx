import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Skills from '@/components/Skills'
import Certifications from '@/components/Certifications'
import FeaturedProjects from '@/components/FeaturedProjects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import SparkleBackground from '@/components/SparkleBackground'
import CosmicBackground from '@/components/CosmicBackground'

export default function Home() {
  return (
    <main className="bg-[#05070c] min-h-screen relative selection:bg-blue-500/30 selection:text-cyan-200">
      <CosmicBackground />
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
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
