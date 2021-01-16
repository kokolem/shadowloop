import PropTypes, { string } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';
import { ToggleButton } from '@material-ui/lab';
import { Repeat as RepeatIcon } from '@material-ui/icons';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2),
    maxWidth: '100vw',
    overflowWrap: 'anywhere',
    hyphens: 'auto',
  },
  card: {
    width: 'fit-content',
  },
  mediaWrapper: {
    width: '100%',
  },
  media: {
    maxWidth: '100%',
  },
  loopButton: {
    float: 'right',
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
}));

export default function Slide({
  slideContent, deckUrl, onSlideFinished, isSlidePlaying, czechLabelShown, englishLabelShown,
  pauseDurationMultiplier,
}) {
  const classes = useStyles();

  const pauseDuration = useRef(2);

  const [englishText, czechText, audio, image] = slideContent;

  const [timesPlayed, setTimesPlayed] = useState(0);
  const timesPlayedRef = useRef(timesPlayed);

  const [isSlideRepeating, setIsSlideRepeating] = useState(false);

  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [isAudioPaused, setIsAudioPaused] = useState(false);

  const timeoutRef = useRef(0);

  useEffect(() => {
    setTimesPlayed(0);
    timesPlayedRef.current = 0;
    setIsAudioPaused(false);
    clearTimeout(timeoutRef.current);
  }, [slideContent]);

  useEffect(() => {
    setIsAudioPlaying(isSlidePlaying && !isAudioPaused);
  }, [isSlidePlaying, isAudioPaused]);

  useEffect(() => {
    if (isSlidePlaying && timesPlayedRef.current > 2 && !isSlideRepeating) {
      onSlideFinished();
    }
  }, [isSlidePlaying, isSlideRepeating, onSlideFinished, timesPlayed]);

  function onAudioFinished() {
    setIsAudioPaused(true);
    timeoutRef.current = setTimeout(() => {
      timesPlayedRef.current += 1;
      setTimesPlayed(timesPlayedRef.current);
      setIsAudioPaused(false);
    }, pauseDuration.current * 1000 * pauseDurationMultiplier);
  }

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <Box className={classes.mediaWrapper} display="flex" justifyContent="center">
          <img
            className={classes.media}
            src={`${process.env.REACT_APP_DECKS_BASE_URL}/${deckUrl}/${image}`}
            alt={englishText}
          />
        </Box>
        <CardContent>
          <div className={classes.loopButton}>
            <ToggleButton
              value="repeat"
              selected={isSlideRepeating}
              onChange={() => setIsSlideRepeating(!isSlideRepeating)}
            >
              <RepeatIcon />
            </ToggleButton>
          </div>
          { (englishLabelShown || czechLabelShown) && (
            <>
              <Typography gutterBottom variant="h5" component="h2">
                {englishLabelShown ? englishText : czechText}
              </Typography>
              { (englishLabelShown && czechLabelShown) && (
                <Typography variant="body2" color="textSecondary" component="p">
                  {czechText}
                </Typography>
              )}
            </>
          )}
        </CardContent>
        <ReactPlayer
          url={`${process.env.REACT_APP_DECKS_BASE_URL}/${deckUrl}/${audio}`}
          playing={isAudioPlaying}
          width={0}
          height={0}
          onEnded={onAudioFinished}
          onDuration={(t) => {
            pauseDuration.current = t;
          }}
        />
      </Card>
    </div>
  );
}

Slide.propTypes = {
  czechLabelShown: PropTypes.bool.isRequired,
  deckUrl: PropTypes.string.isRequired,
  englishLabelShown: PropTypes.bool.isRequired,
  isSlidePlaying: PropTypes.bool.isRequired,
  onSlideFinished: PropTypes.func.isRequired,
  pauseDurationMultiplier: PropTypes.number.isRequired,
  slideContent: PropTypes.arrayOf(string).isRequired,
};
