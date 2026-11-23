import { useEffect } from 'react';
import { personal } from '../config/site';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Education from '../components/sections/Education';
import Achievements from '../components/sections/Achievements';
import Exploring from '../components/sections/Exploring';
import Contact from '../components/sections/Contact';
import Terminal from '../components/sections/Terminal';

export default function Home() {
  useEffect(() => {
    document.title = `${personal.name} — Full-Stack Developer & AI Engineer`;
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Achievements />
      <Exploring />
      <Terminal />
      <Contact />
    </>
  );
}
