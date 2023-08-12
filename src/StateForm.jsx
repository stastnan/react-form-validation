import { useState } from "react";
import "./styles.css";

export default function StateForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAfterFirstSubmit, setIsAfterFirstSubmit] = useState(false);

  const emailErrors = isAfterFirstSubmit ? checkEmail(email) : [];
  const passwordErrors = isAfterFirstSubmit ? checkPassword(password) : [];

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

    const emailValidationResults = checkEmail(email);
    const passwordValidationResults = checkPassword(password);

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
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          type="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
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
