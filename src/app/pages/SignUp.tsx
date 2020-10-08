import React, { useState } from 'react';
import { signup } from '../lib/api';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';

function SignUp() {
  const [error, setError] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history = useHistory();

  function handleSignUp(e: any) {
    e.preventDefault();
    signup(username, password)
      .then(e => {
        history.push('/');
      })
      .catch(e => {
        setError('sign up failed');
      });
  }

  function redirectLogin(e: any) {
    history.push("/login") 
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(15),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    photo: {
      height: '12%',
      width: '12%',
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    textField: {
      width: '25ch',
    },
  }));

  interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
  }

    const classes = useStyles();
    const [values, setValues] = React.useState<State>({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
    });

    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

  return (
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          <Typography component="h1" variant="h3"> 
            Create your &nbsp;
            <img className={classes.photo} alt= 'stave logo' src={process.env.PUBLIC_URL + '/Stave-graphic@2x.png'}></img>
            &nbsp; account
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSignUp}>
                <TextField
                  placeholder="username"
                  onChange={e => setUsername(e.target.value)}
                  value={username}
                  name="username"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Your Username"
                />
                <FormControl className={classes.form}>
                  <InputLabel htmlFor="filled-adornment-password" variant="outlined"
                  required
                  >Your Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    label="Your Password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

            {error ? <div>{error}</div> : null}

            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignUp}
            >
              Create account
            </Button>

            <Grid container justify="flex-end">
              <Grid item>
                <Link 
                  component="button"
                  variant="body2"
                  onClick={redirectLogin} >
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
  );
}

export default SignUp;
