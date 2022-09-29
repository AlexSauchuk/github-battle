import React from "react";
import ReactDOM  from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Nav from "./components/Nav";
import { ThemeProvider } from "./contexts/Theme";
import './index.css';

// import Battle from "./components/Battle";
// import Popular from "./components/Popular";
// import Results from "./components/Results";
// Component
// State
// Lifecycle
// UI

const Battle = React.lazy(() => import('./components/Battle'));
const Popular = React.lazy(() => import('./components/Popular'));
const Results = React.lazy(() => import('./components/Results'));

class App extends React.Component {
    /*constructor(props) {
        super(props);

        this.state = {
            theme: 'light',
            toggleTheme: () => {
                
                this.setState((state) => ({
                    theme: state.theme === 'light' ? 'dark' : 'light'
                }))
            }
        };
    }*/

    state = {
        theme: 'light',
        toggleTheme: () => {
            
            this.setState((state) => ({
                theme: state.theme === 'light' ? 'dark' : 'light'
            }))
        }
    };    

    render() {
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className='container'>
                            <Nav/>

                            <React.Suspense fallback={<Loading/>}>
                                <Routes>
                                    <Route exact path='/' element={<Popular/>} />
                                    <Route exact path='/battle' element={<Battle/>} />
                                    <Route path='/battle/results' element={<Results/>} />
                                    <Route path='*' element={<h1>404</h1>} />
                                </Routes>
                            </React.Suspense>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('app'));
const element = <App/>

root.render(element);