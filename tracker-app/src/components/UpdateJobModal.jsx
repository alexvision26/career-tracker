import React, { useEffect, useState } from "react";
import reactCSS from "reactcss";
import {
  AssignmentInd as AssignmentIndIcon,
  BubbleChart as BubbleChartIcon,
  SettingsInputAntenna as SettingsInputAntennaIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Cancel as CancelIcon,
  SupervisedUserCircle as SupervisedUserCircleIcon,
} from "@material-ui/icons";
import {
  Select,
  InputLabel,
  FormControl,
  Grid,
  TextField,
  Modal,
  Button,
  Container,
} from "@material-ui/core";
import { modalStyles } from "../styles/modalStyles";
import { useDispatch, useSelector } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";

function UpdateJobModal(props) {
  const classes = modalStyles();
  const dispatch = useDispatch();
  const {
    updateJobModal,
    setUpdateJobModal,
    currEdit,
    handleDeleteJob,
  } = props;

  let jobToUpdate = useSelector((state) => {
    return state.job_board.filter((j) => {
      return j._id === currEdit;
    });
  });
  jobToUpdate = jobToUpdate[0];

  const [updateJob, setUpdateJob] = useState(jobToUpdate);

  useEffect(() => {
    setUpdateJob(jobToUpdate);
  }, [updateJobModal]);

  const handleClose = () => {
    setUpdateJobModal(false);
  };

  const renderIcon = () => {
    switch (jobToUpdate.status) {
      case "Interested":
        return <BubbleChartIcon className={classes.updateIcon} />;
      case "Applied":
        return <AssignmentIndIcon className={classes.updateIcon} />;
      case "Reached out":
        return <SettingsInputAntennaIcon className={classes.updateIcon} />;
      case "Interview":
        return <SupervisedUserCircleIcon className={classes.updateIcon} />;
      case "Offer":
        return <AssignmentTurnedInIcon className={classes.updateIcon} />;
      case "Not moving forward":
        return <CancelIcon className={classes.updateIcon} />;
    }
  };

  const handleInput = (e) => {
    setUpdateJob({
      ...updateJob,
      [e.target.name]: e.target.value,
      updated: Date.now,
    });
  };

  const handleUpdate = () => {
    axiosWithAuth()
      .put(`jobs/${localStorage.getItem("user")}`, updateJob)
      .then((res) => {
        axiosWithAuth()
          .get(`jobs/${localStorage.getItem("user")}`)
          .then((result) => {
            dispatch({ type: "UPDATE_JOB", payload: result.data.jobs });
          })
          .catch((err) => {
            console.log(err);
          });
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const body = (
    <div className={classes.paper}>
      {jobToUpdate && (
        <>
          <div
            className={classes.updateHeader}
            style={{
              backgroundColor: `rgba(${jobToUpdate.color.r}, ${jobToUpdate.color.g}, ${jobToUpdate.color.b}, ${jobToUpdate.color.a})`,
            }}
          >
            <div className={classes.updateTitleContainer}>
              {renderIcon()}
              <div>
                <h2 className={classes.updateTitle}>{jobToUpdate.jobTitle}</h2>
                <h2 className={classes.updateSub}>{jobToUpdate.company}</h2>
              </div>
            </div>
          </div>
          <Container component="main" maxWidth="lg">
            <Grid
              container
              style={{
                backgroundColor: `rgba(${jobToUpdate.color.r}, ${jobToUpdate.color.g}, ${jobToUpdate.color.b}, ${jobToUpdate.color.a})`,
              }}
            ></Grid>
            <form className={classes.form} id="add-job-form" noValidate>
              <Grid
                spacing={12}
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
              >
                <TextField
                  className={classes.field}
                  autoComplete="title"
                  disabled
                  name="jobTitle"
                  variant="outlined"
                  label="Job Title"
                  defaultValue={jobToUpdate.jobTitle}
                  required
                  fullWidth
                  id="jobTitle"
                  label="Job Title"
                  //   onChange={handleInput}
                />

                <TextField
                  className={classes.field}
                  autoComplete="company"
                  name="company"
                  disabled
                  variant="outlined"
                  defaultValue={jobToUpdate.company}
                  required
                  fullWidth
                  id="company"
                  label="Company"
                  //   onChange={handleInput}
                />

                <TextField
                  className={classes.field}
                  autoComplete="location"
                  name="location"
                  variant="outlined"
                  defaultValue={jobToUpdate.location}
                  required
                  id="location"
                  label="Location"
                  onChange={handleInput}
                />

                <TextField
                  className={classes.field}
                  autoComplete="url"
                  name="postUrl"
                  variant="outlined"
                  defaultValue={jobToUpdate.postUrl}
                  id="postUrl"
                  label="Post URL"
                  onChange={handleInput}
                />

                <TextField
                  className={classes.field}
                  autoComplete="discovered"
                  name="discovered"
                  variant="outlined"
                  defaultValue={jobToUpdate.discovered}
                  id="discovered"
                  label="Where did you find this job?"
                  onChange={handleInput}
                />

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel required htmlFor="outlined-status-native-simple">
                    Status
                  </InputLabel>
                  <Select
                    native
                    required
                    name="status"
                    defaultValue={jobToUpdate.status}
                    onChange={handleInput}
                    label="Status"
                    inputProps={{
                      name: "status",
                      id: "outlined-status-native-simple",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value="Interested">Interested</option>
                    <option value="Applied">Applied</option>
                    <option value="Reached out">Reached out</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Not moving forward">
                      Not moving forward
                    </option>
                  </Select>
                </FormControl>
              </Grid>

              <TextField
                className={classes.desc}
                autoComplete="description"
                name="desc"
                variant="outlined"
                required
                multiline
                value={jobToUpdate.desc}
                rows={8}
                rowsMax={10}
                fullWidth
                id="description"
                label="Description"
                onChange={handleInput}
              />

              <Grid className={classes.buttonsUpdate}>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleDeleteJob(jobToUpdate._id);
                    handleClose();
                  }}
                  className={classes.deleteButton}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  className={classes.cancelButton}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  onClick={handleUpdate}
                  className={classes.jobButton}
                >
                  Update Job
                </Button>
              </Grid>
            </form>
          </Container>
        </>
      )}
    </div>
  );

  return (
    <>
      <div>
        {jobToUpdate && (
          <Modal
            disableBackdropClick
            open={updateJobModal}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        )}
      </div>
    </>
  );
}

export default UpdateJobModal;
