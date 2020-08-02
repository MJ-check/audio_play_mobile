import React, { useState, useEffect } from "react";
import TitleBar from "./component/TitleBar/TitleBar";
import Home from "./pages/home/Home";
import List from "./pages/list/List";

const App = () => {
  const [linkPage, setLinkPage] = useState(null);

  useEffect(() => {
    var page = window.localStorage.getItem("page");
    if (!page) { page = "home"; }
    setLinkPage(page);
  }, []);
  const handleNavigateTo = (page) => {
    window.localStorage.setItem("page", page);
    setLinkPage(page);
  };
  const chooseContent = () => {
    switch(linkPage) {
      case "home":
        return <Home />;
      case "list":
        return <List />;
      default:
        return null;
    };
  };

  return (
    <div>
      <TitleBar 
        navigateTo={handleNavigateTo}
        config={{
          chooseValue: linkPage,
          content: chooseContent(),
        }}
      />
    </div>
  );
}

export default App;