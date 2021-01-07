import { makeStyles } from "@material-ui/core/styles";

export const modalStyles = makeStyles((theme) => ({
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
      height: "auto",
      // minHeight:"60%",
      maxHeight: "90%",
      minWidth: "40%",
    },
    // ContentContainer: {
    //   display: "flex",
    //   alignItems: "center"
    // },
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
      width: "90%",
    },
    field: {
      width: "50%",
      margin: "2% 0 1%",
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
    deleteButton: {
        width: "125px",
        color: "grey",
        backgroundColor: "#e2e2e2",
        marginRight: "auto",
        // left: 0,
    },
    buttons: {
      position: "absolute",
      bottom: 0,
      right: 0,
      margin: "3%"
    },
    buttonsUpdate: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "flex-end",
        margin: "4% auto",
        // padding: "4% 0",
        width: "84%"
      },
    updateHeader: {
        maxHeight: "15%",
        padding: "3%"
    },
    updateTitle: {
        //   padding: 25,
          margin: 0,
          fontSize: "3rem",
          color: "white",
          textTransform: "capitalize",
          margin: "3% 0"
        },
        updateSub: {
            //   padding: 25,
              margin: 0,
              fontSize: "2.5rem",
              color: "white",
              textTransform: "capitalize",
              margin: "3% 0"
            },
    updateTitleContainer: {
        margin: "auto 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    updateIcon: {
        color: "white",
        width: 60,
        height: 60,
        padding: "0 7% 0 3%"
    },
    errorMain: {
      color: "red",
      fontSize: ".7rem",
      textAlign: "center",
      margin: "0",
      padding: "0",
      width: "100%",
      paddingTop: "25px",
    },
  }));