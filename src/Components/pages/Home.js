import React from "react";
import Tours from "./Tours";
import classes from "./Home.module.css";
const Home = () => {
  let concerts = [
    {
      date: "JUL 16",
      location: "DETROIT,MI",
      theater: "DTE ENERGY MUSIC THEATER",
    },
    {
      date: "JUL 19",
      location: "TORRONTO",
      theater: "JOHN SNOW MUSIC THEATER",
    },
    {
      date: "JUL 25",
      location: "SURREY",
      theater: "PETER ROCK THEATER",
    },
    {
      date: "JUL 28",
      location: "CALGARY",
      theater: "EDWARD GROUND",
    },
    {
      date: "JUL 29",
      location: "BC",
      theater: "NEW MAXICON THEATER",
    },
    {
      date: "JUL 30",
      location: "NOVA SCOTIA",
      theater: "ROCK JOHNDON THEATER",
    },
  ];

  return (
    <React.Fragment>
      <section className={classes.container}>
        <h2>TOURS</h2>
        {concerts.map((data) => {
          return <Tours key={data.date} details={data}></Tours>;
        })}
      </section>
    </React.Fragment>
  );
};

export default Home;