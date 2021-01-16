import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { readRemoteFile } from 'react-papaparse';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Slide from './Slide';
import LoadingSlide from './LoadingSlide';
import Controls from './Controls';

const useStyles = makeStyles(() => ({
  root: {
    '@media (min-width:0px) and (orientation: landscape)': {
      minHeight: 'calc(100vh - 48px)',
    },
    '@media (min-width:600px)': {
      minHeight: 'calc(100vh - 64px)',
    },
    minHeight: 'calc(100vh - 56px)',
  },
}));

export default function DeckDetail() {
  const classes = useStyles();

  const { deck: deckUrl } = useParams();

  const [deckContent, setDeckContent] = useState([]);
  const [onSlide, setOnSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [czechLabelShown, setCzechLabelShown] = useState(true);
  const [englishLabelShown, setEnglishLabelShown] = useState(true);
  const [pauseDurationMultiplier, setPauseDurationMultiplier] = useState(1.5);

  useEffect(() => {
    readRemoteFile(`${process.env.REACT_APP_DECKS_BASE_URL}/${deckUrl}/${deckUrl}.csv`, {
      download: true,
      complete: (results) => {
        const newDeckContent = results.data.slice(0, -1);
        setDeckContent(newDeckContent);

        const firstImage = new Image();
        firstImage.src = `${process.env.REACT_APP_DECKS_BASE_URL}/${deckUrl}/${newDeckContent[1][3]}`;
        firstImage.onload = () => setIsLoading(false);
      },
    });
  }, [deckUrl]);

  useEffect(() => {
    if (!isLoading) {
      // preload next image and audio
      if (onSlide + 1 < deckContent.length) {
        (new Image()).src = `${process.env.REACT_APP_DECKS_BASE_URL}/${deckUrl}/${deckContent[onSlide + 1][3]}`;
        (new Audio()).src = `${process.env.REACT_APP_DECKS_BASE_URL}/${deckUrl}/${deckContent[onSlide + 1][2]}`;
      }
    }
  }, [deckContent, deckUrl, isLoading, onSlide]);

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
        <Box display="flex">
          <Box m="auto">
            {isLoading ? <LoadingSlide /> : (
              <Slide
                slideContent={deckContent[onSlide]}
                deckUrl={deckUrl}
                onSlideFinished={nextSlide}
                isSlidePlaying={isPlaying}
                czechLabelShown={czechLabelShown}
                englishLabelShown={englishLabelShown}
                pauseDurationMultiplier={pauseDurationMultiplier}
              />
            )}
          </Box>
        </Box>
      </Box>
      {!isLoading && (
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
          pauseDurationMultiplier={pauseDurationMultiplier}
          setPauseDurationMultiplier={setPauseDurationMultiplier}
        />
      )}
    </Box>
  );
}
