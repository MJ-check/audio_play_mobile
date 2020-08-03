import React, { useState, useEffect } from "react";
import { musicPageStyles } from "./MusicStyle";
import MusicHide from "./MusicHide";
import MusicOnShow from "./MusicOnShow";
import apiMusic from "../../lib/api/apiMusic";

const Music = ({ musicOnPlay }) => {
  const classes = musicPageStyles();
  const [onShow, setOnShow] = useState(false);
  const [music, setMusic] = useState(null);

  useEffect(() => {
    apiMusic(musicOnPlay, (data) => {
      setMusic(data);
    });
  }, [musicOnPlay]);
  const handleChangeOnShow = () => {
    setOnShow(!onShow);
  };
  
  return (
    <div className={classes.page}>
      {onShow === false ? (
        <MusicHide 
          changeOnShow={handleChangeOnShow}
          musicOnPlay={music}
        />
      ) : (
        <MusicOnShow 
          changeOnShow={handleChangeOnShow}
          musicOnPlay={music}
        />
      )}
    </div>
  );
}

export default Music;