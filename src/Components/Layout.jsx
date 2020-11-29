import PropTypes from 'prop-types';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="h1">Shadow loop</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
      {children}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
