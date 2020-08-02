import React, { useState, useEffect } from "react";
import useStyles from "./HomeStyle";
import { useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import apiAllMusic from "../../lib/api/apiAllMusic";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const HomeCarousel = ({ lastMusic }) => {
  const classes = useStyles();
  const theme = useTheme();
  const maxSteps = 5;
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.carousel_page}>
      {lastMusic === null ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.carousel}>
          <Paper square elevation={0} className={classes.header}>
            <Typography>{lastMusic[activeStep].music_name.split("--")[0]}</Typography>
            <Typography>{lastMusic[activeStep].music_name.split("--")[1]}</Typography>
          </Paper>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {lastMusic.map((step, index) => (
              <div className={classes.img_container} key={step.music_name}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <img 
                    className={classes.img} 
                    src={"/public/image/" + step.music_name + ".png"}
                    alt={step.music_name}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            className={classes.mobile_stepper}
            position="static"
            variant="dots"
            steps={maxSteps}
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                Next
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}

const Home = () => {
  const classes = useStyles();
  const [allMusic, setAllMusic] = useState(null);
  const [lastMusic, setLastMusic] = useState(null);

  useEffect(() => {
    apiAllMusic((data) => {
      if (data !== null) {
        setAllMusic(data);
        setLastMusic(data.slice(0, 5));
      }
    });
  }, []);

  return (
    <div className={classes.page}>
      <HomeCarousel lastMusic={lastMusic}/>
    </div>
  );
}

export default Home;