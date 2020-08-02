import React, { useState, useEffect } from "react";
import { HomeStyles } from "./HomeStyle";
import apiAllMusic from "../../lib/api/apiAllMusic";
import HomeCarousel from "./HomeCarousel";

const Home = () => {
  const classes = HomeStyles();
  const [allMusic, setAllMusic] = useState(null);
  const [lastMusic, setLastMusic] = useState(null);

  useEffect(() => {
    apiAllMusic((data) => {
      if (data !== null) {
        setAllMusic(data);
        setLastMusic(data.slice(0, 5));
      }
    });
  }, []);

  return (
    <div className={classes.page}>
      <HomeCarousel lastMusic={lastMusic}/>
    </div>
  );
}

export default Home;