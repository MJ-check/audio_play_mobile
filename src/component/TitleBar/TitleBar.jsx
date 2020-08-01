import React from "react";
import useStyles from "./TitleBarStyle";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';

const TitleBar = ({ content }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.page}>
      <div className={classes.header}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              开放音乐平台
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.content}>
        {content}
      </div>
      <div className={classes.root}>
        <BottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction label="首页" value="home" icon={<RestoreIcon />} />
          <BottomNavigationAction label="收藏夹" value="list" icon={<FavoriteIcon />} />
        </BottomNavigation>
      </div>
    </div>
  );
}

export default TitleBar;