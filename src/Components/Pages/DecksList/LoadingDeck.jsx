import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export default function LoadingDeck() {
  const classes = useStyles();

  const randomLengthName = useState([...Array(
    Math.floor(
      Math.random() * 11,
    ) + 10,
  )].map(() => ('a')).join(''));

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Skeleton>
          <Typography variant="overline" color="textSecondary">
            Základní balíček
          </Typography>
        </Skeleton>
        <Skeleton>
          <Typography variant="h5" component="h2">
            {randomLengthName[0]}
          </Typography>
        </Skeleton>
      </CardContent>
      <CardActions>
        <Skeleton>
          <Button size="small" color="secondary">
            Spustit
          </Button>
        </Skeleton>
        <Skeleton>
          <Button size="small" color="secondary">
            Archivovat
          </Button>
        </Skeleton>
      </CardActions>
    </Card>
  );
}
