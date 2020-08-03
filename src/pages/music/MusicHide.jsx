import React from "react";
import { musicHideStyles } from "./MusicStyle"; 
import CircularProgress from '@material-ui/core/CircularProgress';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const MusicHide = ({ 
  changeOnShow,
  musicOnPlay,
  playStatus
}) => {
  const classes = musicHideStyles();

  return (
    <div className={classes.page}>
      {musicOnPlay === null ? (
        <div className={classes.container}>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div className={classes.container}>
            <img
              className={classes.background}
              alt=""
              src={"/public/image/" + musicOnPlay.music_name + ".png"}
            />
          </div>
          <div 
            className={classes.canvas}
            onClick={() => changeOnShow()}
          >
            {playStatus === true ? (
              <PauseIcon />
            ) : (
              <PlayArrowIcon />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MusicHide;