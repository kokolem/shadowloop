import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
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
        display="flex"
      >
        <Box m="auto">
          <Card>
            <Skeleton variant="rect">
              <div style={{ paddingTop: '57%', width: '400px' }} />
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
