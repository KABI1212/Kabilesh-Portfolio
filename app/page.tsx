import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Education from '@/components/Education'
import Skills from '@/components/Skills'
import Certifications from '@/components/Certifications'
import FeaturedProjects from '@/components/FeaturedProjects'
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
