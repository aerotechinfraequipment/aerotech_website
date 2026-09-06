import { useEffect, useState } from "react";
import "../styles/pages/_coming-soon.scss";

const ComingSoon = () => {
  // Set your website launch date here
  const launchDate = new Date("2026-10-01T00:00:00+05:30").getTime();

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
    <main className="coming-soon">
      <section className="coming-soon__content">

        {/* Countdown Timer */}
        <div className="coming-soon__timer">
          <div className="timer__item">
            <span className="timer__number">
              {formatNumber(days)}
            </span>
            <span className="timer__label">
              DAYS
            </span>
          </div>

          <span className="timer__separator">:</span>

          <div className="timer__item">
            <span className="timer__number">
              {formatNumber(hours)}
            </span>
            <span className="timer__label">
              HOURS
            </span>
          </div>

          <span className="timer__separator">:</span>

          <div className="timer__item">
            <span className="timer__number">
              {formatNumber(minutes)}
            </span>
            <span className="timer__label">
              MINUTES
            </span>
          </div>

          <span className="timer__separator">:</span>

          <div className="timer__item">
            <span className="timer__number">
              {formatNumber(seconds)}
            </span>
            <span className="timer__label">
              SECONDS
            </span>
          </div>
        </div>

        {/* Website Heading */}
        <h1 className="coming-soon__heading">
          AERO TECH INFRA EQUIPMENT
        </h1>

        {/* Construction Banner */}
        <div className="construction">
          {/* <div className="construction__top-line construction__top-line--1" />
          <div className="construction__top-line construction__top-line--2" /> */}

          <div className="construction__title">
            COMING SOON
          </div>

          <div className="construction__subtitle">
            UNDER CONSTRUCTION
          </div>

          {/* <div className="construction__bottom-line construction__bottom-line--1" />
          <div className="construction__bottom-line construction__bottom-line--2" /> */}
        </div>

        {/* Description */}
        <p className="coming-soon__description">
          Our website is under construction, but we are ready to go! We are
          <br />
          preparing something amazing and exciting for you. Special surprise
          for our subscribers only
        </p>

        <div className="contact_us">
            <span>Contacts Us </span>
            <img src="" alt="" />
        </div>

      </section>
    </main>
  );
};

export default ComingSoon;