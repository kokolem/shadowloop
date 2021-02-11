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

function shuffleArray(array) {
  // eslint-disable-next-line no-plusplus
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
}

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
      complete: async (results) => {
        const newDeckContent = results.data.slice(0, -1);
        const deckProps = await fetch(`${process.env.REACT_APP_DECKS_BASE_URL}/${deckUrl}/props.json`)
          .then((r) => r.json())
          .catch(() => false);

        let deckShuffle = true;
        if (deckProps) {
          if ('shuffle' in deckProps) {
            deckShuffle = deckProps.shuffle;
          }
        }
        if (deckShuffle) shuffleArray(newDeckContent);

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

  useEffect(() => {
    let wakelock = null;
    async function getWakelock() {
      try {
        return await navigator.wakeLock.request('screen');
      } catch (err) {
        // can't get wakelock for some reason, too bad!
        console.log(`${err.name}, ${err.message}`);
        return null;
      }
    }
    getWakelock().then((returnedWakelock) => {
      if (returnedWakelock) {
        console.log('wakelock acquired');
        wakelock = returnedWakelock;
      } else console.log('could not acquire wakelock');
    });
    return function cleanup() {
      if (wakelock) {
        console.log('releasing wakelock');
        wakelock.release();
      }
    };
  }, []);

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
      <Controls
        isPlaying={isPlaying}
        onResumePauseClick={() => setIsPlaying(!isPlaying)}
        onSlide={isLoading ? 1 : onSlide}
        maxSlide={isLoading ? 1 : deckContent.length}
        onSlideChange={(_, slide) => setOnSlide(slide)}
        czechLabelShown={czechLabelShown}
        setCzechLabelShown={setCzechLabelShown}
        englishLabelShown={englishLabelShown}
        setEnglishLabelShown={setEnglishLabelShown}
        pauseDurationMultiplier={pauseDurationMultiplier}
        setPauseDurationMultiplier={setPauseDurationMultiplier}
      />
    </Box>
  );
}
