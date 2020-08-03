import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  page: {
    position: "absolute",
    zIndex: 0,
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  header: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    overflowY: "scroll",
  },
  content: {
    position: "absolute",
    width: "100%",
    height: "calc(100% - 112px)",
    margin: "56px 0px",
    overflowY: "scroll",
  },
  root: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default useStyles;