// import { useEffect, useState } from "react";
// import heroBgVideo from "../../assets/hero_bg.mp4";
import heroPoster from "../../assets/hero-poster.jpg";
import Button from "../ui/Button";

const HeroSection = () => {
  // const [playVideo, setPlayVideo] = useState(
  //   () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  // );
  //
  // useEffect(() => {
  //   const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  //   const update = () => setPlayVideo(!media.matches);
  //   update();
  //   media.addEventListener("change", update);
  //   return () => media.removeEventListener("change", update);
  // }, []);

  return (
    <section className="hero">
      <img
        src={heroPoster}
        alt=""
        className="hero__poster"
        width={1280}
        height={720}
        fetchPriority="high"
      />
      {/*
      <video
        autoPlay={playVideo}
        muted
        loop
        playsInline
        preload="metadata"
        poster={heroPoster}
        src={playVideo ? heroBgVideo : undefined}
        className="hero__bg"
      />
      */}
      <div className="hero__gradient" />

      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="hero__title">
            Industrial Equipment Solutions for Demanding Projects
          </h1>
          <p className="hero__desc">
            Well-maintained construction equipment on flexible daily and monthly rental,
            backed by a complete range of genuine industrial products and hardware.
          </p>
          <div className="hero__actions">
            <Button variant="accent" to="/equipment">Explore Rental Equipment</Button>
            <Button variant="outline" to="/contact#quote">Request a Quote</Button>
          </div>
          <ul className="hero__features">
            <li><span className="hero__dot" aria-hidden="true" /> Daily &amp; monthly rental</li>
            <li><span className="hero__dot" aria-hidden="true" /> Inspected, site-ready machines</li>
            <li><span className="hero__dot" aria-hidden="true" /> Genuine industrial brands</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
