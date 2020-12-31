import React, { useState, useEffect } from 'react'
import {definitions} from "../lib/config.json"
import TodoForm from './todoForm';
import {useHistory} from "react-router-dom"

import {AppBar, Button, Toolbar, Typography, ListItem, List, ListItemText} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Dashboard = ({idx, ceramic}) => {

    const [todos, setTodos] = useState([]);
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        async function fetch(){
            try{
                if(idx){
                    const [todoList] = await Promise.all([
                    idx.get(definitions.todo, idx.id)]);
                    console.log(todoList); 
                    todoList ? setTodos(todoList.documents) : setTodos([])  
                }
            }catch(err){
                console.log(err)
            }
        }
        fetch()
    }, [])

    const addTodo = async (todo) => {
        const newTodos = [...todos, todo];
        setTodos(newTodos)
        console.log(newTodos)
        await idx.set(definitions.todo, {
            documents: newTodos
        })
    }

    if(todos){
        return(
            <>
            <AppBar position="static">
                <Toolbar>
                <Button color="inherit" onClick={e => history.push("/profile")}>Profile</Button>
                <Button color="inherit" onClick={e => history.push("/jwe")}>Encrypt Decrypt</Button>
                </Toolbar>
            </AppBar>
            <div className="">
                <div className="row">
                    <div className="col s6 m6">
                    <TodoForm addTodo={addTodo} />
                    {
                        todos ? (
                            <List dense={false}>
                            {todos.map((todo, index) => {
                                return(
                                    <ListItem>
                                    <ListItemText
                                      primary={todo}
                                    />
                                  </ListItem>
                                
                                )
                            })}
                            </List>
                        ) : (
                            <div className="container">
                                <h4>No Todos!</h4>
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>
            </>
        )
    }
    else {
        return(
            <div className="container center">
            Loading
            </div>
        )
    }
}

export default Dashboard;