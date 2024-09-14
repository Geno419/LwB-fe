import { Link, useNavigate } from "react-router-dom";
import "../../../css/signupStyling.css";
import { useContext, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import { teacherSignin } from "../../../api";

function TeacherSignin() {
  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [tUsernameLogin, setTUsernameLogin] = useState("");
  const [tPasswordLogin, setTPasswordLogin] = useState("");
  const [error, setError] = useState();
  const [response, setResponse] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(null);

  function handleUsername(event) {
    setTUsernameLogin(event.target.value);
  }
  function handlePassword(event) {
    setTPasswordLogin(event.target.value);
  }

  function teacherLogin(event) {
    event.preventDefault();
    setIsLoading(true);
    const details = {
      userName: tUsernameLogin,
      userPassword: tPasswordLogin,
    };

    teacherSignin(details)
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
        setTUsernameLogin("");
        setTPasswordLogin("");
        navigate("/teacher/home");
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
          onSubmit={teacherLogin}
        >
          <label htmlFor="userName"></label>
          <input
            className="inputFields"
            type="text"
            placeholder="Username"
            id="userName"
            onChange={handleUsername}
            value={tUsernameLogin}
            required
          />
          <label htmlFor="password"></label>
          <input
            className="inputFields"
            placeholder="Password"
            type="password"
            id="password"
            onChange={handlePassword}
            value={tPasswordLogin}
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
          <Link className="linkDontHaveAccount" to="/teacher/signup">
            Don't have an account? Sign Up!
          </Link>
          <div className="notice">
            <p>Username: kfields & Password: fields </p>
            <p>
              Please allow up to 3 minutes for the database to initialize on
              first use.
            </p>
          </div>
        </form>
        <div hidden={!success}>
          <Link to="/teacher/home" className="home-button">
            <button className="homeBtn">Home</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default TeacherSignin;
