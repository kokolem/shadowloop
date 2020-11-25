import PropTypes, { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import ReactPlayer from 'react-player';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  container: {
    // width: '100%',
  },
  card: {
    width: 'fit-content',
  },
  media: {
    maxWidth: '100%',
  },
}));

export default function Slide({
  slideContent, deckName, onSlideFinished, isSlidePlaying,
}) {
  const classes = useStyles();

  const timeout = 2000;

  const [englishText, czechText, audio, image] = slideContent;

  const [timesPlayed, setTimesPlayed] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [isSlideFinished, setIsSlideFinished] = useState(false);

  useEffect(() => {
    setTimesPlayed(0);
  }, [slideContent]);

  useEffect(() => {
    if (timesPlayed < 3) setIsAudioPlaying(isSlidePlaying && !isAudioPaused);
  }, [isSlidePlaying, isAudioPaused, timesPlayed]);

  useEffect(() => {
    if (isSlidePlaying && isSlideFinished) {
      setIsSlideFinished(false);
      onSlideFinished();
    }
  }, [isSlidePlaying, isSlideFinished, onSlideFinished]);

  return (
    <div className={classes.root}>
      <Box
        className={classes.container}
        display="flex"
      >
        <Box m="auto">
          <Card className={classes.card}>
            <img
              className={classes.media}
              src={`${process.env.REACT_APP_DECKS_BASE_URL}/${deckName}/${image}`}
              alt={englishText}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {englishText}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {czechText}
              </Typography>
              <ReactPlayer
                url={`${process.env.REACT_APP_DECKS_BASE_URL}/${deckName}/${audio}`}
                playing={isAudioPlaying}
                width={0}
                height={0}
                onEnded={() => {
                  setTimesPlayed(timesPlayed + 1);
                  if (timesPlayed < 2) {
                    setIsAudioPaused(true);
                    new Promise((r) => setTimeout(r, timeout)).then(
                      () => setIsAudioPaused(false),
                    );
                  } else {
                    new Promise((r) => setTimeout(r, timeout)).then(
                      () => setIsSlideFinished(true),
                    );
                  }
                }}
              />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </div>
  );
}

Slide.propTypes = {
  deckName: PropTypes.string.isRequired,
  onSlideFinished: PropTypes.func.isRequired,
  isSlidePlaying: PropTypes.bool.isRequired,
  slideContent: PropTypes.arrayOf(string).isRequired,
};
