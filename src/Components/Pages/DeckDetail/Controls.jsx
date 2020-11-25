import PropTypes from 'prop-types';
import React from 'react';
import {
  Box,
  Card, CardContent, IconButton, Slider,
} from '@material-ui/core';
import { Pause as PauseIcon, PlayArrow as PlayArrowIcon } from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  box: {
    paddingTop: '20px',
  },
  slider: {
    marginLeft: '15px',
    marginRight: '15px',
    marginTop: '10px',
  },
}));

export default function Controls({
  // eslint-disable-next-line no-unused-vars
  isPlaying, onResumePauseClick, onSlide, maxSLide, onSlideChange,
}) {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Box className={classes.box} display="flex">
          <IconButton onClick={onResumePauseClick}>
            { isPlaying ? (
              <PauseIcon />
            ) : (
              <PlayArrowIcon />
            )}
          </IconButton>
          <Slider
            className={classes.slider}
            min={0}
            max={maxSLide - 1}
            value={onSlide}
            onChange={onSlideChange}
            valueLabelDisplay="on"
            valueLabelFormat={(x) => x + 1}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

Controls.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  maxSLide: PropTypes.number.isRequired,
  onResumePauseClick: PropTypes.func.isRequired,
  onSlide: PropTypes.number.isRequired,
  onSlideChange: PropTypes.func.isRequired,
};
