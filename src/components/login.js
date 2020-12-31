import React, {useState} from 'react'
import {definitions} from "../lib/config.json"
import {useHistory} from "react-router-dom"
import {Avatar, Button, CssBaseline, TextField, FormControlLabel,
Box, Typography, Container, CircularProgress, Grid} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

const Login = ({idx, ceramic}) => {

    const history = useHistory()
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [bio, setBio] = useState(null);
    const [status, setStatus] = useState(false)
    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(true)
        idx.set(definitions.profile, {
            name: name,
            email: email,
            bio: bio
        }).then(res => {
            console.log(res);
            setStatus(false)
            history.push("/dashboard")
        })
    }

    console.log(ceramic, idx)
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up to create your Identity!
                </Typography>
                <form className={classes.form} noValidate onSubmit={e => handleSubmit(e)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                            autoComplete="fname"
                            name="fullName"
                            variant="outlined"
                            required
                            fullWidth
                            id="fullName"
                            label="Full Name"
                            autoFocus
                            onChange={e => setName(e.target.value)}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={e => setEmail(e.target.value)}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="bio"
                            label="Short Bio"
                            id="bio"
                            onChange={e => setBio(e.target.value)}
                        />
                        </Grid>
                    </Grid>
                    {
                        status ? (<CircularProgress />) : (
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create Away
                    </Button>
                        )
                    }
                    
                </form>
            </div>
        </Container>
    )
}

export default Login