import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { CardActionArea } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export default function Deck({
  category, name, url, isArchived, onArchive,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea component={Link} to={`decks/${url}`}>
        <CardContent>
          <Typography variant="overline" color="textSecondary">
            {category}
          </Typography>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary" component={Link} to={`decks/${url}`}>
          Spustit
        </Button>
        <Button size="small" color="secondary" onClick={onArchive}>
          {isArchived ? 'Vyjmout z archivu' : 'Archivovat'}
        </Button>
      </CardActions>
    </Card>
  );
}

Deck.propTypes = {
  category: PropTypes.string.isRequired,
  isArchived: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};
