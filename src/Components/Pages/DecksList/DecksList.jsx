import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  ButtonBase, Collapse, Container, Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import { useLocalStorage } from '@rehooks/local-storage';
import {
  ExpandLess, ExpandMore,
} from '@material-ui/icons';
import Deck from './Deck';
import LoadingDeck from './LoadingDeck';

const useStyles = makeStyles((theme) => ({
  decksList: {
    paddingTop: theme.spacing(2),
  },
  deckWrapper: {
    paddingBottom: theme.spacing(2),
  },
  archiveTitleWrapper: {
    width: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  archiveTitle: {
    width: '100%',
    padding: theme.spacing(1),
  },
  archiveTitleIcon: {
    paddingLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

export default function DecksList() {
  const classes = useStyles();

  const [allDecks, setAllDecks] = useState([]);
  const [activeDecks, setActiveDecks] = useState([]);
  const [archivedDecks, setArchivedDecks] = useLocalStorage('archivedDecks', []);
  const [hiddenDecks, setHiddenDecks] = useLocalStorage('hiddenDecks', []);

  const [isArchiveCollapsed, setIsArchiveCollapsed] = useState(true);

  const history = useHistory();
  useEffect(() => {
    const newHiddenDecksString = qs.parse(history.location.search, { ignoreQueryPrefix: true })
      .newDeck;
    if (!newHiddenDecksString) return;

    const newHiddenDecks = newHiddenDecksString.split(',');
    setHiddenDecks([...new Set([...hiddenDecks, ...newHiddenDecks])]);
    history.push(history.location.pathname);
  }, [hiddenDecks, history, setHiddenDecks]);

  useEffect(() => {
    setAllDecks((oldDecks) => [...new Set([...oldDecks, ...hiddenDecks])]);
  }, [hiddenDecks]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_DECKS_BASE_URL}/decks.txt`)
      .then((res) => res.text())
      .then((result) => {
        const fetchedDecks = result.split('\n').slice(0, -1);
        setAllDecks((oldDecks) => [...new Set([...oldDecks, ...fetchedDecks])]);
        setIsLoading(false);
      },
      (error) => { console.log(error); });
  }, []);

  function archiveDeck(deckToArchive) {
    setActiveDecks(activeDecks.filter((deck) => deck !== deckToArchive));
    setArchivedDecks([...new Set([...archivedDecks, deckToArchive])]);
  }

  function unarchiveDeck(deckToUnarchive) {
    setArchivedDecks(archivedDecks.filter((deck) => deck !== deckToUnarchive));
    setActiveDecks([...new Set([...activeDecks, deckToUnarchive])]);
  }

  useEffect(() => {
    setActiveDecks(allDecks.filter((deck) => !archivedDecks.includes(deck)));
  }, [allDecks, archivedDecks]);

  return (
    <Container className={classes.decksList}>
      {isLoading ? (
        <>
          {[...Array(4).keys()].map((key) => (
            <div className={classes.deckWrapper} key={key}>
              <LoadingDeck />
            </div>
          ))}
        </>
      ) : (
        <>
          {activeDecks.sort().map((deck) => (
            <div className={classes.deckWrapper} key={deck}>
              <Deck
                category={deck.split('_')[0]}
                name={deck.split('_')[1]}
                url={deck}
                isArchived={false}
                onArchive={() => archiveDeck(deck)}
              />
            </div>
          ))}
          {archivedDecks.length !== 0 && (
            <>
              <div className={classes.archiveTitleWrapper}>
                <ButtonBase
                  className={classes.archiveTitle}
                  onClick={() => setIsArchiveCollapsed(!isArchiveCollapsed)}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                  >
                    Archivované balíčky
                  </Typography>
                  <div className={classes.archiveTitleIcon}>
                    {isArchiveCollapsed ? (
                      <ExpandMore />
                    ) : (
                      <ExpandLess />
                    )}
                  </div>
                </ButtonBase>
              </div>

              <Collapse in={!isArchiveCollapsed} timeout="auto">
                {archivedDecks.sort().map((deck) => (
                  <div className={classes.deckWrapper} key={deck}>
                    <Deck
                      category={deck.split('_')[0]}
                      name={deck.split('_')[1]}
                      url={deck}
                      isArchived
                      onArchive={() => unarchiveDeck(deck)}
                    />
                  </div>
                ))}
              </Collapse>
            </>
          )}
        </>
      )}
    </Container>
  );
}
