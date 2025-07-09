import styles from "./Contact.module.css";
import { useRef, useState } from "react";
import ThankYou from "../UI/ThankYou";
import { AnimatePresence } from "framer-motion";

const Contact = () => {
  const formRef = useRef();
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just show the thank you message
    // You can implement EmailJS later by adding your config
    setDone(true);
    
    // Uncomment below when you have EmailJS configured
    /*
    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID", 
        formRef.current,
        "YOUR_USER_ID"
      )
      .then(
        (result) => {
          console.log(result.text);
          setDone(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
    */
  };

  return (
    <div id="contact" className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.formSection}>
            <h1 data-aos="fade-up" className={styles.title}>
              Get In Touch
            </h1>
            <p data-aos="fade-up" data-aos-delay="100" className={styles.description}>
              <b>Interested in my work?</b> Get in touch and send me a message.
              Always open to build amazing projects.
            </p>
            
            <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  data-aos="fade-up"
                  data-aos-delay="200"
                  type="text"
                  placeholder="Name"
                  name="user_name"
                  required
                />
                <input
                  data-aos="fade-up"
                  data-aos-delay="250"
                  type="email"
                  placeholder="Email"
                  name="user_email"
                  required
                />
              </div>
              <input
                data-aos="fade-up"
                data-aos-delay="300"
                type="text"
                placeholder="Subject"
                name="user_subject"
                required
              />
              <textarea
                data-aos="fade-up"
                data-aos-delay="350"
                rows="6"
                placeholder="Message"
                name="message"
                required
              />
              <button 
                data-aos="fade-up" 
                data-aos-delay="400"
                type="submit"
                className={styles.submitBtn}
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div className={styles.infoSection}>
            <div data-aos="fade-left" className={styles.infoBox}>
              <h2 className={styles.infoTitle}>Let's Connect</h2>
              <p className={styles.infoText}>
                I'm always excited to discuss new opportunities, 
                collaborate on interesting projects, or just have 
                a chat about AI, ML, and technology.
              </p>
              
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <h3>Email</h3>
                  <p>iamgowthamsree@gmail.com</p>
                </div>
                <div className={styles.contactItem}>
                  <h3>Location</h3>
                  <p>Available for remote work</p>
                </div>
                <div className={styles.contactItem}>
                  <h3>Response Time</h3>
                  <p>Usually within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {done && (
          <ThankYou
            onConfirm={() => {
              setDone(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;