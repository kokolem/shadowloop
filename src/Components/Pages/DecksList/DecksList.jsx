import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Container, Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { useLocalStorage } from '@rehooks/local-storage';
import Deck from './Deck';
import LoadingDeck from './LoadingDeck';

const useStyles = makeStyles((theme) => ({
  deckPadding: {
    paddingTop: theme.spacing(2),
  },
  deckListPadding: {
    paddingBottom: theme.spacing(2),
  },
  archivedDecksHeading: {
    paddingTop: theme.spacing(2),
  },
}));

export default function DecksList() {
  const classes = useStyles();

  const [allDecks, setAllDecks] = useState({});
  const [activeDecks, setActiveDecks] = useState({});
  const [archivedDecks, setArchivedDecks] = useLocalStorage('archivedDecks', {});
  const [hiddenDecks, setHiddenDecks] = useLocalStorage('hiddenDecks', {});

  const location = useLocation();
  useEffect(() => {
    const hiddenDeckString = qs.parse(location.search, { ignoreQueryPrefix: true }).newDeck;
    if (!hiddenDeckString) return;

    const hiddenDeckSplit = hiddenDeckString.split('_');
    if (hiddenDeckSplit.length !== 3) return;

    const newHiddenDeck = {};
    [newHiddenDeck.category, newHiddenDeck.name, newHiddenDeck.password] = hiddenDeckSplit;

    const hiddenDeckUrl = hiddenDeckSplit.slice(0, 2).join('_');
    setHiddenDecks({ ...hiddenDecks, [hiddenDeckUrl]: newHiddenDeck });
  }, [hiddenDecks, location, setHiddenDecks]);

  useEffect(() => {
    setAllDecks((oldDecks) => ({ ...oldDecks, ...hiddenDecks }));
  }, [hiddenDecks]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_DECKS_BASE_URL}/decks.txt`)
      .then((res) => res.text())
      .then((result) => {
        const deckStrings = result.split('\n').slice(0, -1);

        const fetchedDecks = deckStrings.map((deckString) => {
          const newDeckValues = {};
          [newDeckValues.category, newDeckValues.name] = deckString.split('_');
          return [deckString, newDeckValues];
        });

        setAllDecks((oldDecks) => ({ ...oldDecks, ...Object.fromEntries(fetchedDecks) }));
        setIsLoading(false);
      },
      (error) => { console.log(error); });
  }, []);

  function archiveDeck(urlToArchive) {
    setActiveDecks(Object.fromEntries(Object.entries(activeDecks)
      .filter(([url]) => url !== urlToArchive)));
    setArchivedDecks({ ...archivedDecks, ...{ [urlToArchive]: allDecks[urlToArchive] } });
  }

  function unarchiveDeck(urlToUnarchive) {
    setArchivedDecks(Object.fromEntries(Object.entries(archivedDecks)
      .filter(([url]) => url !== urlToUnarchive)));
    setActiveDecks({ ...activeDecks, ...{ [urlToUnarchive]: allDecks[urlToUnarchive] } });
  }

  useEffect(() => {
    setActiveDecks(Object.fromEntries(Object.entries(allDecks)
      .filter(([url]) => !(url in archivedDecks))));
  }, [allDecks, archivedDecks]);

  return (
    <Container className={classes.deckListPadding}>
      {isLoading ? (
        <>
          {[...Array(4).keys()].map((key) => (
            <div className={classes.deckPadding} key={key}>
              <LoadingDeck />
            </div>
          ))}
        </>
      ) : (
        <>
          {Object.entries(activeDecks).sort().map(([url, { category, name }]) => (
            <div className={classes.deckPadding} key={url}>
              <Deck
                category={category}
                name={name}
                url={url}
                isArchived={false}
                onArchive={() => archiveDeck(url)}
              />
            </div>
          ))}
          {Object.entries(archivedDecks).length !== 0 && (
          <Typography
            variant="h5"
            component="h2"
            className={classes.archivedDecksHeading}
          >
            Archivované balíčky
          </Typography>
          )}
          {Object.entries(archivedDecks).sort().map(([url, { category, name }]) => (
            <div className={classes.deckPadding} key={url}>
              <Deck
                category={category}
                name={name}
                url={url}
                isArchived
                onArchive={() => unarchiveDeck(url)}
              />
            </div>
          ))}
        </>
      )}
    </Container>
  );
}
