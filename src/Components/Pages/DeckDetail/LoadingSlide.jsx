import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  container: {
    // minWidth: '100%',
  },
  card: {
    // width: '300px',
    // maxWidth: '100%',
  },
  media: {
    maxWidth: '100%',
  },
}));

export default function Slide() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box
        className={classes.container}
        display="flex"
      >
        <Box m="auto">
          <Card className={classes.card}>
            <Skeleton variant="rect">
              <div style={{ paddingTop: '57%', width: '300px' }} />
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
        </Box>
      </Box>
    </div>
  );
}
