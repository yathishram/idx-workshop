import React from 'react'
import {useHistory} from "react-router-dom"
import {Button,CssBaseline,Container} from '@material-ui/core'
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


const Connect = ({setup}) => {

   const history = useHistory()
   const classes = useStyles();

    const auth = async () => {
        const [data] = await Promise.all([setup()])
        if(data === null){
            history.push("/login")
        }else{
            history.push("/dashboard")
        }
    }   

    
    return (
        <>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e) => {auth()}}>
                        Connect
                    </Button>
            </div>
        </Container>
        </>
    )
}

export default Connect