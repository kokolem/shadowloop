import PropTypes from 'prop-types';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Link } from 'react-router-dom';
import {
  createMuiTheme, IconButton, responsiveFontSizes, ThemeProvider,
} from '@material-ui/core';
import { Feedback } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  feedback: {
    marginLeft: 'auto',
  },
}));

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none', color: 'unset' }}>
            <Typography variant="h6" component="h1">
              Shadow loop
            </Typography>
          </Link>
          <a
            href={process.env.REACT_APP_FEEDBACK_URL}
            style={{ textDecoration: 'none', color: 'unset' }}
            className={classes.feedback}
          >
            <IconButton color="inherit">
              <Feedback />
            </IconButton>
          </a>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
      {children}
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
