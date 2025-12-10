export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Gowtham Sree Charan Reddy",
    "url": "https://gowthamrdyy.vercel.app",
    "image": "https://avatars.githubusercontent.com/u/115145278?s=400&u=b4495c153f62a4f0fd469c2a8334f7e474bd02dc&v=4",
    "sameAs": [
      "https://github.com/gowthamrdyy",
      "https://linkedin.com/in/gowthamrdyy",
      "https://instagram.com/gowthamrdyy",
      "mailto:iamgowthamsree@gmail.com"
    ],
    "jobTitle": "Machine Learning Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "SRM Institute of Science and Technology"
    },
    "knowsAbout": [
      "Web Development",
      "Artificial Intelligence",
      "Machine Learning",
      "React",
      "Next.js",
      "Python",
      "JavaScript",
      "TypeScript",
      "Data Structures",
      "Algorithms"
    ],
    "description": "Passionate Full Stack Developer specializing in AI/ML, Web Development, and Data Structures. Building innovative solutions with React, Next.js, Python, and modern technologies."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
