import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
// import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    padding: 0,
    boxShadow: theme.shadows[5],
    margin: "auto",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: 1100,
    minWidth: "40%",
  },
  content: {
    padding: theme.spacing(2, 4, 3),
  },
  header: {
    width: "100%",
    height: "auto",
    backgroundColor: "white",
    margin: 0,
    padding: 0,
    boxShadow: "1px 1px 6px rgba(0, 0, 0, 0.151)",
  },
  title: {
    padding: 25,
    margin: 0,
    fontSize: "2rem",
  },
  form: {
    display: "flex",
    flexFlow: "row wrap",
    flexGrow: 0.5,
    padding: "3%",
    width: "100%",
  },
}));

function CreateJob(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const { newJob, setNewJob } = props;

  const handleClose = () => {
    setNewJob(false);
  };

  const body = (
    <div className={classes.paper}>
      <div className={classes.header}>
        <h2 className={classes.title}>Create new job</h2>
      </div>

      <Container
        component="main"
        maxWidth="lg"
        // style={{ border: "1px solid black" }}
      >
        <form
          className={classes.form}
          //   onSubmit={handleSubmit}
          id="add-job-form"
          noValidate
        >
          <TextField
            autoComplete="title"
            name="title"
            variant="outlined"
            label="Job Title"
            required
            // fullWidth
            id="title"
            label="Job Title"
          />

          <TextField
            autoComplete="company"
            name="company"
            variant="outlined"
            required
            // fullWidth
            id="company"
            label="Company"
          />

          <TextField
            autoComplete="location"
            name="location"
            variant="outlined"
            required
            // fullWidth
            id="location"
            label="Location"
          />
        </form>
      </Container>
    </div>
  );
  return (
    <>
      <div>
        <Modal
          open={newJob}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
    </>
  );
}

export default CreateJob;
