import React from "react";
import { musicHideStyles } from "./MusicStyle"; 
import CircularProgress from '@material-ui/core/CircularProgress';

const MusicHide = ({ changeOnShow, musicOnPlay }) => {
  const classes = musicHideStyles();

  return (
    <div className={classes.page}>
      {musicOnPlay === null ? (
        <div className={classes.container}>
          <CircularProgress />
        </div>
      ) : (
        <div 
          className={classes.container}
          onClick={() => changeOnShow()}
        >
          <img
            className={classes.background}
            alt=""
            src={"/public/image/" + musicOnPlay.music_name + ".png"}
          />
        </div>
      )}
    </div>
  );
}

export default MusicHide;