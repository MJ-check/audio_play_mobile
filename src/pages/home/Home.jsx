import React from "react";
import useStyles from "./HomeStyle";
import TitleBar from "../../component/TitleBar/TitleBar";

const Test = () => {
  return (
    <div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
      <div>Hello world</div>
    </div>
  );
}

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <TitleBar content={<Test />}/>
    </div>
  );
}

export default Home;