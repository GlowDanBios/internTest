import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Container, TextField, CssBaseline, makeStyles} from "@material-ui/core";
import {observer} from "mobx-react";
import {StoreInterface} from "../index";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function Login(props: { classes: { submit: {margin:object}; }; login: string | null; password: string; store:StoreInterface; onError: ()=>void; }) {
    const navigate = useNavigate();
    return (
        <Button
                fullWidth
                variant="contained"
                color="primary"
                className={props.classes.submit} onClick={() => {
            return (props.login === 'root' && props.password === 'admin') ? (
                    localStorage.setItem('allowed', 'True'),
                        localStorage.setItem('login', props.login),
                        props.store.errorOnLogin(false),
                        navigate('/table'))
                : (props.onError)()
        }}>Login</Button>
    )
}

const Authorisation = observer(({store}:{store:StoreInterface})=>{

    function handleInputChange(event:React.ChangeEvent<HTMLInputElement>) {
        const target:EventTarget & HTMLInputElement = event.target;
        const value:string = target.value;
        const name:string = target.name;

        switch (name) {
            case 'login': {
                store.changeLogin(value);
                break;
            }
            case 'password': {
                store.changePassword(value);
                break;
            }
        }
    }

    function invalidCredentials() {
        store.errorOnLogin(true)
    }

    const classes = useStyles();


    return (
        <Container component="main">
            <CssBaseline/>

            <div className={classes.paper}>
                <div className={classes.form}>
                        <TextField type='text' name='login' variant="outlined"
                                   margin="normal"
                                   required
                                   fullWidth
                                   id="login"
                                   label="Login"
                                   autoComplete="login"
                                   autoFocus value={store.login} onChange={handleInputChange}/>
                        <TextField type='password' name='password'
                                   variant="outlined"
                                   margin="normal"
                                   required
                                   fullWidth
                                   error={store.errorLogin}
                                   label={store.errorLogin?"Invalid credentials":"Password"}
                                   helperText={store.errorLogin?"Invalid credentials": ''}
                                   id="password"
                                   autoComplete="current-password" value={store.password}
                               onChange={handleInputChange}/>
                    <Login classes={classes} login={store.login} password={store.password} store={store} onError={invalidCredentials}/>
                </div>
            </div>
        </Container>
    );

});

export default Authorisation;
