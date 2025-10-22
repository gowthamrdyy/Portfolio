import styles from "./Landing.module.css";
import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import Logo from "../Logo/Logo";
import Mouse from "../UI/Mouse";
import { Link } from "react-scroll";

const Landing = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div id="landing" className={styles.landing}>
      <div className={styles.photoOverlay}>
        <img
          src={require("../../img/myphoto.png")}
          alt="Gowtham Sree Charan Reddy"
          className={styles.overlayPhoto}
        />
      </div>
      <div className={styles.left}>
        <div className={styles.leftWrapper}>
          <h2
            data-aos="fade-in"
            data-aos-duration="2000"
            className={styles.intro}
          >
            Heyy!, My name is
          </h2>
          <h1
            data-aos="fade-in"
            data-aos-duration="2000"
            className={styles.name}
          >
            Gowtham Sree Charan Reddy
          </h1>
          <p
            data-aos="fade-in"
            data-aos-duration="2000"
            className={styles.description}
          >
            AiMl Developer • Designer • Content Creator
          </p>
        </div>
      </div>
      <Link to="skills" spy={true} smooth={true} offset={-30} duration={500}>
        <Mouse />
      </Link>
    </div>
  );
};

export default Landing;
