import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { readRemoteFile } from 'react-papaparse';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Slide from './Slide';
import LoadingSlide from './LoadingSlide';
import Controls from './Controls';

const useStyles = makeStyles((theme) => ({
  root: {
    '@media (min-width:0px) and (orientation: landscape)': {
      minHeight: 'calc(100vh - 48px)',
    },
    '@media (min-width:600px)': {
      minHeight: 'calc(100vh - 64px)',
    },
    minHeight: 'calc(100vh - 56px)',
    paddingTop: theme.spacing(2),
  },
}));

export default function DeckDetail() {
  const classes = useStyles();

  const { deck: deckName } = useParams();

  const [deckContent, setDeckContent] = useState([]);
  const [onSlide, setOnSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [czechLabelShown, setCzechLabelShown] = useState(true);
  const [englishLabelShown, setEnglishLabelShown] = useState(true);

  useEffect(() => {
    readRemoteFile(`${process.env.REACT_APP_DECKS_BASE_URL}/${deckName}/${deckName}.csv`, {
      download: true,
      complete: (results) => {
        setDeckContent(results.data.slice(0, -1));
        setIsLoading(false);
      },
    });
  }, [deckName]);

  useEffect(() => {
    if (!isLoading) {
      // preload next image
      if (onSlide + 1 < deckContent.length) {
        new Image().src = `${process.env.REACT_APP_DECKS_BASE_URL}/${deckName}/${deckContent[onSlide + 1][3]}`;
      }
    }
  }, [deckContent, deckName, isLoading, onSlide]);

  function nextSlide() {
    if (onSlide + 1 < deckContent.length) {
      setOnSlide(onSlide + 1);
    } else {
      setIsPlaying(false);
    }
  }

  return (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="column"
    >
      <Box flex="1">
        {isLoading ? <LoadingSlide /> : (
          <Slide
            slideContent={deckContent[onSlide]}
            deckName={deckName}
            onSlideFinished={nextSlide}
            isSlidePlaying={isPlaying}
            czechLabelShown={czechLabelShown}
            englishLabelShown={englishLabelShown}
          />
        )}
      </Box>
      { !isLoading && (
      <Controls
        isPlaying={isPlaying}
        onResumePauseClick={() => setIsPlaying(!isPlaying)}
        onSlide={onSlide}
        maxSlide={deckContent.length}
        onSlideChange={(_, slide) => setOnSlide(slide)}
        czechLabelShown={czechLabelShown}
        setCzechLabelShown={setCzechLabelShown}
        englishLabelShown={englishLabelShown}
        setEnglishLabelShown={setEnglishLabelShown}
      />
      )}
    </Box>
  );
}
