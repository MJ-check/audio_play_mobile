import React from "react";
import useStyles from "./ListStyle";

const List = () => {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      List
    </div>
  );
}

export default List;