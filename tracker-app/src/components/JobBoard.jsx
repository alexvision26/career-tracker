import React, { useEffect, useState } from "react";
import { Card, Grid, makeStyles } from "@material-ui/core";
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
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { v4 as uuid } from "uuid";

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
    position: "relative",
    margin: "6% auto",
    color: "white",
    boxShadow: "3px 3px 10px 0px rgba(0,0,0,0.22)",
    // padding: ".5%",
    width: "85%",
    height: "auto",
    minHeight: "80px",
    transition: ".05s ease-in-out",
    "&:hover": {
      opacity: ".9",
      cursor: "pointer",
    },
  },
  cardTitle: {
    textTransform: "capitalize",
    // width: "100%",
    fontSize: "1rem",
    // padding: "0",
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "1.5%",
    margin: "4% 2% 12% 2%",
  },
  cardIcon: {
    width: 35,
    height: 35,
    padding: "0 2% 0 2.5%",
  },
  cardTitleCont: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    textTransform: "capitalize",
    // padding: "3% 2% 4% 2%",
    margin: 0,
  },
  date: {
    textAlign: "right",
    bottom: 0,
    right: 20,
    fontSize: ".6rem",
    width: "90%",
    position: "absolute",
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

  function formatDate(d, action) {
    var date = new Date(d);
    let month = date.toLocaleString("default", { month: "short" });
    let newDate = `${action} ${month} ${date.getDate().toString()}`;
    // Need to send a new date object when updated!!!
    return <p className={classes.date}>{newDate}</p>;
  }

  const reloadJobBoard = () => {
    axiosWithAuth()
      .get(`jobs/${userId}`)
      .then((res) => {
        console.log(res.data.jobs);
        dispatch({ type: "GET_JOBS", payload: res.data.jobs });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteJob = (jobId) => {
    axiosWithAuth()
      .delete(`jobs/${userId}/job`, { data: { _id: jobId } })
      .then((res) => {
        dispatch({ type: "DELETE_JOB", payload: jobId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    reloadJobBoard();
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
              key={job._id}
              className={classes.cardContainer}
              onClick={() => {
                handleUpdateOpen(job._id);
              }}
              style={{
                backgroundColor:
                  job.status !== "Not moving forward"
                    ? `rgba(${job.color.r}, ${job.color.g}, ${job.color.b}, ${job.color.a})`
                    : "darkgrey",
              }}
            >
              <div className={classes.cardContent} key={job._id}>
                {renderIcon()}
                <div className={classes.cardTitleCont} key={job._id}>
                  <h3 style={{ margin: 0 }} className={classes.cardTitle}>
                    {job.jobTitle}
                  </h3>
                  <p style={{ margin: 0, fontSize: ".9rem" }}>{job.company}</p>
                </div>
              </div>
              {formatDate(job.updated, cat)}
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
        handleDeleteJob={handleDeleteJob}
      />

      <div style={{ width: "100%" }}>
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
      </div>
    </>
  );
}

export default JobBoard;
