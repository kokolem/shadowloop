import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export default function Deck({ name }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="overline" color="textSecondary">
          Základní balíček
        </Typography>
        <Typography variant="h5" component="h2">
          { name }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary" component={Link} to={`decks/${name}`}>
          Spustit od začátku
        </Button>
        <Button size="small" color="secondary" disabled>
          Pokračovat
        </Button>
      </CardActions>
    </Card>
  );
}

Deck.propTypes = {
  name: PropTypes.string.isRequired,
};
