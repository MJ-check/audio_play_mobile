import React, { useState } from "react";
import { musicOnShowStyles } from "./MusicStyle";
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from '@material-ui/core/Slider';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import StatusBox from "../../component/StatusBox/StatusBox";

const MusicOnShow = ({ 
  changeOnShow, 
  musicOnPlay,
  sliderValue,
  changeValue,
  playStatus,
  changeStatus,
  nextMusic,
  lastMusic,
  maxLength
}) => {
  const classes = musicOnShowStyles({ clientWidth: document.body.clientWidth });
  const [openBox, setOpenBox] = useState(false);
  const changeOpenBox = () => {
    setOpenBox(true);
  };
  const handleCloseBox = () => {
    setOpenBox(false);
  };

  return (
    <div className={classes.page}>
      {musicOnPlay === null ? (
        <div className={classes.container}>
          <CircularProgress fontSize="large" />
        </div>
      ) : (
        <div className={classes.container}>
          <div className={classes.container}>
            <img
              className={classes.background_img}
              alt=""
              src={"/public/image/" + musicOnPlay.music_name + ".png"}
            />
          </div>
          <div className={classes.music_container}>
            <div className={classes.music_img_content}>
              <div className={classes.img_content}>
                <img
                  className={classes.img}
                  alt=""
                  src={"/public/image/" + musicOnPlay.music_name + ".png"}
                />
              </div>
            </div>
            <div className={classes.music_content}>
              <div className={classes.music_name}>
                <div>{musicOnPlay.music_name.split("--")[0]}</div>
                <div>{musicOnPlay.music_name.split("--")[1]}</div>
              </div>
              <div className={classes.slider}>
                <Slider
                  max={maxLength}
                  min={0}
                  color="secondary"
                  value={sliderValue}
                  onChange={(event, newValue) => changeValue(newValue)}
                  aria-labelledby="continuous-slider" 
                />
              </div>
              <div className={classes.buttons}>
                <div className={classes.a_button}>
                  <PlaylistAddIcon fontSize="large" onClick={() => changeOpenBox()}/>
                </div>
                <div className={classes.a_button}>
                  <SkipPreviousIcon fontSize="large" onClick={() => lastMusic()}/>
                </div>
                <div className={classes.a_button}>
                  {playStatus === true ? (
                    <PauseIcon fontSize="large" onClick={() => changeStatus()}/>
                  ) : (
                    <PlayArrowIcon fontSize="large" onClick={() => changeStatus()}/>
                  )}
                </div>
                <div className={classes.a_button}>
                  <SkipNextIcon fontSize="large" onClick={() => nextMusic()}/>
                </div>
                <div className={classes.a_button}>
                  <FullscreenExitIcon fontSize="large" onClick={() => changeOnShow()}/>
                </div>
              </div>
            </div>
          </div>
          <div>
            {openBox === true ? (
              <div className={classes.box}>
                <StatusBox 
                  maxWidth={window.screen.width}
                  maxHeight={window.screen.height}
                  musicID={musicOnPlay.music_id}
                  closeBox={handleCloseBox}
                />
              </div>
            ) : ""}
          </div>
        </div>
      )}
    </div>
  );
}

export default MusicOnShow;