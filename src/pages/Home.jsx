import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';


export default function Home() {
  return (
    <>
      <Helmet>
        <title>Hasini Bondada | Aspiring Software Engineer</title>
        <meta name="description" content="Hasini Bondada - Aspiring Software Engineer skilled in Java, Python, Full Stack Development & Machine Learning. Portfolio showcasing projects and skills." />
        <meta name="keywords" content="Hasini Bondada, Java, Python, Full Stack Developer, Machine Learning, Portfolio" />
        <meta property="og:title" content="Hasini Bondada | Aspiring Software Engineer" />
        <meta property="og:description" content="Aspiring Software Engineer skilled in Java, Python, Full Stack Development, and Machine Learning." />
      </Helmet>
      <Hero />
      <Projects />
      <About />
    </>
  );
}
