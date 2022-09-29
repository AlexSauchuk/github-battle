import React from "react";
import ReactDOM  from "react-dom/client";
import Hello from "./hello";
import '../index.css';

// Component
// State
// Lifecycle
// UI

class App extends React.Component {
    
    render() {
        var name = "Alex";
    
        return (
            <React.Fragment>
                <Hello 
                    name="Maks"
                    email="maks@gmail.com"
                />
                <Hello
                    username="alexsavchuk"
                    authed={true}
                    logout={() => alert('Logged Out')}
                    header={<h1>Hello</h1>}
                />
            </React.Fragment>
        );
    }
}

// return several elements without unnesessary root tag
class FragmentExample extends React.Component {
    render() {
        const name = "Alex";

        return (
            <React.Fragment>
                <h1>Hello, {name} React Fragment:)</h1>
                <p>Today is {new Date().toLocaleString()}</p>
                <p>What is 2 + 2? {2 + 2}</p>
            </React.Fragment>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('app'));
const element = (<div><App/><FragmentExample/></div>)

root.render(element);