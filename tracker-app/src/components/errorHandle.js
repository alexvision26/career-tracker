// REGISTRATION FORM ERROR HANDLING FUNCTION

export function registerErrorCheck(cred) {
    let f,
      l,
      e,
      p,
      err = false;
    // let msg = {};

    if (cred.user.fname === "") {
      f = true;
    } else {
      f = false;
    }

    if (cred.user.lname === "") {
      l = true;
    } else {
      l = false;
    }

    if (cred.user.email === "") {
      e = true;
    } else {
      let c1 = cred.user.email.match(/@/g);
      let c2 = cred.user.email.match(/\./g);
      if (!c1 || !c2) {
        e = true;
      } else {
        e = false;
      }
    }

    if (cred.user.password.length < 7) {
      p = true;
    } else {
      p = false;
    }

    if (f || l || e || p) {
      err = true;
    } else {
      err = false;
    }

    cred.errMsg({
      f: f,
      l: l,
      e: e,
      p: p,
      err: err,
      msg: {},
    });
  }

  // LOGIN FORM ERROR HANDLING FUNCTION

  export function loginErrorCheck(cred) {
    let e,
    p,
    err = false;

  if (cred.user.email === "") {
    e = true;
  } else {
    let c1 = cred.user.email.match(/@/g);
    let c2 = cred.user.email.match(/\./g);
    if (!c1 || !c2) {
      e = true;
    } else {
      e = false;
    }
  }

  if (cred.user.password.length < 7) {
    p = true;
  } else {
    p = false;
  }

  if (e || p) {
    err = true;
  } else {
    err = false;
  }

  cred.errMsg({
    e: e,
    p: p,
    err: err,
    msg: {}
  });
  }