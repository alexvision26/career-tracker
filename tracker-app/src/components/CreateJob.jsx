import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
// import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { SketchPicker } from "react-color";
import reactCSS, { hover } from "reactcss";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

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
    padding: "2%",
    margin: "2% auto",
    width: "85%",
  },
  field: {
    width: "50%",
    margin: "2% 0 1%",
    // height: "25px",
  },
  desc: {
    width: "100%",
    margin: "2% 0 3%",
  },
  formControl: {
    width: "30%",
    margin: "2% 0 3%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  jobButton: {
    color: "white",
    backgroundColor: "#7000ff",
    width: "125px",
    "&:hover": {
      backgroundColor: "#9644ff",
    },
  },
  cancelButton: {
    color: "#555555",
    backgroundColor: "#cfcfcf",
    width: "125px",
    marginRight: 20,
    "&:hover": {
      backgroundColor: "#e2e2e2",
    },
  },
  buttons: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: "3%",
  },
}));

function CreateJob(props) {
  const [jobColor, setJobColor] = useState({
    color: {
      r: "112",
      g: "0",
      b: "255",
      a: "1",
    },
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [jobStatus, setJobStatus] = useState("");
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const { newJob, setNewJob } = props;

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
    setJobColor({
      color: color.rgb,
    });
  };

  const handleStatusChange = (event) => {
    setJobStatus(event.target.value);
  };

  const styles = reactCSS({
    default: {
      color: {
        height: "35px",
        borderRadius: "2px",
        background: `rgba(${jobColor.color.r}, ${jobColor.color.g}, ${jobColor.color.b}, ${jobColor.color.a})`,
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
        backgroundColor: `rgba(${jobColor.color.r}, ${jobColor.color.g}, ${jobColor.color.b}, ${jobColor.color.a})`,
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
              name="title"
              variant="outlined"
              label="Job Title"
              required
              fullWidth
              id="title"
              label="Job Title"
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
            />

            <TextField
              className={classes.field}
              autoComplete="location"
              name="location"
              variant="outlined"
              required
              // fullWidth
              id="location"
              label="Location"
            />

            <TextField
              className={classes.field}
              autoComplete="url"
              name="url"
              variant="outlined"
              // required
              // fullWidth
              id="url"
              label="Post URL"
            />

            <TextField
              className={classes.field}
              autoComplete="discovered"
              name="discovered"
              variant="outlined"
              // fullWidth
              id="discovered"
              label="Where did you find this job?"
            />

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel required htmlFor="outlined-status-native-simple">
                Status
              </InputLabel>
              <Select
                native
                required
                value={jobStatus}
                onChange={handleStatusChange}
                label="Status"
                inputProps={{
                  name: "status",
                  id: "outlined-status-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>Interested</option>
                <option value={20}>Applied</option>
                <option value={30}>Reached out</option>
                <option value={40}>Interview</option>
                <option value={50}>Offer</option>
                <option value={60}>Not moving forward</option>
              </Select>
            </FormControl>
          </Grid>

          <div style={styles.swatch} onClick={handleColorClick}>
            {/* <p>Set Job Card Color:</p> */}
            <div style={styles.color} />
          </div>
          {showColorPicker ? (
            <div style={styles.popover}>
              <div style={styles.cover} onClick={handleColorClose} />
              <SketchPicker
                color={jobColor.color}
                onChange={handleColorChange}
              />
            </div>
          ) : null}

          <TextField
            className={classes.desc}
            autoComplete="description"
            name="description"
            variant="outlined"
            required
            multiline
            rows={8}
            rowsMax={12}
            fullWidth
            id="description"
            label="Description"
          />

          <Grid className={classes.buttons}>
            <Button
              variant="contained"
              onClick={handleClose}
              className={classes.cancelButton}
            >
              Cancel
            </Button>

            <Button variant="contained" className={classes.jobButton}>
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
