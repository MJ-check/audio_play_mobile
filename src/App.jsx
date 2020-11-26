import React, { useState, useEffect } from "react";
import useStyles from "./AppStyle";
import TitleBar from "./component/TitleBar/TitleBar";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Music from "./pages/music/Music";
import { 
  initBeforeUnloadFunctionList, 
  carryBeforeUnloadFunction 
} from "./utils/handleBeforeUnload"

const App = () => {
  const classes = useStyles();
  const [linkPage, setLinkPage] = useState(null);
  const [musicOnPlay, setMusicOnPlay] = useState(null);

  useEffect(() => {
    // 加载打开的导航栏
    var page = window.localStorage.getItem("page");
    if ( !page ) page = "home"; 
    setLinkPage(page);

    // 加载正在播放的音乐
    const music_on_play = window.localStorage.getItem("musicOnPlay");
    if ( music_on_play ) setMusicOnPlay(JSON.parse(music_on_play));

    // 浏览器关闭时间初始化
    initBeforeUnloadFunctionList();
    window.onbeforeunload = e => {
      carryBeforeUnloadFunction();
      return null;
    };
  }, []);

  const handleNavigateTo = (page) => {
    window.localStorage.setItem("page", page);
    setLinkPage(page);
  };

  const chooseContent = () => {
    switch(linkPage) {
      case "home":
        return <Home changeMusic={handleChangeMusic}/>;
      case "list":
        return <List changeMusic={handleChangeMusic}/>;
      default:
        return null;
    };
  };

  const handleChangeMusic = musicMsg => {
    if ( typeof musicMsg === "object" 
         && typeof musicMsg.music_id === "number" 
         && typeof musicMsg.music_name === "string" 
    ) {
      window.localStorage.setItem("musicOnPlay", JSON.stringify(musicMsg));
      setMusicOnPlay(musicMsg);
    } else {
      console.error("Parameter Type error!");
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
      />
    </div>
  );
}

export default App;