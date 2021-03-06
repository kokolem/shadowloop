import PropTypes from 'prop-types';
import React from 'react';
import {
  Box, Paper, IconButton, Slider, Container, FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';
import { Pause as PauseIcon, PlayArrow as PlayArrowIcon } from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
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
  isPlaying, onResumePauseClick, onSlide, maxSlide, onSlideChange,
  czechLabelShown, setCzechLabelShown, englishLabelShown, setEnglishLabelShown,
  pauseDurationMultiplier, setPauseDurationMultiplier,
}) {
  const classes = useStyles();

  return (
    <Paper square className={classes.root}>
      <Container>
        <Box className={classes.box} display="flex" flexDirection="column" alignItems="center">
          <Box display="flex" width="100%">
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
              max={maxSlide - 1}
              value={onSlide}
              onChange={onSlideChange}
              valueLabelDisplay="on"
              valueLabelFormat={(x) => x + 1}
            />
          </Box>
          <FormGroup row>
            <FormControlLabel
              control={(
                <Switch
                  checked={englishLabelShown}
                  onChange={(e) => setEnglishLabelShown(e.target.checked)}
                  color="primary"
                />
              )}
              label="Anglicky"
            />
            <FormControlLabel
              control={(
                <Switch
                  checked={czechLabelShown}
                  onChange={(e) => setCzechLabelShown(e.target.checked)}
                  color="primary"
                />
              )}
              label="Česky"
            />
            <FormControl variant="outlined">
              <InputLabel id="pause-label">Pauza</InputLabel>
              <Select
                labelId="pause-label"
                label="Pauza"
                value={pauseDurationMultiplier}
                onChange={(e) => setPauseDurationMultiplier(e.target.value)}
              >
                <MenuItem value={1}>1×</MenuItem>
                <MenuItem value={1.5}>1,5×</MenuItem>
                <MenuItem value={2}>2×</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
        </Box>
      </Container>
    </Paper>
  );
}

Controls.propTypes = {
  czechLabelShown: PropTypes.bool.isRequired,
  englishLabelShown: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  maxSlide: PropTypes.number.isRequired,
  onResumePauseClick: PropTypes.func.isRequired,
  onSlide: PropTypes.number.isRequired,
  onSlideChange: PropTypes.func.isRequired,
  pauseDurationMultiplier: PropTypes.number.isRequired,
  setCzechLabelShown: PropTypes.func.isRequired,
  setEnglishLabelShown: PropTypes.func.isRequired,
  setPauseDurationMultiplier: PropTypes.func.isRequired,
};
