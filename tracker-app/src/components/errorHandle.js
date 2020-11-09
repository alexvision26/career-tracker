// import React from 'react';

// export default function registerErrorCheck(cred) {
//     const {user, errMsg} = cred
//     let f,
//       l,
//       e,
//       p,
//       err = false;
//     let msg = {};

//     if (user.signup.fname === "") {
//       f = true;
//     } else {
//       f = false;
//     }

//     if (user.signup.lname === "") {
//       l = true;
//     } else {
//       l = false;
//     }

//     if (user.signup.email === "") {
//       e = true;
//     } else {
//       let c1 = user.signup.email.match(/@/g);
//       let c2 = user.signup.email.match(/\./g);
//       if (!c1 || !c2) {
//         e = true;
//       } else {
//         e = false;
//       }
//     }

//     if (user.signup.password.length < 7) {
//       p = true;
//     } else {
//       p = false;
//     }

//     if (f || l || e || p) {
//       err = true;
//     } else {
//       err = false;
//     }

//     errMsg.setIsError({
//       f: f,
//       l: l,
//       e: e,
//       p: p,
//       err: err,
//       msg: {},
//     });
//   }