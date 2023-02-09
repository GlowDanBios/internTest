import React from "react";
import {observer} from "mobx-react";
import {useNavigate} from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button} from "@material-ui/core";
import {StoreInterface} from "../index";

const Header = observer(({store}:{store:StoreInterface}) => {
    const navigate = useNavigate();
    return (<AppBar position={"static"}>
            <Toolbar>
                    <Typography variant="h6"
                                component="div" >Hello, {store.login}!</Typography>
                    <Button color="inherit"
                            onClick={() => (localStorage.setItem('allowed', 'False'), navigate('/login'))}>Logout</Button>
            </Toolbar>
        </AppBar>

    )
});
export default Header
