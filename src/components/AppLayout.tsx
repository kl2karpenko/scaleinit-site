import React, { useContext, useEffect } from "react";

import { Box, Button, FormControlLabel, Switch, Typography } from "@mui/material";

import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";

import Home from "../pages/Home";
import NoMatch from "../pages/NoMatch";
import AppBar from "./AppBar";
import ModalDialog from "./Dialog";
import { useTheme } from "@mui/material/styles";
import useStyles from "./styles";

export default function AppLayout() {
  const theme = useTheme();
  const { classes } = useStyles();

  return (
    <Box key="scaleInIt" className={classes.root}>
      <AppBar />
      <Router basename="scaleInIt">
        <Routes>
          <Route index element={<Home key="home"/>} />
          {/*<Route path="/workout" element={<CurrentWorkout key="currentWorkout" />} />*/}
          {/*<Route path="/done" element={<span key="workoutDone">Workout is DONE!!!! Congratulations!)</span>} />*/}
          <Route path="*" element={<NoMatch key="noMatch" />} />
        </Routes>
      </Router>
      <ModalDialog />
    </Box>
  );
}
