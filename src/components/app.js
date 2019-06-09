import React from 'react'
import ReactDOM from 'react-dom'
import 'dotenv/config'
import Login from './loginpage'

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Login />
            </div>
        )
    }
}

export default App;