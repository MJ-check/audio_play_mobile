import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  page: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflowY: "scroll",
  },
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
  }
}));

export default useStyles;