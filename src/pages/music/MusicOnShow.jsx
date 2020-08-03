import React from "react";
import { musicOnShowStyles } from "./MusicStyle";

const MusicOnShow = ({ changeOnShow, musicOnPlay }) => {
  const classes = musicOnShowStyles();

  return (
    <div className={classes.page}>
      Music On Show
    </div>
  );
}

export default MusicOnShow;