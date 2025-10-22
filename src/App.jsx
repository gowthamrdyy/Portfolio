import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Loader from './components/Loader';
import EnterScreen from './components/EnterScreen';
import Footer from './components/Footer';
import Skills from './components/Skills';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Helmet } from 'react-helmet-async';

function App() {
  const [started, setStarted] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

useEffect(() => {
  const isBot = /bot|crawl|spider|slurp|bing/i.test(navigator.userAgent);
  const isHome = window.location.pathname === '/';
  const alreadyVisited = sessionStorage.getItem('alreadyVisited');

  if (isBot) {
    setStarted(true);
  } else if (isHome && !alreadyVisited) {
    setStarted(false);
  } else {
    setStarted(true);
  }
  setInitialCheckDone(true);
}, []);

  const handleStart = () => {
    sessionStorage.setItem('alreadyVisited', 'true');
    setStarted(true);
    setShowLoader(true);
  };

  if (!initialCheckDone) return null;

  return (
    <>
      {/* Global SEO Metadata */}
      <Helmet>
        <title>Gowtham Sree | Full Stack Developer & AI Enthusiast</title>
        <meta name="description" content="Official portfolio of Gowtham Sree, a full stack developer skilled in React, Node.js, and passionate about AI/ML. Explore projects, skills, and experience." />
        <link rel="canonical" href="https://chaitanya-sai-meka.vercel.app/" />

        <meta property="og:title" content="Gowtham Sree | Full Stack Developer" />
        <meta property="og:description" content="Official portfolio of Gowtham Sree, a full stack developer skilled in React, Node.js, and passionate about AI/ML." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chaitanya-sai-meka.vercel.app/" />
        <meta property="og:image" content="https://chaitanya-sai-meka.vercel.app/profile_pic.png" />
        <meta property="og:site_name" content="Gowtham Sree's Portfolio" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@IAMCHAITANYASAI" />
        <meta name="twitter:title" content="Gowtham Sree | Full Stack Developer" />
        <meta name="twitter:description" content="Official portfolio of Gowtham Sree, a full stack developer skilled in React, Node.js, and passionate about AI/ML." />
        <meta name="twitter:image" content="https://chaitanya-sai-meka.vercel.app/profile_pic.png" />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Gowtham Sree",
              "url": "https://chaitanya-sai-meka.vercel.app/",
              "sameAs": [
                "https://github.com/ChaitanyaSai-Meka",
                "https://www.instagram.com/chaitanyasai_meka/",
                "https://www.linkedin.com/in/chaitanya-sai-meka/",
                "https://leetcode.com/u/chaitanyasai_meka/",
                "https://codeforces.com/profile/Chaitanyasai_meka"
              ],
              "jobTitle": "Freelancer",
              "worksFor": {
                "@type": "Organization",
                "name": "Self-Employed"
              },
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Newton School of Technology"
              },
              "image": "https://chaitanya-sai-meka.vercel.app/profile_pic.png",
              "description": "Gowtham Sree is a passionate full-stack developer specializing in React and modern web technologies, with expertise in AI and machine learning, based in Rajamahendravaram, Andhra Pradesh, India."
            }
          `}
        </script>
      </Helmet>

      {/* UI Flow */}
      {!started ? (
        <EnterScreen onEnter={handleStart} />
      ) : showLoader ? (
        <Loader onComplete={() => setShowLoader(false)} />
      ) : (
        <div className="bg-white dark:bg-black">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
          <SpeedInsights />
        </div>
      )}
    </>
  );
}

export default App;
