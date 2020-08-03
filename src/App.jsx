import React, { useState, useEffect } from "react";
import useStyles from "./AppStyle";
import TitleBar from "./component/TitleBar/TitleBar";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Music from "./pages/music/Music";

const App = () => {
  const classes = useStyles();
  const [linkPage, setLinkPage] = useState(null);
  const [musicOnPlay, setMusicOnPlay] = useState(null);

  useEffect(() => {
    var page = window.localStorage.getItem("page");
    if (!page) { page = "home"; }
    setLinkPage(page);
    const music_on_play = window.localStorage.getItem("musicOnPlay");
    if (music_on_play) {
      setMusicOnPlay(music_on_play);
    } else {
      setMusicOnPlay(null);
    }
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
  const handleChangeMusic = (music_id) => {
    if (music_id) {
      window.localStorage.setItem("musicOnPlay", music_id);
      setMusicOnPlay(music_id);
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
      <Music musicOnPlay={musicOnPlay}/>
    </div>
  );
}

export default App;