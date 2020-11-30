import React, { useState, useEffect } from "react";
import { HomeStyles } from "./HomeStyle";
import apiAllMusic from "../../lib/api/apiAllMusic";
import HomeCarousel from "./HomeCarousel";

const Home = ({ changeMusic }) => {
  const classes = HomeStyles({ clientWidth: document.body.clientWidth });
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
      {allMusic === null ? "" : (
        <div className={classes.content}>
          {allMusic.map((item, index) => {
            return (
              <div 
                className={classes.music_container} 
                key={"music" + index}
                onClick={() => changeMusic({ musicMsg: item, })}
              >
                <div className={classes.background}>
                  <img 
                    className={classes.background_img}
                    alt=""
                    src={"/public/image/" + item.music_name + ".png"}
                  />
                </div>
                <div className={classes.text}>
                  <div className={classes.word}>{item.music_name.split("--")[0]}</div>
                  <div className={classes.word}>{item.music_name.split("--")[1]}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;