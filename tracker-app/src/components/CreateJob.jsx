import React, { useState } from "react";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";
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
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { modalStyles } from "../styles/modalStyles";
import { useDispatch } from "react-redux";

function CreateJob(props) {
  const dispatch = useDispatch();
  const [createNewJob, setCreateNewJob] = useState({
    authorId: localStorage.getItem("user"),
    jobTitle: "",
    company: "",
    desc: "",
    location: "",
    postUrl: "",
    status: "",
    color: {
      r: "112",
      g: "0",
      b: "255",
      a: "1",
    },
  });
  const [isError, setIsError] = useState({
    error: false,
    msg: {},
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const classes = modalStyles();
  const { newJob, setNewJob } = props;

  const handleInput = (info) => {
    setCreateNewJob({
      ...createNewJob,
      [info.target.name]: info.target.value,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();

    console.log(createNewJob);

    axiosWithAuth()
      .post("/jobs", createNewJob)
      .then((res) => {
        console.log(res.data.job);
        dispatch({ type: "CREATE_JOB", payload: res.data.job });
      })
      .catch((err) => {
        console.log(err);
      });
    setNewJob(false);
  };

  const handleClose = () => {
    setNewJob(false);
  };

  const handleColorClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleColorClose = () => {
    setShowColorPicker(false);
  };

  const handleColorChange = (color) => {
    setCreateNewJob({
      ...createNewJob,
      color: color.rgb,
    });
  };

  const styles = reactCSS({
    default: {
      color: {
        height: "35px",
        borderRadius: "2px",
        background: `rgba(${createNewJob.color.r}, ${createNewJob.color.g}, ${createNewJob.color.b}, ${createNewJob.color.a})`,
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
        backgroundColor: `rgba(${createNewJob.color.r}, ${createNewJob.color.g}, ${createNewJob.color.b}, ${createNewJob.color.a})`,
        color: "white",
      },
    },
  });

  const body = (
    <div className={classes.paper}>
      <div style={styles.header}>
        <h2 className={classes.title}>Create new job</h2>
      </div>

      <Container component="main" maxWidth="lg">
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
              name="jobTitle"
              variant="outlined"
              label="Job Title"
              required
              fullWidth
              id="jobTitle"
              label="Job Title"
              onChange={handleInput}
            />

            <TextField
              className={classes.field}
              autoComplete="company"
              name="company"
              variant="outlined"
              required
              fullWidth
              id="company"
              label="Company"
              onChange={handleInput}
            />

            <TextField
              className={classes.field}
              autoComplete="location"
              name="location"
              variant="outlined"
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
              id="postUrl"
              label="Post URL"
              onChange={handleInput}
            />

            <TextField
              className={classes.field}
              autoComplete="discovered"
              name="discovered"
              variant="outlined"
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
                onChange={handleInput}
                name="status"
                value={createNewJob.status}
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
                <option value="Not moving forward">Not moving forward</option>
              </Select>
            </FormControl>
          </Grid>

          <div style={styles.swatch} onClick={handleColorClick}>
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
          ) : null}

          <TextField
            className={classes.desc}
            autoComplete="description"
            name="desc"
            variant="outlined"
            required
            multiline
            rows={8}
            rowsMax={12}
            fullWidth
            id="description"
            label="Description"
            onChange={handleInput}
          />

          <Grid className={classes.buttons}>
            <Button
              variant="contained"
              onClick={handleClose}
              className={classes.cancelButton}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleCreate}
              className={classes.jobButton}
            >
              Create Job
            </Button>
          </Grid>
        </form>
      </Container>
    </div>
  );
  return (
    <>
      <div>
        <Modal
          disableBackdropClick
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
