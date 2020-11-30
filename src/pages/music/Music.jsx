import React, { useState, useEffect } from "react";
import { musicPageStyles } from "./MusicStyle";
import MusicHide from "./MusicHide";
import MusicOnShow from "./MusicOnShow";

/**
 * Music 音乐播放器组件 
 */
const Music = ({ 
  musicOnPlay,    // 正在播放的音乐 
  onChangeMusic,  // 切换音乐
}) => {
  const classes = musicPageStyles();
  const [onShow, setOnShow] = useState(false);
  const [musicMsg, setMusicMsg] = useState(null);
  const [music, setMusic] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);
  const [isFirstOpen, setIsFirstOpen] = useState(true);  // 用于第一次加载判断

  useEffect(() => {
    // 上一首歌曲暂停
    if ( music ) {
      music.pause();
      setPlayStatus(false);
    } 

    // 加载下一首歌曲
    setMusicMsg(musicOnPlay);
    if ( musicOnPlay ) {
      const audio = new Audio("/public/music/" + musicOnPlay.music_name + ".mp3");
      audio.addEventListener("ended", () => {
        setPlayStatus(false);
      });
      audio.addEventListener("timeupdate", event => {
        const new_time = event.path ? event.path[0].currentTime : event.target.currentTime;
        setCurrentValue(parseInt(new_time));
      });
      if ( isFirstOpen === true ) {
        audio.pause();
        setPlayStatus(false);
        setIsFirstOpen(false);
      } else {
        audio.play();
        setPlayStatus(true);
      }
      setMusic(audio);
    } else if ( isFirstOpen === false ) {
      console.error("Parameter musicOnPlay equals null!");
    }
  // eslint-disable-next-line
  }, [musicOnPlay]);
  
  const handleChangeOnShow = () => {
    setOnShow(!onShow);
  };
  const handleChangeValue = (new_value) => {
    if (music && new_value) {
      music.currentTime = new_value;
      music.play();
      setPlayStatus(true);
    }
  };
  const handleChangeStatus = () => {
    if (music) {
      if (playStatus === true) {
        music.pause();
        setPlayStatus(false);
      } else {
        music.play();
        setPlayStatus(true);
      }
    }
  };
  const handleNextMusic = () => {
    console.log("next music");
  };
  const handleLastMusic = () => {
    console.log("last music");
  };

  return (
    <div className={classes.page}>
      {onShow === false ? (
        <MusicHide 
          changeOnShow={handleChangeOnShow}
          musicOnPlay={musicMsg}
          playStatus={playStatus}
        />
      ) : (
        <MusicOnShow 
          changeOnShow={handleChangeOnShow}
          musicOnPlay={musicMsg}
          sliderValue={currentValue}
          changeValue={handleChangeValue}
          playStatus={playStatus}
          changeStatus={handleChangeStatus}
          nextMusic={handleNextMusic}
          lastMusic={handleLastMusic}
          maxLength={music ? parseInt(music.duration) : 1}
        />
      )}
    </div>
  );
}

export default Music;