import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Button, IconButton } from '@material-ui/core/'
import { Visibility, VisibilityOff } from '@material-ui/icons/';
import CustomTextField from '../../components/CustomTextField';
import { history } from '../../utils/history';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
    height: '100%',
    position: 'relative',
    backgroundImage: 'url(public/assets/img/proiectd.jpg)',
    backgroundSize: 'auto',
    backgroundRepeat: 'no-repeat'
  },
  userCard: {
    height: '400px',
    width: '40%',
    maxWidth: '350px',
    minWidth: '300px',
    margin: 'auto',
    background: 'white',
    padding: '10px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    borderRadius: '5px',
    transform: 'translate(-50%,-50%)',
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  brandLogoContainer: {
    height: '160px',
    width: '160px',
    left: '50%',
    top: '0px',
    transform: 'translate(-50%,-50%)',
    position: "absolute",
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    padding: '10px',
    textAlign: 'center',
  },
  brandLogo: {
    height: '150px',
    width: '150px',
    borderRadius: '50%',
    border: '2px solid white',
  },
  formContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    height: 'calc(100% - 140px)',
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '100px',
    paddingBottom: '40px',
  },
  button: {
    height: 42,
    marginTop: 40,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    '&:disabled': {
      color: 'gainsboro',
      cursor: 'not-allowed',
      pointerEvents: 'all'
    }
  },
  input: {
    fontSize: '13px',
    minHeight: '20px',
  },
}));

const LoginPage = ({ login }) => {
  const classes = useStyles();

  const [credentials, setCredentials] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [emailMessageError, setEmailMessageError] = React.useState('');
  const [passMessageError, setPassMessageError] = React.useState('');

  const handleChange = (prop) => (event) => {
    if (prop === 'email') {
      setEmailError(false);
    }
    if (prop === 'password') {
      setPasswordError(false);
    }
    setCredentials({ ...credentials, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setCredentials({ ...credentials, showPassword: !credentials.showPassword });
  };

  const isEmailValid = (email) => {
    // functia care seteaza daca e email invalid ia trimite true daca da
    setEmailError(validateEmail(email));
    validateEmail(email) === true ? setEmailMessageError("Invalid email!") : setEmailMessageError("");
    return false;
  }

  const isPasswordValid = (password) => {
    // functia care seteaza daca e email invalid ia trimite true daca da
    setPasswordError(validatePassword(password));
    validatePassword(password) === true ? setPassMessageError("Invalid password!") : setPassMessageError("");
    return false;
  }

  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return false
    }
    return true
  }

  const validatePassword = (password) => {
    const passValidator = /^[A-Za-z]\w{7,14}$/;
    if (password.match(passValidator)) {
      return false;
    }
    return true;
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: credentials.email,
      password: credentials.password
    }
    const validateLogin = login(data);
    validateLogin.then((value) => {
      switch (value.status) {
        case 403:
          setPassMessageError(value.message);
          setPasswordError(true);
          break;
        case 200:
          history.push('/');
      }
    }).catch((error) => { Promise.reject(error) });
  }
  const isFormCompleted = () => credentials.email && credentials.password;

  return (

    <div className={classes.root}>
      <div className={classes.userCard}>
        <div className={classes.brandLogoContainer}>
          <img className={classes.brandLogo} src="public/assets/img/logo.png"></img>
        </div>
        <div className={classes.formContainer}>
          <form className={classes.form} validate='true' onSubmit={handleSubmit}>
            <CustomTextField
              error={emailError}
              required
              id='email'
              label='Email'
              type='email'
              value={credentials.email}
              handleChange={handleChange('email')}
              inputClassName={classes.input}
              helperText={emailError && emailMessageError}
              onBlur={() => isEmailValid(credentials.email)}
            />
            <CustomTextField
              error={passwordError}
              required
              id="password"
              label="Password"
              type={credentials.showPassword ? 'text' : 'password'}
              value={credentials.password}
              handleChange={handleChange('password')}
              inputClassName={classes.input}
              autoComplete="current-password"
              endIcon={<IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              > {credentials.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>}
              handleChange={handleChange('password')}
              helperText={passwordError && passMessageError}
              onBlur={() => isPasswordValid(credentials.password)}
            />
            <Button
              variant="contained"
              type='submit'
              color="primary"
              disabled={!isFormCompleted()}
              className={classes.button}>Login</Button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default LoginPage;