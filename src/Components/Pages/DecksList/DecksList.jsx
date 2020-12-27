import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Container } from '@material-ui/core';
import Deck from './Deck';
import LoadingDeck from './LoadingDeck';

const useStyles = makeStyles((theme) => ({
  deckPadding: {
    paddingTop: theme.spacing(2),
  },
}));

export default function DecksList() {
  const classes = useStyles();

  const [decks, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DECKS_BASE_URL}/decks.txt`)
      .then((res) => res.text())
      .then(
        (result) => {
          setDecks(result.split('\n').slice(0, -1));
          setIsLoading(false);
        },
        (error) => { console.log(error); },
      );
  }, []);

  return (
    <Container>
      {isLoading ? (
        <>
          {[...Array(4).keys()].map((key) => (
            <div className={classes.deckPadding} key={key}>
              <LoadingDeck />
            </div>
          ))}
        </>
      ) : decks.map((name) => (
        <div className={classes.deckPadding} key={name}>
          <Deck name={name} />
        </div>
      ))}
    </Container>
  );
}
