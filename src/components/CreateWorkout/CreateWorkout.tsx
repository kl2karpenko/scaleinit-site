import React, { useContext, useState } from "react";

import {
  Card,
  CardContent,
  Select,
  Box,
  Typography,
  Grid,
  Button,
  FormControl,
  FormLabel,
  MenuItem
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import bodyPartsForWorkout, {BodyParts} from "../../data/bodyPartsForWorkout";
import { IWorkoutGeneratedExercisesList, IWorkoutDeprecatedObj } from "../../interfaces/IWorkoutDeprecatedObj";
import { SportAppContext } from "../../SportAppContext";
import WorkoutPreview from "../WorkoutPreview";
import {
  createRandomExercisesForAllRounds,
  generateListOfBodyPartsForAllRounds
} from "../../helpers/workoutHelpers";
import { IWorkoutSession } from "../../interfaces/IWorkoutSession";
import { IBodyPartsForWorkout } from "../../interfaces/IBodyPartsForWorkout";
import workoutTypes from "../../data/workoutTypesList";
import WorkoutForm from "./WorkoutForm";
import HIITWorkout from "../../models/Workout/HIITWorkout";
import TabataWorkout from "../../models/Workout/TabataWorkout";
import Workout from "../../models/Workout/Workout";
import {WorkoutSessionFields} from "../../models/WorkoutSession/WorkoutSessionFields";
import {TValues} from "../../interfaces/TValues";

const allExercisesList = Object.values(workoutTypes).reduce((workoutTypesExercises: IBodyPartsForWorkout[], acc: IBodyPartsForWorkout[]) => {
  return [ ...acc, ...workoutTypesExercises ];
}, []);
const getWorkoutExercise = (exId: string) => {
  return allExercisesList.filter((ex: IBodyPartsForWorkout) => ex.id === exId)[0];
};

export default function CreateWorkout(): React.ReactElement {
  const { workoutSettings, setWorkoutSession, setDialogProps } = useContext(SportAppContext);
  const navigate = useNavigate();
  const [url, setUrl] = useState<string>("");
  const updateState = (stateName: WorkoutSessionFields, stateVal: number): void => {
    workoutSettings?.updateWorkoutSessionValue(stateName, stateVal);
    setWorkoutSession(workoutSettings?.getWorkoutSessionValue()!);
  }

  console.log(workoutSettings, "  workoutSettings");

  // const handleChangeTypeOfWorkoutForTheRound = (exerciseNum: number, value: string) => {
  //   let exercises = [...workoutSettings.generated_body_parts_list];
  //   exercises[exerciseNum] = value;
  //
  //   setWorkoutSettings((state: IWorkoutType) => ({
  //     ...state,
  //     generated_body_parts_list: exercises
  //   }))
  // };
  //
  // const handleChangeExerciseForRound = (round: number, exerciseNum: number, value: string) => {
  //   const allExercises = workoutSettings.all_exercises_for_generated_list;
  //
  //   // workoutTypes find this exercise
  //   allExercises[round].exercises[exerciseNum] = getWorkoutExercise(value);
  //   setWorkoutSettings((state: IWorkoutType) => ({
  //     ...state,
  //     all_exercises_for_generated_list: allExercises
  //   }))
  // };

  // const handleRandomChangeExerciseForRound = (round: number, exerciseNum: number) => {
  //   const allExercises = workoutSettings.all_exercises_for_generated_list;
  //   const thisRoundObj = allExercises[round];
  //   const thisExercise = thisRoundObj.exercises[exerciseNum];
  //   const allExercisesOfThisType = workoutTypes[thisExercise.id.includes("cardio") ? BodyParts.cardio : thisRoundObj.bodyPartName];
  //   let randomExercise: IBodyPartsForWorkout = allExercisesOfThisType[getRandomInt(0, allExercisesOfThisType.length - 1)];
  //
  //   handleChangeExerciseForRound(round, exerciseNum, randomExercise.id);
  // };

  return (
    <Box p={10}>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5" gutterBottom component="div">
                Hello, let us create your perfect workout!!!
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={1}>
                <Grid item>
                  <Button variant="contained" color="secondary" onClick={() => {
                    workoutSettings?.generateWorkoutSession();
                    setWorkoutSession(workoutSettings?.getWorkoutSessionValue()!);
                    // const { generated_body_parts_list = [] } = workoutSettings;
                    // const bodyPartsForAllRounds = generated_body_parts_list.length ? generated_body_parts_list : generateListOfBodyPartsForAllRounds(workoutSettings);
                    // const newWorkoutSettings: IWorkoutGeneratedExercisesList[] = createRandomExercisesForAllRounds(bodyPartsForAllRounds, workoutSettings);
                    //
                    // setWorkoutSettings((state: IWorkoutType) => ({
                    //   ...state,
                    //   generated_body_parts_list: bodyPartsForAllRounds,
                    //   all_exercises_for_generated_list: newWorkoutSettings
                    // }));
                  }}>
                    Create a workout!
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    // disabled={!workoutSettings.generated_body_parts_list.length && !workoutSettings.all_exercises_for_generated_list?.length}
                    onClick={() => {
                      // setDialogProps({
                      //   open: true,
                      //   title: "Workout preview",
                      //   content: (
                      //     <Grid container spacing={2} direction="column">
                      //       <Grid item xs={12}>
                      //         {/*<WorkoutPreview*/}
                      //         {/*  handleChangeExerciseForRound={handleChangeExerciseForRound}*/}
                      //         {/*  handleRandomChangeExerciseForRound={handleRandomChangeExerciseForRound}*/}
                      //         {/*/>*/}
                      //       </Grid>
                      //     </Grid>
                      //   ),
                      //   actionConfirmCb: () => {
                      //     setCurrentWorkoutSession((state: IWorkoutSession) => ({
                      //       ...state,
                      //       inProgress: true,
                      //       round: 1,
                      //       exercise: 1,
                      //       url
                      //     }));
                      //     navigate("workout");
                      //   }
                      // });
                    }}
                  >
                    Click Here to start!
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box mt={2}></Box>
          <Grid container spacing={2} direction={"column"}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <WorkoutForm updateState={updateState} />
                <Grid item xs={6}>
                  <Grid container spacing={2} direction="column">
                    {workoutSettings?.workoutSession?.roundsBodyParts?.map((bodyPartName: string, index: number) => {
                      // const allExercises = workoutSettings.all_exercises_for_generated_list || [];

                      return (
                        <Grid key={`${bodyPartName}-${index}`} item xs={12}>
                          <Grid container spacing={1} alignItems={"center"} justifyContent={"center"}>
                            <Grid item xs={12} key={`${bodyPartName}-round-${index}`}>
                              <FormControl fullWidth>
                                <FormLabel component="legend" id={`workout_parts-${index}`}>R: {index + 1}</FormLabel>
                                <Select
                                  id={`workout_parts-${index}`}
                                  value={bodyPartName}
                                  // onChange={(e: ChangeEvent, { props: { value } }: { props: { value: string }}) => {
                                  //   handleChangeTypeOfWorkoutForTheRound(index, value)
                                  // }}
                                >
                                  {workoutSettings?.workoutBuilder.bodyPartsList.map((bodyPartsNameInside: TValues<typeof BodyParts>) => (
                                    <MenuItem key={bodyPartsNameInside} value={bodyPartsNameInside}>{
                                      workoutSettings?.workoutBuilder.getLabelForBodyList(bodyPartName)
                                    }</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                      )
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}