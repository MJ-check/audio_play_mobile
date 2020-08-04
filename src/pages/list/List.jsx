import React, { useState, useEffect } from "react";
import useStyles from "./ListStyle";
import apiCollectList from "../../lib/api/apiCollectList";
import apiList from "../../lib/api/apiList";
import CircularProgress from '@material-ui/core/CircularProgress';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import StatusBox from "../../component/StatusBox/StatusBox";

const List = ({ changeMusic }) => {
  const classes = useStyles();
  const [allList, setAllList] = useState(null);
  const [listMusic, setListMusic] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [boxStyle, setBoxStyle] = useState(null);
  const [openBox, setOpenBox] = useState(null);

  useEffect(() => {
    apiCollectList((data) => {
      setAllList(data);
    });
  }, []);
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
  const changeOpenBox = (music_id) => {
    setOpenBox(music_id);
  };
  const closeOpenBox = () => {
    setOpenBox(null);
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
                                      onClick={() => changeMusic(item.music_id)}
                                    />
                                    <PlaylistAddIcon 
                                      className={classes.a_button} 
                                      fontSize="large"
                                      onClick={() => changeOpenBox(item.music_id)}
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
          {openBox !== null ? (
            <div className={classes.box}>
              <StatusBox 
                maxWidth={window.screen.width}
                maxHeight={window.screen.height}
                musicID={openBox}
                closeBox={closeOpenBox}
              />
            </div>
          ) : ""}
        </div>
      )}
    </div>
  );
}

export default List;