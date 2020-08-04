import React, { useState, useEffect } from "react";
import useStyles from "./StatusBoxStyle";
import apiCollectList from "../../lib/api/apiCollectList";
import apiStatus from "../../lib/api/apiStatus";
import apiAdd from "../../lib/api/apiAdd";
import apiRemove from "../../lib/api/apiRemove";
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StatusBox = ({ maxWidth, maxHeight, musicID, closeBox }) => {
  const classes = useStyles({ maxWidth: maxWidth, maxHeight: maxHeight });
  const [collectList, setCollectList] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [openMsg, setOpenMsg] = useState("");
  const [openStatus, setOpenStatus] = useState("success");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiStatus(musicID, (data) => {
      setStatusMsg(data);
    });
    apiCollectList((data) => {
      setCollectList(data);
    });
  }, [musicID]);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const cancelFromCollect = (music_id, list_id) => {
    setLoading(true);
    apiRemove(music_id, list_id, (code) => {
      if (code === 100) {
        apiStatus(music_id, (data) => {
          if (data) {
            setStatusMsg(data);
            setOpenStatus("success");
            setOpenMsg("取消收藏成功！");
            setOpen(true);
            setLoading(false);
          } else {
            setOpenStatus("warning");
            setOpenMsg("获取数据失败，请刷新重试！");
            setOpen(true);
            setLoading(false);
          }
        });
      } else {
        setOpenStatus("error");
        setOpenMsg("取消收藏失败！");
        setOpen(true);
        setLoading(false);
      }
    });
  };
  const addToCollect = (music_id, list_id) => {
    setLoading(true);
    apiAdd(music_id, list_id, (code) => {
      if (code === 100) {
        apiStatus(music_id, (data) => {
          if (data) {
            setStatusMsg(data);
            setOpenStatus("success");
            setOpenMsg("收藏成功！");
            setOpen(true);
            setLoading(false);
          } else {
            setOpenStatus("warning");
            setOpenMsg("获取数据失败，请刷新重试！");
            setOpen(true);
            setLoading(false);
          }
        });
      } else {
        setOpenStatus("error");
        setOpenMsg("收藏失败！");
        setOpen(true);
        setLoading(false);
      }
    });
  };

  return (
    <div className={classes.page}>
      <Snackbar 
        anchorOrigin={{vertical: 'top', horizontal: 'center'}} 
        open={open} 
        autoHideDuration={3000} 
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={openStatus}>
          {openMsg}
        </Alert>
      </Snackbar>
      <div className={classes.container}>
        {statusMsg === null || collectList === null ? (
          <div className={classes.loading}>
            <CircularProgress fontSize="large"/>
          </div>
        ) : (
          <div className={classes.content}>
            <div className={classes.text}>收藏夹</div>
            <div 
              className={classes.close}
              onClick={() => closeBox()}
            >
              <CloseIcon fontSize="large" />
            </div>
            <div className={classes.list_content}>
              {collectList.map((item, index) => {
                return (
                  <div className={classes.list} key={"list" + index}>
                    <div className={classes.list_name}>{item.list_name}</div>
                    <div className={classes.button}>
                      {function() {
                        for (var i = 0; i < statusMsg.length; i++) {
                          if (statusMsg[i].list_id === item.list_id) {
                            return (
                              <Button 
                                className={classes.already_in}
                                variant="outlined" 
                                onClick={() => cancelFromCollect(musicID, item.list_id)}
                              >
                                已收藏
                              </Button>
                            );
                          }
                        }
                        return (
                          <Button
                            className={classes.not_in}
                            variant="outlined" 
                            color="primary"
                            onClick={() => addToCollect(musicID, item.list_id)}
                          >
                            收藏
                          </Button>
                        );
                      }()}
                    </div>
                  </div>
                );
              })}
            </div>
            {loading === true ? (
              <div className={classes.loading_data}>
                <CircularProgress />
              </div>
            ) : ""}
          </div>
        )}
      </div>
    </div>
  );
}

export default StatusBox;