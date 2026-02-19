import { useState } from "react";

function validateName(name) {
  if (!name.trim()) return "Name is required.";
  if (name.trim().length < 2) return "Name must be at least 2 characters.";
  return "";
}

function validateEmail(email) {
  if (!email.trim()) return "Email is required.";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.trim())) return "Email format is invalid.";
  return "";
}

function validateAge(age) {
  if (age === "" || age === null) return "Age is required.";
  const numberAge = Number(age);
  if (Number.isNaN(numberAge)) return "Age must be a number.";
  if (numberAge < 18) return "You must be 18 or older.";
  return "";
}

function RegistrationForm() {
  // Controlled components: input value comes from state, and onChange updates state.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // React synthetic event: prevent page reload on submit

    const nErr = validateName(name);
    const eErr = validateEmail(email);
    const aErr = validateAge(age);

    setNameError(nErr);
    setEmailError(eErr);
    setAgeError(aErr);

    if (nErr || eErr || aErr) {
      setSuccess(false);
      return;
    }

    setSuccess(true);

    // clear fields after success
    setName("");
    setEmail("");
    setAge("");
    setNameError("");
    setEmailError("");
    setAgeError("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h2>Registration</h2>

      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            const value = e.target.value;
            setName(value);
            setNameError(validateName(value));
            setSuccess(false);
          }}
        />
        {nameError && <p style={{ color: "red" }}>{nameError}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);
            setEmailError(validateEmail(value));
            setSuccess(false);
          }}
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
      </div>

      <div>
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => {
            const value = e.target.value;
            setAge(value);
            setAgeError(validateAge(value));
            setSuccess(false);
          }}
        />
        {ageError && <p style={{ color: "red" }}>{ageError}</p>}
      </div>

      <button type="submit">Submit</button>

      {success && (
        <p style={{ color: "green" }}>Registration successful!</p>
      )}
    </form>
  );
}

export default RegistrationForm;
