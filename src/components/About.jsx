import { useEffect, useRef } from 'react';
import { cn } from "../lib/utils";
import BlurImage from './utils/BlurImage';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';

const About = () => {
  const imageRef = useRef(null);
  const orbitRef = useRef(null);

  useEffect(() => {
    // Floating animation for the image
    gsap.to(imageRef.current, {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Rotating orbit animation
    gsap.to(orbitRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });
  }, []);

  return (
    <section id="about" className="about-container relative flex min-h-screen w-full items-center justify-center bg-black py-12 px-6 overflow-hidden">
      <Helmet>
        <title>About Gowtham Sree | Full Stack Developer & AI Enthusiast</title>
        <meta name="description" content="Learn more about Gowtham Sree, a passionate full-stack developer with expertise in React, Node.js, AI/ML, UI/UX design, and entrepreneurial ventures. Discover my journey and goals." />
        <link rel="canonical" href="https://chaitanya-sai-meka.vercel.app/about" />
        <meta property="og:title" content="About Gowtham Sree | Full Stack Developer" />
        <meta property="og:description" content="Get to know Gowtham Sree's background, skills, projects, and entrepreneurial aspirations in full-stack development and AI/ML." />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://chaitanya-sai-meka.vercel.app/about" />
        <meta property="og:image" content="https://chaitanya-sai-meka.vercel.app/profile_pic.png" />
        <meta property="og:site_name" content="Gowtham Sree's Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@IAMCHAITANYASAI" />
        <meta name="twitter:title" content="About Gowtham Sree | Full Stack Developer" />
        <meta name="twitter:description" content="Discover Gowtham Sree's passion for coding, full-stack development, AI, and building impactful digital solutions." />
        <meta name="twitter:image" content="https://chaitanya-sai-meka.vercel.app/profile_pic.png" />
      </Helmet>

      {/* Background pattern */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />

      {/* Faded radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Content */}
      <div className="relative z-20 max-w-6xl w-full">
        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent text-center mb-12">
          About Me.
        </h1>

        {/* Main Content - Side by Side */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left - Text Box */}
          <div className="flex-1 text-base leading-relaxed text-neutral-300 backdrop-blur-sm bg-neutral-900/30 p-6 rounded-xl border border-neutral-800 hover:border-neutral-600 transition-all duration-300">
            <p className="mb-4">
              I'm Gowtham Sree, a passionate and adaptive developer with a strong focus on Artificial Intelligence, Machine Learning, and full-stack web development. With over 1 year of hands-on experience, I enjoy building smart, efficient systems that blend logic with creativity.
            </p>

            <p className="mb-4">
              I specialize in crafting seamless digital experiences — from designing responsive front-end interfaces using React, Tailwind CSS, and TypeScript, to developing scalable, intelligent back-end logic with Python, Node.js, and MongoDB.
            </p>

            <p>
              I believe in writing clean, maintainable code and continuously exploring how technology can simplify lives. I'm also passionate about content creation, sharing insights on AI, coding, and productivity through engaging videos and posts that simplify complex topics for a wider audience.
            </p>
          </div>

          {/* Right - Floating Image */}
          <div className="flex-shrink-0">
            <div className="relative inline-block">
              {/* Rotating orbit ring */}
              <div
                ref={orbitRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border-2 border-dashed border-neutral-700/50 rounded-full"
              >
                {/* Orbiting dots */}
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-neutral-400 rounded-full -translate-x-1/2 shadow-lg shadow-neutral-400/50" />
                <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-neutral-400 rounded-full -translate-x-1/2 shadow-lg shadow-neutral-400/50" />
                <div className="absolute top-1/2 left-0 w-2 h-2 bg-neutral-400 rounded-full -translate-y-1/2 shadow-lg shadow-neutral-400/50" />
                <div className="absolute top-1/2 right-0 w-2 h-2 bg-neutral-400 rounded-full -translate-y-1/2 shadow-lg shadow-neutral-400/50" />
              </div>

              {/* Profile Image */}
              <div
                ref={imageRef}
                className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-neutral-800 shadow-2xl shadow-neutral-900/80 hover:shadow-neutral-700/80 transition-all duration-300 group cursor-pointer bg-black"
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-black">
                  <BlurImage
                    src="/profile_pic.png"
                    blurhash="LAB._mEN5SkC-TNdofWX0hay}=WC"
                    alt="Profile"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
