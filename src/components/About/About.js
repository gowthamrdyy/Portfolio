import styles from "./About.module.css";

const About = () => {
  return (
    <div id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.imageSection}>
            <div className={styles.imageWrapper}>
              <img
                src={require("../../img/1750838905724.jpg")}
                alt="Gowtham Sree Charan Reddy"
                className={styles.profileImage}
              />
            </div>
          </div>
          <div className={styles.textSection}>
            <div className={styles.textBox}>
              <h1 data-aos="fade-up" className={styles.title}>About Me</h1>
              <p data-aos="fade-up" data-aos-delay="100" className={styles.quote}>
                "The system acknowledges current relevance; however, future dependencies are subject to change." - Meenakshi Reddy &hearts;
              </p>
              <p data-aos="fade-up" data-aos-delay="200" className={styles.description}>
                I'm Gowtham Sree, a passionate and adaptive developer with a strong focus on Artificial Intelligence,
                 Machine Learning, and full-stack web development. With over 1 year of hands-on experience, 
                I enjoy building smart, efficient systems that blend logic with creativity.I specialize in crafting seamless 
                digital experiences — from designing responsive front-end interfaces using React, Tailwind CSS, and TypeScript,
                 to developing scalable, intelligent back-end logic with Python, Node.js, and MongoDB.
              </p>
              <p data-aos="fade-up" data-aos-delay="300" className={styles.description}>
               I believe in writing clean, maintainable code and continuously exploring how technology can simplify lives.
               Whether it’s developing smart assistants, data-driven applications, or creatively engineered tools, 
               I aim to build solutions that make a real-world impact.
               Let’s connect and build something meaningful together.
              </p>
              <p data-aos="fade-up" data-aos-delay="400" className={styles.description}>
                I'm also passionate about content creation, sharing insights on AI, coding, and productivity through 
                engaging videos and posts that simplify complex topics for a wider audience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
