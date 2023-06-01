export function LoginValidation(values) {
  let error = {};

  const email_pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!values.email) {
    error.email = "Email is empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email is not match";
  } else {
    error.email = "";
  }

  if (!values.password) {
    error.password = "Password is empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Password not match";
  } else {
    error.password = "";
  }

  return error;
}

export function SingupValidation(values) {
  let error = {};

  const email_pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!values.name) {
    error.name = "Name is empty";
  } else {
    error.name = "";
  }

  if (!values.email) {
    error.email = "Email is empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email is not match";
  } else {
    error.email = "";
  }

  if (!values.password) {
    error.password = "Password is empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Password not match";
  } else {
    error.password = "";
  }

  return error;
}
