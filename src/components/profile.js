import React, {useState, useEffect} from 'react'
import {definitions} from "../lib/config.json"
import {Card, CardActions, CardContent, Typography, Button, Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });


const Profile = ({idx, ceramic}) => {

    const [profile, setProfile] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        async function fetch(){
            try{
                if(idx){
                    const [profile] = await Promise.all([
                    idx.get(definitions.profile, idx.id)]);
                    console.log(profile); 
                    setProfile(profile)
                }
            }catch(err){
                console.log(err)
        }
        }
        fetch()
    }, [])

    if(profile){
        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Profile
                    </Typography>
                    <Typography variant="h5" component="h2">
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {profile.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {profile.email}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {profile.bio}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {idx.id}
                    </Typography>
                </CardContent>
            </Card>
        )
    }else{
        return(
        <div>
            Loading....
        </div>
        )
    }
   
}

export default Profile