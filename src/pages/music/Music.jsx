import React, { useState, useEffect } from "react";
import { musicPageStyles } from "./MusicStyle";
import MusicHide from "./MusicHide";
import MusicOnShow from "./MusicOnShow";
import { allOperation } from "../../lib/config";

/**
 * Music 音乐播放器组件 
 */
const Music = ({ 
  musicOnPlay,      // 正在播放的音乐 
  onChangeMusic,    // 切换音乐
  playList,         // 音乐播放列表
  changePlayList,   // 更新播放列表
}) => {
  // 样式
  const classes = musicPageStyles();
  // 音乐播放页面是显示 OnShow 或者隐藏 Hide
  const [onShow, setOnShow] = useState(false);
  // 当前播放音乐的信息
  const [musicMsg, setMusicMsg] = useState(null);
  // 播放音乐的Audio对象
  const [music, setMusic] = useState(null);
  // 播放状态，正在播放 true，暂停 false
  const [playStatus, setPlayStatus] = useState(false);
  // 播放条当前进度 number
  const [currentValue, setCurrentValue] = useState(0);
  // 是否第一次加载该组件，用于第一次加载判断
  const [isFirstOpen, setIsFirstOpen] = useState(true);  
  // 选择的音乐播放方式
  const [operation, setOperation] = useState("sequential");
  // 判断音乐是否结束
  const [playEnded, setPlayEnded] = useState(false);

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
        setPlayEnded(true);
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

  // 音乐播放结束时切换下一首
  useEffect(() => {
    if ( playEnded === true ) {
      onChangeMusic({ toNext: operation });
      setPlayEnded(false);
    }
  // eslint-disable-next-line
  }, [playEnded]);
  
  // 改变音乐播放页面显示状态
  const handleChangeOnShow = () => {
    setOnShow(!onShow);
  };

  // 改变当前播放进度
  const handleChangeValue = (new_value) => {
    if (music && new_value) {
      music.currentTime = new_value;
      music.play();
      setPlayStatus(true);
    }
  };

  // 改变音乐播放状态，是正在播放还是暂停播放
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

  // 切换下一首音乐
  const handleNextMusic = () => {
    onChangeMusic({ toNext: operation, });
  };

  // 切换上一首音乐
  const handleLastMusic = () => {
    onChangeMusic({ toLast: "toLast", });
  };

  // 改变音乐切换状态，是顺序播放、随机播放还是循环播放
  const handleChangeOperation = () => {
    const next_index = (allOperation.indexOf(operation) + 1) % allOperation.length;
    const new_operation = allOperation[next_index];
    setOperation(new_operation);
  }

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
          operation={operation}
          changeOperation={handleChangeOperation}
          playList={playList}
          changePlayList={changePlayList}
        />
      )}
    </div>
  );
}

export default Music;