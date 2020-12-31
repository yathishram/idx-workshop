import React, { useState } from 'react'
import {Avatar, 
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    CircularProgress} from '@material-ui/core'
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

const TodoForm = ({addTodo}) => {


    const [title, setTitle] = useState("");
    const [status, setStatus] = useState(false);
    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title) return;
        console.log(title)
        addTodo(title).then(console.log("done"));
        setTitle("")

        
    }
    return (
        <>
           <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
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
                            label="Add Todo"
                            autoFocus
                            onChange={e => setTitle(e.target.value)}
                        />
                        </Grid>
                    </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Add
                    </Button>
                </form>
            </div>
            </Container>
        </>
    )
}

export default TodoForm