import React, { useEffect, useState } from "react";
import { Card, Container, Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import {
  AssignmentInd as AssignmentIndIcon,
  BubbleChart as BubbleChartIcon,
  SettingsInputAntenna as SettingsInputAntennaIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Cancel as CancelIcon,
  SupervisedUserCircle as SupervisedUserCircleIcon,
} from "@material-ui/icons";
import UpdateJobModal from "./UpdateJobModal";

const useStyles = makeStyles((theme) => ({
  boardContainer: {
    margin: "0 auto",
  },
  column: {},
  title: {
    textAlign: "center",
    fontSize: "1.8rem",
  },
  cardContainer: {
    borderRadius: "10px",
    margin: "7% auto",
    color: "white",
    boxShadow: "3px 3px 10px 0px rgba(0,0,0,0.10)",
    width: "80%",
    height: "auto",
    transition: ".05s ease-in-out",
    "&:hover": {
      opacity: ".9",
      cursor: "pointer",
    },
  },
  cardTitle: {
    textTransform: "capitalize",
    fontSize: "1.2rem",
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardIcon: {
    width: 35,
    height: 35,
    padding: "0 7%",
  },
}));

function JobBoard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [updateJobModal, setUpdateJobModal] = useState(false);
  const userId = localStorage.getItem("user");
  const getJobs = useSelector((state) => state.job_board);

  const [currEdit, setCurrEdit] = useState("");

  const handleUpdateOpen = (id) => {
    setCurrEdit(id);
    setUpdateJobModal(true);
  };

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
    const renderIcon = () => {
      switch (cat) {
        case "Interested":
          return <BubbleChartIcon className={classes.cardIcon} />;
        case "Applied":
          return <AssignmentIndIcon className={classes.cardIcon} />;
        case "Reached out":
          return <SettingsInputAntennaIcon className={classes.cardIcon} />;
        case "Interview":
          return <SupervisedUserCircleIcon className={classes.cardIcon} />;
        case "Offer":
          return <AssignmentTurnedInIcon className={classes.cardIcon} />;
        case "Not moving forward":
          return <CancelIcon className={classes.cardIcon} />;
      }
    };
    return jobs
      .filter((j) => {
        return j.status === cat;
      })
      .map((job, i) => {
        return (
          <>
            <Card
              className={classes.cardContainer}
              onClick={() => {
                handleUpdateOpen(job._id);
              }}
              style={{
                backgroundColor: `rgba(${job.color.r}, ${job.color.g}, ${job.color.b}, ${job.color.a} )`,
              }}
            >
              <div className={classes.cardContent}>
                {renderIcon()}
                <div>
                  <h3 className={classes.cardTitle}>{job.jobTitle}</h3>
                  <p>{job.company}</p>
                </div>
              </div>
            </Card>
          </>
        );
      });
  };

  return (
    <>
      <UpdateJobModal
        updateJobModal={updateJobModal}
        setUpdateJobModal={setUpdateJobModal}
        currEdit={currEdit}
      />

      <Container maxWidth>
        <Grid
          container
          justify="space-evenly"
          className={classes.boardContainer}
        >
          <Grid item xs={2} className={classes.column}>
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
