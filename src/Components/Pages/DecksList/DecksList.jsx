import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Container } from '@material-ui/core';
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
}));

export default function DecksList() {
  const classes = useStyles();

  const [decks, setDecks] = useState({});
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
    setHiddenDecks({ ...{}, [hiddenDeckUrl]: newHiddenDeck });
  }, [hiddenDecks, location, setHiddenDecks]);

  useEffect(() => {
    setDecks((oldDecks) => ({ ...oldDecks, ...hiddenDecks }));
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

        setDecks((oldDecks) => ({ ...oldDecks, ...Object.fromEntries(fetchedDecks) }));
        setIsLoading(false);
      },
      (error) => { console.log(error); });
  }, []);

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
      ) : Object.entries(decks).map(([url, { category, name }]) => (
        <div className={classes.deckPadding} key={url}>
          <Deck category={category} name={name} url={url} />
        </div>
      ))}
    </Container>
  );
}
