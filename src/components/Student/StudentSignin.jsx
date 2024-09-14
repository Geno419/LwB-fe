import { Link, useNavigate } from "react-router-dom";
import "../../../css/signupStyling.css";
import { useContext, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import { studentSignin } from "../../../api";

function StudentSignin() {
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [sUsernameLogin, setSUsernameLogin] = useState("");
  const [sPasswordLogin, setSPasswordLogin] = useState("");
  const [error, setError] = useState();
  const [response, setResponse] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(null);

  function handleUsername(event) {
    setSUsernameLogin(event.target.value);
  }
  function handlePassword(event) {
    setSPasswordLogin(event.target.value);
  }

  function studentLogin(event) {
    event.preventDefault();
    setIsLoading(true);
    const details = {
      userName: sUsernameLogin,
      userPassword: sPasswordLogin,
    };

    studentSignin(details)
      .then((response) => {
        const user = {
          _id: response._id,
          firstName: response.firstName,
          lastName: response.lastName,
          userName: response.userName,
          userAvatarImg: response.userAvatarImg,
        };
        setLoggedInUser(user);
        setResponse(`You are now logged in as ${response.userName}`);
        setSuccess(true);
        setIsLoading(false);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .then(() => {
        setSUsernameLogin("");
        setSPasswordLogin("");
        navigate("/student/home");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });
  }

  return (
    <>
      <h1 className="companyName homePageCompanyName companyNameForms">
        Learning without Borders
      </h1>
      <div className="authenFormWrapper signInFormwrapper">
        <h2 className="formName">Welcome! Sign In</h2>
        <form
          className="registrationForm signInFormClass"
          onSubmit={studentLogin}
        >
          <label htmlFor="userName"></label>
          <input
            className="inputFields"
            type="text"
            placeholder="Username"
            id="userName"
            onChange={handleUsername}
            value={sUsernameLogin}
            required
          />
          <label htmlFor="password"></label>
          <input
            className="inputFields"
            placeholder="Password"
            type="password"
            id="password"
            onChange={handlePassword}
            value={sPasswordLogin}
            required
          />
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>{error ? <p>{error}</p> : <p>{response}</p>}</>
          )}

          <button disabled={success} className="joinBtn">
            Login
          </button>

          <Link className="linkDontHaveAccount" to="/student/signup">
            Don't have an account? Sign Up!
          </Link>
        </form>
        <div hidden={!success}>
          <Link to="/student/home" className="home-button">
            <button className="homeBtn">Home</button>
          </Link>
        </div>
      </div>
      <p className="notice">Username: msmith & Password: smith </p>
      <p className="notice">
        Please allow up to 3 minutes for the database to initialize on first
        use.
      </p>
    </>
  );
}

export default StudentSignin;
