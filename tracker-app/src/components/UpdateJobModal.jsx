import React from "react";
import { useState } from "react";
import Container from "@material-ui/core/Container";
import { SketchPicker } from "react-color";
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
} from "@material-ui/core";
import { modalStyles } from "../styles/modalStyles";
import { useSelector } from "react-redux";

function UpdateJobModal(props) {
  const classes = modalStyles();
  const [updateJob, setUpdateJob] = useState({});
  const [showColorPicker, setShowColorPicker] = useState(false);

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

  //   const handleColorClick = () => {
  //     setShowColorPicker(!showColorPicker);
  //   };

  //   const handleColorClose = () => {
  //     setShowColorPicker(false);
  //   };

  //   const handleColorChange = (color) => {
  //     setCreateNewJob({
  //       ...createNewJob,
  //       color: color.rgb,
  //     });
  //   };

  //   const handleStatusChange = (event) => {
  //     setCreateNewJob({
  //       ...createNewJob,
  //       status: event.target.value,
  //     });
  //   };

  const styles = reactCSS({
    default: {
      color: {
        height: "35px",
        borderRadius: "2px",
        // background: `rgba(${jobToUpdate.color.r}, ${jobToUpdate.color.g}, ${jobToUpdate.color.b}, ${jobToUpdate.color.a})`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
        width: "39%",
        minWidth: "200px",
        margin: "1% 0 2%",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
      header: {
        // backgroundColor: `rgba(${jobToUpdate.color.r}, ${jobToUpdate.color.g}, ${jobToUpdate.color.b}, ${jobToUpdate.color.a})`,
        color: "white",
      },
      updateHeader: {
        width: "100%",
        minHeight: "20%",
        margin: 0,
        padding: "5%",
      },
    },
  });

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
            <form
              className={classes.form}
              //   onSubmit={handleSubmit}
              id="add-job-form"
              noValidate
            >
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
                  value={jobToUpdate.jobTitle}
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
                  value={jobToUpdate.company}
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
                  value={jobToUpdate.location}
                  required
                  id="location"
                  label="Location"
                  //   onChange={handleInput}
                />

                <TextField
                  className={classes.field}
                  autoComplete="url"
                  name="postUrl"
                  variant="outlined"
                  value={jobToUpdate.postUrl}
                  id="postUrl"
                  label="Post URL"
                  //   onChange={handleInput}
                />

                <TextField
                  className={classes.field}
                  autoComplete="discovered"
                  name="discovered"
                  variant="outlined"
                  value={jobToUpdate.discovered}
                  id="discovered"
                  label="Where did you find this job?"
                  //   onChange={handleInput}
                />

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel required htmlFor="outlined-status-native-simple">
                    Status
                  </InputLabel>
                  <Select
                    native
                    required
                    // onChange={handleInput}
                    // name="status"
                    value={jobToUpdate.status}
                    // onChange={handleStatusChange}
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

              {/* <div style={styles.swatch} onClick={handleColorClick}>
            <div style={styles.color} />
          </div>
          {showColorPicker ? (
            <div style={styles.popover}>
              <div style={styles.cover} onClick={handleColorClose} />
              <SketchPicker
                color={createNewJob.color}
                onChange={handleColorChange}
              />
            </div>
          ) : null} */}

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
                // onChange={handleInput}
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
                  //   onClick={handleCreate}
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
