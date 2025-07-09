import Simplify from "./img/simplify1.png";
import DrawMe from "./img/homepage.png";
import Fooder from "./img/Fooder.png";
import Jingle from "./img/Jingle.png";
import Portfolio from "./img/oldportfolio.png";
export const projects = [
  {
    id: 1,
    title: "Spotify",
    techno: "HTML | CSS ",
    description: "Just a simple Spotify clone",
    summary: `This is a simple Spotify clone that I made to practice my HTML and CSS skills. It is not a functional application, but it looks like the real thing! I used HTML and CSS to create the layout and design of the page, and I used some JavaScript to add some interactivity.`,
    img: Simplify,
    link: "https://gowthamspotify.vercel.app/",
    source: "https://github.com/gowthamrdyy/Spotify-clone",
    delay: "0",
  },
  {
    id: 2,
    title: "CosmoQuest",
    techno: "Typescript | MySQL | CSS |",
    description: "Space Exploration education Network",
    summary:"Cosmic Quest is a space exploration education network that aims to provide a platform for students to learn about space exploration and its impact on society. The platform allows students to explore various aspects of space exploration, including its history, current missions, and future prospects. It also provides resources for students to learn about the science and technology behind space exploration.",
    img: DrawMe,
    link: "https://cosmic-quest-launcher.vercel.app/",
    source: "https://github.com/gowthamrdyy/cosmic-quest-launcher",
    delay: "100",
  },
  {
    id: 3,
    title: "MagicGrounds",
    techno: "Typescript | CSS | Vite",
    description: "Background Generator",
    summary: `MagicGrounds is a background generator that allows users to create beautiful and unique backgrounds for their websites or applications. It uses a combination of HTML, CSS, and JavaScript to create a user-friendly interface that allows users to customize their backgrounds with various colors, patterns, and images.`,
    img: Fooder,
    link: "https://magicgrounds.vercel.app/",
    source: "https://github.com/gowthamrdyy/MagicGrounds",
    delay: "200",
  },
  {
    id: 4,
    title: "Bunkifyyy",
    techno: "HTML | CSS | JavaScript",
    description: "Attendance Calculator",
    summary:"Bunkifyyy is a simple attendance calculator that helps students keep track of their attendance percentage. It allows users to input their total classes and attended classes, and it calculates the attendance percentage based on the input. The application is built using HTML, CSS, and JavaScript.",
    img: Jingle,
    link: "https://bunkifyyy.vercel.app/",
    source: "https://github.com/gowthamrdyy/Bunkifyyy",
    delay: "0",
  },
  {
    id: 5,
    title: "Portfolio",
    techno: "HTML | CSS | JavaScript | React",
    description: "Porfolio",
    summary:"This is my personal portfolio website where I showcase my projects, skills, and experiences. It is built using HTML, CSS, and JavaScript, and it is designed to be responsive and user-friendly. The website includes sections for my projects, skills, about me, and contact information.",
    img: Portfolio,
    link: "https://gowthamrdyy.vercel.app/",
    source: "https://github.com/gowthamrdyy/Portfolio",
    delay: "100",
  },
];
