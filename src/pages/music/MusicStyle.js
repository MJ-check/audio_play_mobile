import { makeStyles } from "@material-ui/core/styles";

const musicPageStyles = makeStyles({
  page: {},
});

const musicOnShowStyles = makeStyles({
  page: {
    position: "absolute",
    zIndex: 1000,
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "white",
  },
});

const musicHideStyles = makeStyles({
  page:{
    position: "absolute",
    zIndex: 1000,
    width: 50,
    height: 50,
    bottom: 60,
    right: 25,
    borderRadius: 25,
    overflow: "hidden",
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

export { musicPageStyles, musicOnShowStyles, musicHideStyles };