import React, { useContext, useEffect } from "react";

import {Grid, Box, Card, CardContent, Typography} from "@mui/material";

import Timer from "./Timer";
import { SportAppContext } from "../../SportAppContext";
import ExerciseDetail from "./ExerciseDetail";
import ExercisesStepper from "./ExercisesStepper";
import RoundsStepper from "./RoundsStepper";
import { useStyles } from "./styles";
import { IWorkoutGeneratedExercisesList } from "../../interfaces_deprecated/IWorkoutDeprecatedObj";
import bodyPartsForWorkout from "../../data/bodyPartsForWorkout";
import { IBodyPartsForWorkout } from "../../interfaces_deprecated/IBodyPartsForWorkout";
import WorkoutBuilderService from "../../services/WorkoutBuilderService/WorkoutBuilderService";

const getCurrentExercise = (
  {
    currentExercise,
    all_exercises_for_generated_list,
    currentRound
  }: {
    currentExercise: number;
    currentRound: number;
    all_exercises_for_generated_list?: IWorkoutGeneratedExercisesList[];
  }): IBodyPartsForWorkout | undefined => {
  if (all_exercises_for_generated_list && all_exercises_for_generated_list.length === 0 || !all_exercises_for_generated_list) return;
  const exercisesForThisRound: IBodyPartsForWorkout[] = all_exercises_for_generated_list[currentRound - 1]?.exercises || [];

  return exercisesForThisRound && exercisesForThisRound[currentExercise - 1];
}

const getCurrentExerciseLabel = (
  {
    currentExercise,
    all_exercises_for_generated_list,
    currentRound
  }: {
    currentExercise: number;
    currentRound: number;
    all_exercises_for_generated_list?: IWorkoutGeneratedExercisesList[];
  }): string | undefined => {
  const exercise = getCurrentExercise(  {
    currentExercise,
    all_exercises_for_generated_list,
    currentRound
  });

  return exercise?.label || `Cannot find an exercise for round: ${currentRound - 1} exrecise: ${currentExercise - 1}`;
}

const getCurrentExerciseVideo = (
  {
    currentExercise,
    all_exercises_for_generated_list,
    currentRound
  }: {
    currentExercise: number;
    currentRound: number;
    all_exercises_for_generated_list?: IWorkoutGeneratedExercisesList[];
  }): string | undefined => {
  const exercise = getCurrentExercise(  {
    currentExercise,
    all_exercises_for_generated_list,
    currentRound
  });

  return exercise?.video;
}

interface ICurrentWorkoutProps {
  workoutBuilderService: WorkoutBuilderService;
}

export default function CurrentWorkout({ workoutBuilderService }: ICurrentWorkoutProps): React.ReactElement {
  const classes = useStyles();
  const { workoutSession } = useContext(SportAppContext);
  // stop reload the page
  useEffect(() => {
    window.onbeforeunload = (event) => {
      const e = event || window.event;
      // Cancel the event
      e.preventDefault();
      if (e) {
        e.returnValue = ""; // Legacy method for cross browser support
      }
      return ""; // Legacy method for cross browser support
    };

    return () => {
      window.onbeforeunload = null;
    }
  }, []);

  const {
    activeExerciseIndex: currentExercise,
    activeRoundIndex
  } = workoutSession;
  const {
    all_exercises_for_generated_list,
    exercises
  } = workoutBuilderService;
  const isResting = false;

  const nextExercise = currentExercise + 1 > exercises ? 1 : currentExercise + 1;
  const nextRound = currentExercise + 1 > exercises ? activeRoundIndex + 1 : activeRoundIndex;

  return (
    <Box p={2} minHeight="100%">
      <Card variant="outlined" style={{ height: "calc(100% - 160px)", padding: 10 }}>
        <Grid container direction="column" alignContent="center" alignItems="stretch" className={classes.stretchHeight} spacing={2}>
          <Grid item xs={12} alignContent={"center"}>
            <Grid container>
              <Grid item>
                <Typography align="center" variant="h5">Workout in Progress:</Typography>
              </Grid>
              <Grid item>
                <Typography align="center" variant="h5">{bodyPartsForWorkout[workoutBuilderService.generated_body_parts_list[(activeRoundIndex - 1)]]}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CardContent className={classes.stretchHeight}>
              <Grid container spacing={5} className={classes.stretchHeight}>
                <Grid item xs={12} alignSelf={"flex-end"}>
                  <RoundsStepper workoutSession={workoutSession} workoutCreatorService={workoutBuilderService} activeRoundIndex={activeRoundIndex} />
                </Grid>
                <Grid item xs={2} alignItems="stretch" alignContent="center" style={{ height: "calc(100% - 60px)" }}>
                  <ExercisesStepper isResting={isResting} workoutCreatorService={workoutBuilderService} workoutSession={workoutSession} currentExercise={currentExercise} />
                </Grid>
                <Grid item xs={10}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Grid container spacing={3} alignContent={"center"} justifyContent={"center"} alignItems={"center"}>
                        <Grid item xs={4}>
                          <Timer />
                        </Grid>
                        <Grid item xs={4}>
                          <ExerciseDetail
                            video={getCurrentExerciseVideo({ activeRoundIndex, currentExercise, all_exercises_for_generated_list })}
                            exerciseName={getCurrentExerciseLabel({ activeRoundIndex, currentExercise, all_exercises_for_generated_list })}
                            description={"Current exercise is:"}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <ExerciseDetail
                            video={getCurrentExerciseVideo({ activeRoundIndex, currentExercise: currentExercise + 1, all_exercises_for_generated_list })}
                            exerciseName={getCurrentExerciseLabel({ activeRoundIndex: nextRound, currentExercise: nextExercise, all_exercises_for_generated_list })}
                            description={"Next exercise is:"}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <iframe width="100%" height="600" src={workoutSession.url || "https://www.youtube.com/embed/IgSn1Z2rq6E"}
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  ) ;
}