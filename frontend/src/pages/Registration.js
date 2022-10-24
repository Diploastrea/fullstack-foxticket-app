import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import validator from 'validator';
import Button from '@mui/material/Button';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import register from '../service/registerService';
import FormField from '../components/FormField';
import '../assets/css/Registration.css';

export default function Registration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleCheckInput = () => {
    if (
      validator.isEmpty(name)
      && validator.isEmpty(email)
      && validator.isEmpty(password)
      && validator.isEmpty(passwordAgain)
    ) {
      setShowError(true);
      return setErrorMessage('Name, email and password are required.');
    }
    if (validator.isEmpty(name)) {
      setShowError(true);
      return setErrorMessage('Username is required');
    }
    if (!validator.isEmail(email)) {
      setShowError(true);
      return setErrorMessage('Email is required');
    }
    if (!validator.isStrongPassword(password)) {
      setShowError(true);
      return setErrorMessage('Password must be at least 8 characters, including min 1 uppercased letter and min 1 symbol.');
    }
    if (password !== passwordAgain) {
      setShowError(true);
      return setErrorMessage(
        'The passwords are not the same, please check them again!',
      );
    }
    setErrorMessage([]);
    setShowError(false);
    return true;
  };

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    if (handleCheckInput()) {
      register(name, email, password, setErrorMessage, setShowError, navigate);
    }
  };
  return (
    <Grid align="center" justifyContent="center">
      <Typography variant="h3" margin={3} fontWeight="bold" component="span">
        FoxTicket
      </Typography>
      <Container align="center" maxWidth="xs" data-testid="errorContainer">
        {showError && (
          <Alert severity="error" variant="filled">
            <AlertTitle align="center" data-testid="alertText">{errorMessage}</AlertTitle>
          </Alert>
        )}
        <br />
      </Container>
      <Container className="formContainer" maxWidth="sm" data-testid="formContainer">
        <form onSubmit={handleSubmitRegistration}>
          <FormField
            name="Username"
            type="text"
            label="Username"
            icon={<PersonIcon fontSize="large" />}
            value={name}
            onChange={setName}
            data-testid="usernameInputField"
          />
          <br />
          <FormField
            name="Email"
            type="text"
            label="Email"
            icon={<EmailOutlinedIcon fontSize="large" />}
            value={email}
            onChange={setEmail}
            data-testid="emailInputField"
          />
          <br />
          <FormField
            name="Password"
            type="password"
            label="Password"
            icon={<PasswordIcon fontSize="large" />}
            value={password}
            onChange={setPassword}
            data-testid="passwordInputField"
          />
          <br />
          <FormField
            name="PasswordAgain"
            type="password"
            label="Password again"
            icon={<PasswordIcon fontSize="large" />}
            value={passwordAgain}
            onChange={setPasswordAgain}
            data-testid="passwordAgainInputField"
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            data-testid="registrationBtn"
          >
            Registration
          </Button>
          <br />
          <br />
          <Link
            color="primary"
            to="/login"
            title="Go to Registration"
            className="link"
          >
            If you already have an account, click here to login
          </Link>
        </form>
      </Container>
    </Grid>
  );
}
