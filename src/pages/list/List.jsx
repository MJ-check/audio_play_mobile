import React, { useState, useEffect } from "react";
import useStyles from "./ListStyle";
import apiCollectList from "../../lib/api/apiCollectList";
import apiList from "../../lib/api/apiList";
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
//import StatusBox from "../../component/StatusBox/StatusBox";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const List = ({ 
  changeMusic,      // 更改正在播放的音乐
  changePlayList,   // 更新音乐播放列表 
}) => {
  const classes = useStyles();
  const [allList, setAllList] = useState(null);
  const [listMusic, setListMusic] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [boxStyle, setBoxStyle] = useState(null);
  // 提示栏打开状态
  const [openSnackbar, setOpenSnackbar] = useState("");

  useEffect(() => {
    apiCollectList((data) => {
      setAllList(data);
    });
  }, []);

  // 更改收藏夹的开闭状态
  const handleChange = (panel) => (event, isExpanded) => {
    const getExtended = isExpanded ? panel.list_name : false;
    setExpanded(getExtended);
    if (getExtended === false) {
      setBoxStyle(null);
      setListMusic(null);
    } else {
      setBoxStyle({ opacity: "0.75" });
      apiList(panel.list_id, (data) => {
        setListMusic(data);
      });
    }
  };

  // 更新音乐播放列表
  const handleChangePlayList = music => {
    const return_msg = changePlayList("add", music);
    setOpenSnackbar(return_msg);
  }

  // 关闭提示栏函数
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') 
      return;
    setOpenSnackbar("");
  };

  return (
    <div className={classes.page}>
      {allList === null ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.container}>
          <div className={classes.background}>
            {expanded === false ? "" : (
              <img 
                className={classes.background_img}
                alt=""
                src={"/public/list/" + expanded + ".png"}
              />
            )}
          </div>
          <div className={classes.content}>
            {allList.map((item, index) => {
              return (
                <Accordion 
                  style={boxStyle}
                  expanded={expanded === item.list_name} 
                  onChange={handleChange(item)}
                  key={"panel" + index}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={"panel" + index}
                    id={"panel" + index}
                  >
                    <div className={classes.list_img_container}>
                      <img
                        className={classes.list_img}
                        alt=""
                        src={"/public/list/" + item.list_name + ".png"}
                      />
                    </div>
                    <div className={classes.list_name}>
                      {item.list_name}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className={classes.list_container}>
                      <div className={classes.list_msg}>
                        {item.list_msg}
                      </div>
                      <div className={classes.list_music}>
                        {listMusic === null ? "" : (
                          <div className={classes.music_container}>
                            {listMusic.map((item, index) => {
                              return (
                                <div className={classes.music} key={"music" + index}>
                                  <div className={classes.music_msg}>
                                    <div className={classes.music_name}>
                                      {item.music_name.split("--")[0]}
                                    </div>
                                    <div className={classes.signer_name}>
                                      {item.music_name.split("--")[1]}
                                    </div>
                                  </div>
                                  <div className={classes.music_button}>
                                    <PlayCircleFilledIcon 
                                      className={classes.a_button}
                                      onClick={() => changeMusic({ musicMsg: item, })}
                                    />
                                    <PlaylistAddIcon 
                                      className={classes.a_button} 
                                      fontSize="large"
                                      onClick={() => handleChangePlayList(item)}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
          {openSnackbar !== "" ? (
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'center', }} 
              open={openSnackbar === "" ? false : true} 
              autoHideDuration={3000} 
              onClose={handleCloseSnackbar}
            >
              <Alert 
                onClose={handleCloseSnackbar} 
                severity={openSnackbar === "添加成功" ? "success" : "warning"}
              >
                {openSnackbar}
              </Alert>
            </Snackbar>
            /*<div className={classes.box}>
              <StatusBox 
                maxWidth={window.screen.width}
                maxHeight={window.screen.height}
                musicID={openBox}
                closeBox={closeOpenBox}
              />
            </div>*/
          ) : ""}
        </div>
      )}
    </div>
  );
}

export default List;