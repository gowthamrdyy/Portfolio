import styles from "./Skills.module.css";
import {
  faCss3,
  faGitAlt,
  faHtml5,
  faJsSquare,
  faReact,
  faPython,
  faYoutube,
  faFigma,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faDatabase, 
  faBrain, 
  faChartLine, 
  faCode,
  faRobot,
  faPalette,
  faVideo,
  faScissors
} from "@fortawesome/free-solid-svg-icons";

const Skills = () => {
  const skills = [
    { icon: faCode, name: "DSA", category: "Programming", color: "#ff6b6b" },
    { icon: faPython, name: "Python", category: "Programming", color: "#3776ab" },
    { icon: faJsSquare, name: "JavaScript", category: "Programming", color: "#f7df1e" },
    { icon: faHtml5, name: "HTML5", category: "Frontend", color: "#e34f26" },
    { icon: faCss3, name: "CSS3", category: "Frontend", color: "#1572b6" },
    { icon: faGitAlt, name: "Git", category: "Tools", color: "#f05032" },
    { icon: faReact, name: "React", category: "Frontend", color: "#61dafb" },
    { icon: faBrain, name: "Machine Learning", category: "AI/ML", color: "#ff9500" },
    { icon: faRobot, name: "Generative AI", category: "AI/ML", color: "#00d4aa" },
    { icon: faYoutube, name: "YouTube", category: "Content", color: "#ff0000" },
    { icon: faPalette, name: "Adobe", category: "Design", color: "#ff0000" },
    { icon: faFigma, name: "Figma", category: "Design", color: "#f24e1e" },
    { icon: faPalette, name: "Canva", category: "Design", color: "#00c4cc" },
    { icon: faVideo, name: "CapCut", category: "Content", color: "#000000" },
  ];

  return (
    <div id="skills" className={styles.skills}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 data-aos="fade-up" className={styles.title}>
            Skills & Expertise
          </h1>
          <p data-aos="fade-up" data-aos-delay="200" className={styles.subtitle}>
            From AI/ML development to content creation - building the future with code and creativity
          </p>
        </div>
        
        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={300 + (index * 50)}
              className={styles.skillCard}
            >
              <div className={styles.iconWrapper}>
                <FontAwesomeIcon 
                  icon={skill.icon} 
                  className={styles.skillIcon}
                  style={{ color: skill.color }}
                />
              </div>
              <h3 className={styles.skillName}>{skill.name}</h3>
              <p className={styles.skillCategory}>{skill.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;