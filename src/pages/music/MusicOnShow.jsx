import React, { useState } from "react";
import { musicOnShowStyles } from "./MusicStyle";
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from '@material-ui/core/Slider';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import Sequential from "../../image/icon/Sequential.png";
import LoopSingle from "../../image/icon/LoopSingle.png";
import Random from "../../image/icon/Random.png";
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import PlayList from "./PlayList";
import { allOperation } from "../../lib/config";
//import StatusBox from "../../component/StatusBox/StatusBox";

// 不同播放方式相应显示的图标
const operationIcon = [Sequential, Random, LoopSingle];

/**
 * MusicOnShow 音乐播放器展示状态 
 */
const MusicOnShow = ({
  changeOnShow,     // function 改变音乐播放器 Hide 或者 Onshow状态
  musicOnPlay,      // json 正在播放的音乐 
  sliderValue,      // int 音乐播放进度
  changeValue,      // function 改变音乐当前播放进度
  playStatus,       // bool 音乐播放状态 播放 或者 暂停
  changeStatus,     // function 改变音乐播放状态
  nextMusic,        // function 播放下一首音乐
  lastMusic,        // function 播放上一首音乐
  maxLength,        // int 音乐条最大取值
  operation,        // 当前音乐播放状态
  changeOperation,  // 改变音乐播放顺序
  playList,         // 音乐播放列表
  changePlayList,   // 更新音乐播放列表
}) => {
  // 样式表
  const classes = musicOnShowStyles({ clientWidth: document.body.clientWidth });
  // PlayList组件打开状态，true为打开，false为关闭
  const [openBox, setOpenBox] = useState(false);

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
          <div className={classes.hide_button}>
            <FullscreenExitIcon fontSize="large" onClick={() => changeOnShow()}/>
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
                  <img 
                    src={operationIcon[allOperation.indexOf(operation)]}
                    alt="" 
                    style={{ width: "25px", padding: "10x", }}
                    onClick={() => changeOperation()}
                  />
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
                  <QueueMusicIcon fontSize="large" onClick={() => setOpenBox(true)} />
                </div>
              </div>
            </div>
          </div>
          <div>
          {openBox === true ? (
            <div className={classes.box}>
              <PlayList 
                playList={playList}
                changePlayList={changePlayList}
                closeBox={() => setOpenBox(false)}
                openStatus={openBox}
                musicOnPlay={musicOnPlay}
              />
            </div>
            /*<div className={classes.box}>
              <StatusBox 
                maxWidth={window.screen.width}
                maxHeight={window.screen.height}
                musicID={musicOnPlay.music_id}
                closeBox={() => setOpenBox(false)}
              />
            </div>*/
          ) : ""}
          </div>
        </div>
      )}
    </div>
  );
}

export default MusicOnShow;