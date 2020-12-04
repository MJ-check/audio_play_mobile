import React, { useState, useEffect } from "react";
import useStyles from "./AppStyle";
import apiLastMusic from "./lib/api/apiLastMusic";
import { allPage } from "./lib/config";
import TitleBar from "./component/TitleBar/TitleBar";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Music from "./pages/music/Music";
import { 
  initBeforeUnloadFunctionList, 
  carryBeforeUnloadFunction,
  addBeforeUnloadFunction,
} from "./utils/handleBeforeUnload";
import {
  playListOperation,
  storePlayList,
  initMusicStack,
  chooseNextMusic,
  switchToLastMusic,
} from "./utils/playListOperation";

const App = () => {
  // 页面样式
  const classes = useStyles();
  // 显示的页面
  const [linkPage, setLinkPage] = useState(null);
  // 正在播放的音乐
  const [musicOnPlay, setMusicOnPlay] = useState(null);
  // 音乐播放列表
  const [playList, setPlayList] = useState({ list: [], ptr: 0, });

  useEffect(() => {
    // 加载打开的导航栏
    var page = window.localStorage.getItem("page");
    if ( allPage.indexOf(page) === -1 ) 
      page = "home";
    setLinkPage(page);

    // 加载正在播放的音乐
    const music_on_play = JSON.parse(window.localStorage.getItem("musicOnPlay"));
    if ( music_on_play &&
         typeof music_on_play === "object" &&
         typeof music_on_play.music_id === "number" &&
         typeof music_on_play.music_name === "string" 
    ) {
      setMusicOnPlay(music_on_play);
      initMusicStack(music_on_play);
    } else {
      apiLastMusic(data => {
        const load_music = data ? data[0] : null;
        setMusicOnPlay(load_music);
        initMusicStack(load_music);
      });
    }
    
    // 加载音乐播放列表
    const play_list = JSON.parse(window.localStorage.getItem("playList"));
    if ( play_list &&
         typeof play_list === "object" &&
         typeof play_list.list === "object" &&
         typeof play_list.ptr === "number" &&
         play_list.list.length > 0
    ) {
      setPlayList(play_list);
    } else {
      apiLastMusic(data => {
        const load_play_list = {
          list: data ? data : [],
          ptr: 0,
        };
        setPlayList(load_play_list);
        addBeforeUnloadFunction(storePlayList, load_play_list, 0);
      });
    }

    // 浏览器关闭时间初始化
    initBeforeUnloadFunctionList();
    window.onbeforeunload = e => {
      carryBeforeUnloadFunction();
      return null;
    };
  }, []);

  // 页面跳转
  const handleNavigateTo = page => {
    window.localStorage.setItem("page", page);
    setLinkPage(page);
  };

  // 选择显示页面
  const chooseContent = () => {
    switch(linkPage) {
      case "home":
        return  <Home changeMusic={handleChangeMusic}/>;
      case "list":
        return  <List 
                  changeMusic={handleChangeMusic}
                  changePlayList={handleChangePlayList}
                />;
      default:
        return null;
    };
  };

  // 切换播放的音乐
  const handleChangeMusic = ({ musicMsg=null, toNext=null, toLast=null }) => {
    var result = null;
    if ( musicMsg ) {
      result =  chooseNextMusic({ list: playList.list, currentIndex: playList.ptr, value: musicMsg, });
    } else if ( toNext ) {
      result =  chooseNextMusic({ list: playList.list, currentIndex: playList.ptr, operation: toNext, });
    } else if ( toLast ) {
      result =  switchToLastMusic(playList.ptr);
    }
    // 存储变化
    window.localStorage.setItem("musicOnPlay", JSON.stringify(result[0]));
    setMusicOnPlay(result[0]);
    const load_play_list = { list: playList.list, ptr: result[1], };
    setPlayList(load_play_list);
    addBeforeUnloadFunction(storePlayList, load_play_list, 0);
  };

  // 修改播放列表
  const handleChangePlayList = ( operation, value ) => {
    const new_list = playListOperation(playList.list, operation, value);
    const new_ptr = playList.ptr;
    var load_play_list = { list: [], ptr: new_ptr, };
    if ( typeof new_list === "object" ) {
      // 当播放列表改变时修改网页关闭函数列，并保证播放列表不为空
      if ( new_list.length === 0 ) {
        apiLastMusic(data => {
          if ( data ) {
            load_play_list.list = data;
            data.forEach((item, index) => {
              if ( item.music_id === musicOnPlay.music_id )
                load_play_list.ptr = index;
            });
          } else {
            load_play_list.list = [];
            load_play_list.ptr = 0;
          }
          setPlayList(load_play_list);
          addBeforeUnloadFunction(storePlayList, load_play_list, 0);
        });
      } else {
        load_play_list.list = new_list;
        new_list.forEach((item, index) => {
          if ( item.music_id === musicOnPlay.music_id )
            load_play_list.ptr = index;
        });
        setPlayList(load_play_list);
        addBeforeUnloadFunction(storePlayList, load_play_list, 0);
      }
      return "添加成功";
    } else {
      // 发出警告
      const warning_string = new_list;
      console.error("PlayList Operation " + warning_string + " !");
      return warning_string;
    }
  };

  return (
    <div className={classes.page}>
      <TitleBar
        navigateTo={handleNavigateTo}
        config={{
          chooseValue: linkPage,
          content: chooseContent(),
        }}
      />
      <Music 
        musicOnPlay={musicOnPlay}
        onChangeMusic={handleChangeMusic}
        playList={playList}
        changePlayList={handleChangePlayList}
      />
    </div>
  );
}

export default App;