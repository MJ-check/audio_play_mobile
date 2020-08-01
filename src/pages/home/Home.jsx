import React from "react";
import useStyles from "./HomeStyle";

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      Home
    </div>
  );
}

export default Home;