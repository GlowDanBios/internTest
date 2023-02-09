import React from 'react';
import {useNavigate} from 'react-router-dom';
import {observer} from "mobx-react"

// @ts-ignore
const App: JSX.Element = observer(({store}) => {
    const navigate = useNavigate();
    if (localStorage.getItem('allowed') !== 'True') {
        navigate('/login')
    }
    React.useEffect(() => {
        window.addEventListener('storage', () => {
            console.log(localStorage.getItem('allowed'))
            // When local storage changes, dump the list to
            // the console.
            if (localStorage.getItem('allowed') !== 'True') {
                navigate('/login')
            }
        })
    }, []);

    return (
        <div>

        </div>
    );
});

export default App;
