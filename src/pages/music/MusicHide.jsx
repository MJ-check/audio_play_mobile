import React from "react";
import { musicHideStyles } from "./MusicStyle"; 
import CircularProgress from '@material-ui/core/CircularProgress';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

/**
 * MusicHide 音乐播放器收起状态 
 */
const MusicHide = ({ 
  changeOnShow,   // function 改变音乐播放器状态 Hide 或者 OnShow
  musicOnPlay,    // json 正在播放的音乐信息
  playStatus      // bool 音乐播放状态 播放 或者 暂停
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