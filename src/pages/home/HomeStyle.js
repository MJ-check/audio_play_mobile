import { makeStyles } from "@material-ui/core/styles";

const HomeStyles = makeStyles((theme) => ({
  page: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflowY: "scroll",
  },
  content: props => ({
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    paddingLeft: props.clientWidth * 0.05,
    paddingRight: props.clientWidth * 0.05,
    paddingBottom: 50,
  }),
  music_container: props => ({
    width: props.clientWidth * 0.18,
    height: props.clientWidth * 0.18,
    marginTop: props.clientWidth * 0.03,
    boxSizing: "border-box",
    padding: props.clientWidth * 0.015,
    overflow: "hidden",
  }),
  background: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  background_img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  text: {
    position: "relative",
    width: "100%",
    height: "100%",
    top: "-100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  word: {
    width: "100%",
    textAlign: "center",
    fontSize: 5,
    color: "white",
    margin: "1px 0px",
    opacity: 0.9,
  },
}));

const CarouselStyles = makeStyles((theme) => ({
  carousel_page: {
    width: "100%",
    height: 353,
  },
  loading: {
    width: "100%",
    height: "100%",
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  carousel: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    boxSizing: "border-box",
    width: "100%",
    height: 50,
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img_container: {
    height: 255,
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  mobile_stepper: {
    boxSizing: "border-box",
    width: "100%",
  },
}));

export { HomeStyles, CarouselStyles };