import { useEffect, useState } from "react";
import "../styles/pages/_under-construction.scss";
import whatsappIcon from "../assets/whatsapp.png";

const UnderConstruction = () => {
  const whatsappNumber = "919791890636";
  const message = "Hello Aero Tech Infra Equipments";
  const launchDate = new Date("2026-10-02T00:00:00+05:30").getTime();

  const [timeLeft, setTimeLeft] = useState(
    Math.max(launchDate - Date.now(), 0)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = launchDate - Date.now();

      if (difference <= 0) {
        setTimeLeft(0);
        clearInterval(timer);
      } else {
        setTimeLeft(difference);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const days = Math.floor(
    timeLeft / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (timeLeft / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (timeLeft / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (timeLeft / 1000) % 60
  );

  const formatNumber = (value: number) =>
    String(value).padStart(2, "0");

  return (
    <main className="under-construction">

      {/* Background Overlay */}
      <div className="under-construction__overlay" />

      <section className="under-construction__content">

        {/* =====================================
            Countdown
        ===================================== */}

        <div className="countdown">

          <div className="countdown__item">
            <span className="countdown__number">
              {formatNumber(days)}
            </span>

            <span className="countdown__label">
              DAYS
            </span>
          </div>

          <span className="countdown__separator">
            :
          </span>

          <div className="countdown__item">
            <span className="countdown__number">
              {formatNumber(hours)}
            </span>

            <span className="countdown__label">
              HOURS
            </span>
          </div>

          <span className="countdown__separator">
            :
          </span>

          <div className="countdown__item">
            <span className="countdown__number">
              {formatNumber(minutes)}
            </span>

            <span className="countdown__label">
              MINUTES
            </span>
          </div>

          <span className="countdown__separator">
            :
          </span>

          <div className="countdown__item">
            <span className="countdown__number">
              {formatNumber(seconds)}
            </span>

            <span className="countdown__label">
              SECONDS
            </span>
          </div>

        </div>


        {/* =====================================
            Construction Banner
        ===================================== */}

        <div className="construction-banner">

          {/* Decorative Lines */}

          {/* <span className="construction-banner__line construction-banner__line--top-1" />

          <span className="construction-banner__line construction-banner__line--top-2" />

          <span className="construction-banner__line construction-banner__line--bottom-1" />

          <span className="construction-banner__line construction-banner__line--bottom-2" /> */}


          {/* Main Title */}

          <div className="construction-banner__title">
            AERO TECH INFRA EQUIPMENT
          </div>


          {/* Subtitle */}

          <div className="construction-banner__subtitle">
            UNDER CONSTRUCTION
          </div>

        </div>


        {/* =====================================
            Description
        ===================================== */}

        <p className="under-construction__description">
          Our website is under construction, but we are ready to go!
          <br />

          We are preparing something amazing and exciting for you.
          <br />


        </p>


        {/* =====================================
            Notify Button
        ===================================== */}

        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
          target="_blank"
            rel="noopener noreferrer"
          type="button"
          className="under-construction__button"
        >
          <span className="under-construction__button-icon" >
            <img src={whatsappIcon} alt="Notify" />
          </span>

          <span>
            NOTIFY ME
          </span>
        </a>

      </section>

    </main>
  );
};

export default UnderConstruction;