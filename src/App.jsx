import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
// import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import Loading from "./components/Loading";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import "./styles/loading.css"

const App = () => {
  const [landingPageData, setLandingPageData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadingDuration = 7400;

    const timer = setTimeout(() => {
      setLandingPageData(JsonData);
      setIsLoaded(false);
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`app-container ${isLoaded ? 'fade-in' : 'fade-out'}`}>
      {!landingPageData ? (
        <Loading />
      ) : (
        <>
          <Navigation />
          <Header data={landingPageData.Header} />
          <About data={landingPageData.About} />
          <Services data={landingPageData.Services} />
          <Gallery data={landingPageData.Gallery} />
          <Team data={landingPageData.Team} />
          <Contact data={landingPageData.Contact} />
        </>
      )}
    </div>
  );
};

export default App;
