import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2),
    maxWidth: '100vw',
  },
  media: {
    width: '500px',
    paddingTop: '57%',
  },
}));

export default function Slide() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Card>
        <Skeleton variant="rect">
          <div className={classes.media} />
        </Skeleton>
        <CardContent>
          <Skeleton>
            <Typography gutterBottom variant="h5" component="h2">
              Lorem ipsum dolor sit amet
            </Typography>
          </Skeleton>
          <Skeleton>
            <Typography variant="body2" color="textSecondary" component="p">
              Lorem ipsum dolor
            </Typography>
          </Skeleton>
        </CardContent>
      </Card>
    </div>
  );
}
