import Landing from "./components/Landing/Landing";
import ProjectList from "./components/ProjectList/ProjectList";
import Skills from "./components/Skills/Skills";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Social from "./components/Social/Social";
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import Preloader from "./components/Preloader/Preloader";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Preloader setLoading={setLoading} />
      ) : (
        <>
          <Navbar />
          <Social />
          <Landing />
          <About />
          <Skills />
          <ProjectList />
          <Contact />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
