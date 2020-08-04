import React, { useState, useEffect } from "react";
import useStyles from "./TitleBarStyle";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';

/**
 * config: {
 *    chooseValue: *string*("home"),
 *    content: *DOM*(<div></div>),
 * }
 * navigateTo: function(newValue)
 */

const TitleBar = ({ config, navigateTo }) => {
  const classes = useStyles();
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(config.chooseValue);
  }, [config]);
  const handleChange = (event, newValue) => {
    navigateTo(newValue);
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
        {config.content}
      </div>
      <div className={classes.root}>
        <BottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction label="首页" value="home" icon={<HomeIcon />} />
          <BottomNavigationAction label="收藏夹" value="list" icon={<FavoriteIcon />} />
        </BottomNavigation>
      </div>
    </div>
  );
}

export default TitleBar;