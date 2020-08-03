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
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  background_img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "blur(5px)",
    opacity: 0.65,
  },
  img_content: props => ({
    width: props.clientWidth * 0.8,
    height: props.clientWidth * 0.8,
    boxSizing: "border-box",
    marginTop: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: props.clientWidth * 0.4,
    overflow: "hidden",
  }),
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  slider: {
    width: "80%",
    boxSizing: "border-box",
    marginTop: "30%",
  },
  buttons: {
    width: "100%",
    boxSizing: "border-box",
    marginTop: "2%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  a_button: {
    margin: "0 4%",
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
    position: "absolute",
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
  canvas: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }
});

export { musicPageStyles, musicOnShowStyles, musicHideStyles };