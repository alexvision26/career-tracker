import React from "react";

import { Container, Grid, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { getAllJobs } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  boardContainer: {
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
  },
}));

function JobBoard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("user");
  const getJobs = useSelector((state) => state.job_board);

  useEffect(() => {
    axiosWithAuth()
      .get(`jobs/${userId}`)
      .then((res) => {
        console.log(res.data.jobs);
        dispatch({ type: "GET_JOBS", payload: res.data.jobs });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const jobSorter = (jobs, cat) => {
    return jobs
      .filter((j) => {
        return j.status === cat;
      })
      .map((job, i) => {
        // console.log(job);
        return (
          <div key={i} style={{ border: "1px solid red" }}>
            <h3>{job.jobTitle}</h3>
            <p>{job.company}</p>
            <p>TEST</p>
          </div>
        );
      });
  };

  return (
    <>
      <Container maxWidth>
        <Grid
          container
          justify="space-evenly"
          className={classes.boardContainer}
        >
          <Grid item xs={2}>
            <h3 className={classes.title}>Interested</h3>
            {jobSorter(getJobs, "Interested")}
          </Grid>
          <Grid item xs={2}>
            <h3 className={classes.title}>Applied</h3>
            {jobSorter(getJobs, "Applied")}
          </Grid>
          <Grid item xs={2}>
            <h3 className={classes.title}>Reached out</h3>
            {jobSorter(getJobs, "Reached out")}
          </Grid>
          <Grid item xs={2}>
            <h3 className={classes.title}>Interview</h3>
            {jobSorter(getJobs, "Interview")}
          </Grid>
          <Grid item xs={2}>
            <h3 className={classes.title}>Offer</h3>
            {jobSorter(getJobs, "Offer")}
          </Grid>
          <Grid item xs={2}>
            <h3 className={classes.title}>Not moving forward</h3>
            {jobSorter(getJobs, "Not moving forward")}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default JobBoard;
