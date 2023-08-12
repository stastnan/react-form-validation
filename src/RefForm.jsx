import { useState, useRef } from "react";
import "./styles.css";

export default function RefForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [isAfterFirstSubmit, setIsAfterFirstSubmit] = useState(false);

  function checkEmail(email) {
    const errors = [];
    if (!email.length === 0) {
      errors.push("Must have at least 10 characters");
    }
    if (!email.endsWith("@seznam.cz")) {
      errors.push("Must end with @seznam.cz");
    }
    return errors;
  }

  function checkPassword(password) {
    const errors = [];
    if (!password.length > 10) {
      errors.push("Required");
    }
    if (!password.match(/[a-z]/)) {
      errors.push("Must include at least one lowercase letter");
    }

    if (!password.match(/[A-Z]/)) {
      errors.push("Must include at least one uppercase letter");
    }

    if (!password.match(/[0-9]/)) {
      errors.push("Must include at least one digit");
    }
    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsAfterFirstSubmit(true);

    const emailValidationResults = checkEmail(emailRef.current.value);
    const passwordValidationResults = checkPassword(passwordRef.current.value);

    setEmailErrors(emailValidationResults);
    setPasswordErrors(passwordValidationResults);

    if (
      emailValidationResults.length === 0 &&
      passwordValidationResults.length === 0
    ) {
      alert("Success");
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className={`form-group ${emailErrors.length > 0 ? "error" : ""}`}>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="email"
          required
          ref={emailRef}
          onChange={(e) =>
            isAfterFirstSubmit && setEmailErrors(checkEmail(e.target.value))
          }
        />
        {emailErrors.length > 0 && (
          <div className="msg">{emailErrors.join(", ")}</div>
        )}
      </div>
      <div className={`form-group ${passwordErrors.length > 0 ? "error" : ""}`}>
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          id="password"
          required
          ref={passwordRef}
          onChange={(e) =>
            isAfterFirstSubmit &&
            setPasswordErrors(checkPassword(e.target.value))
          }
        />

        {passwordErrors.length > 0 && (
          <div className="msg">{passwordErrors.join(", ")}</div>
        )}
      </div>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
}
