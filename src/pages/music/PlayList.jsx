import React, { useEffect, useState } from "react";
import { playListStyles } from "./MusicStyle";

/**
 * PlayList 播放列表组件
 */
const PlayList = () => {

  // 样式组件
  const classes = playListStyles();

  // 音乐列表
  const [List, setList] = useState(undefined);

  // 使用浏览器存储的数据初始化组件
  useEffect(() => {
    const play_list = window.localStorage.getItem("playList");
    if ( play_list ) setList(play_list);
    else setList(null);
  }, []);


  return (
    <div>

    </div>
  );
};

export default PlayList;