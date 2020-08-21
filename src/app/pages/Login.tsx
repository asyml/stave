import React, { useState } from 'react';
import { login } from '../lib/api';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

function Login() { 
  const [error, setError] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history = useHistory();

  function handleLogin(e: any) {
    e.preventDefault();
    login(username, password)
      .then(e => {
        history.push('/projects');
      })
      .catch(e => {
        setError('login failed');
      });
  }

  function redirectSignup(e: any) {
    history.push("/signup") 
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(15),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

    const classes = useStyles();

  return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <img alt='stave logo' src={process.env.PUBLIC_URL + '/Stave-dark-text@1x.png'}/>
          <form className={classes.form} noValidate onSubmit={handleLogin}>

                <TextField
                  onChange={e => setUsername(e.target.value)}
                  value={username}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />

                <TextField
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                />

            {error ? <div>{error}</div> : null}

            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item>
                <Link 
                  component="button"
                  variant="body2"
                  onClick={redirectSignup} >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
  );
}

export default Login;
