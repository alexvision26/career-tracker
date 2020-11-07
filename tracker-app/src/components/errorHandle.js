// const errorCheck = () => {
//     console.log("Checking for errors...");
//     let formError = false;
//     let errMessage = {};
//     let check1 = signup.email.match(/@/g);
//     let check2 = signup.email.match(/\./g);
//     if ((!check1 && !check2) || signup.email.length < 3) {
//       console.log("email error");
//       formError = true;
//       errMessage.email = "Invalid email address.";
//     }
//     if (signup.fname === "") {
//       console.log("first name error");
//       formError = true;
//       errMessage.fname = "Missing first name.";
//     } else if (signup.fname.length > 1) {
//       delete errMessage.fname;
//     }

//     if (signup.lname === "") {
//       console.log("last name error");
//       formError = true;
//       errMessage.lname = "Missing last name.";
//     }
//     if (signup.password.length < 7) {
//       console.log("password error");
//       formError = true;
//       errMessage.password = "Password must be at least 7 characters.";
//     }
//     if (!formError) {
//       console.log("Error fixed");
//       setSignup({
//         ...signup,
//         error: false,
//       });
//       setIsError({
//         error: false,
//         errorMessage: {},
//       });
//     } else if (formError) {
//       setIsError({
//         error: true,
//         errorMessage: errMessage,
//       });
//       setSignup({
//         ...signup,
//         error: false,
//       });
//     }
//   };

// export default function errorCheck() {
//     let f,
//         l,
//         e,
//         p,
//         err = false;

//         if (signup.fname === "") {
//         f = true;
//         } else {
//         f = false;
//         }

//         if (signup.lname === "") {
//         l = true;
//         } else {
//         l = false;
//         }

//         if (signup.email === "") {
//         e = true;
//         } else {
//         e = false;
//         }

//         if (signup.password === "") {
//         p = true;
//         } else {
//         p = false;
//         }

//         if (f && l && e && p === true) {
//         err = true;
//         } else {
//         err = false;
//         }

//         return {f: f, l: l, e: e, p: p}
// }