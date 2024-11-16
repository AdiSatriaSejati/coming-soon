import React from "react";
import '../styles/team.css';


export const Team = (props) => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
        rel="stylesheet"
      />
      <section className="hero-section">
      <div id="team" className="text-center">
      <div className="container">
          <h2>My Team</h2>
        <div className="card-grid">
          {props.data
            ? props.data.map((d, i) => (
                <a key={`${d.name}-${i}`} className="card" href={d.link} target="_blank">
                  <div
                    className="card__background"
                    style={{ backgroundImage: `url(${d.img})` }}
                  ></div>
                  <div className="card__content">
                    <p className="card__category">{d.category}</p>
                    <h3 className="card__heading">{d.name}</h3>
                  </div>
                </a>
              ))
            : "loading"}
        </div>
        </div></div>
      </section>
    </>
  );
};
