import styles from "./Footer.module.css";
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h2 className={styles.name}>Gowtham Sree Charan Reddy</h2>
            <p className={styles.tagline}>
              AI/ML Developer • Content Creator • Tech Enthusiast
            </p>
            <p className={styles.description}>
              Building the future with code and creativity. Always learning, 
              always creating, always pushing boundaries.
            </p>
          </div>
          
          <div className={styles.rightSection}>
            <h3 className={styles.socialTitle}>Connect With Me</h3>
            <div className={styles.socialLinks}>
              <a
                href="https://github.com/gowthamrdyy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://www.linkedin.com/in/gowthamrdyy/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="https://www.instagram.com/gowthamrdyy/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://www.youtube.com/@gowthamrdyy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a
                href="https://twitter.com/gowthamrdyy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.divider}></div>
        
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            <p>© {currentYear} Gowtham Sree Charan Reddy. All rights reserved.</p>
            <p className={styles.subCopyright}>
              Designed and developed with ❤️ using React
            </p>
          </div>
          <div className={styles.links}>
            <a href="#about" className={styles.footerLink}>About</a>
            <a href="#skills" className={styles.footerLink}>Skills</a>
            <a href="#project" className={styles.footerLink}>Projects</a>
            <a href="#contact" className={styles.footerLink}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;