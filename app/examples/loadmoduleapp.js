import React from 'react';
import ReactDOM  from 'react-dom/client';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import Settings from './example_components/Settings';
//import Home from './example_components/Home';
//import Topics from './example_components/Topics';
// Try to import component dynamically

class DynamicImport extends React.Component {
    state = {
        component: null
    };

    componentDidMount() {
        this.props.load()
            .then((module) =>
                this.setState(() => ({
                    component: module.default
                }))
            )
    }
    
    render() {
        return this.props.children(this.state.component);
    }
}

const Home = (props) => (
    <DynamicImport load={() => import('./example_components/Home')}>
        {(Component) => Component === null
            ? <h1>Loading...</h1>
            : <Component {...props} />
        }
    </DynamicImport>
);

const Topics = (props) => (
    <DynamicImport load={() => import('./example_components/Topics')}>
        {(Component) => Component === null
            ? <h1>Loading...</h1>
            : <Component {...props} />
        }
    </DynamicImport>
);

const Settings = (props) => (
    <DynamicImport load={() => import('./example_components/Settings')}>
        {(Component) => Component === null
            ? <h1>Loading...</h1>
            : <Component {...props} />
        }
    </DynamicImport>
);

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/topics'>Topics</Link></li>
                        <li><Link to='/settings'>Settings</Link></li>
                    </ul>

                    <hr/>

                    <Routes>
                        <Route exact path='/' element={<Home/>}/>
                        <Route path='/topics' element={<Topics/>}/>
                        <Route path='/settings' element={<Settings/>}/>
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;

const root = ReactDOM.createRoot(document.getElementById('app'));
const element = <App/>

root.render(element);