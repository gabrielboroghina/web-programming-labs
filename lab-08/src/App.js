import React from 'react';
import './App.css';

class Counter extends React.Component {
    state = {
        value: 0
    };

    render() {
        return (
            <div className="counter">
                <p>Value: {this.state.value}</p>

                <button onClick={() => this.setState(state => ({value: state.value + 1}))}>Increment</button>
                <br/>
                <button onClick={() => this.setState(state => ({value: state.value - 1}))}>Decrement</button>
                <br/>
                <button onClick={() => this.setState({value: 0})}>Reset</button>
            </div>
        );
    }
}

const Header = () => (
    <div>
        <h2>Header</h2>
    </div>
);

const Nav = () => (
    <div>
        <h2>Nav</h2>
    </div>
);

const Footer = () => (
    <div>
        <h4>Footer</h4>
    </div>
);

function Layout(props) {
    return (
        <div className="layout">
            {props.children}
        </div>
    );
}

function App() {
    return (
        <Layout>
            <Header/>
            <Nav/>
            <Counter/>
            <Footer/>
        </Layout>
    );
}

export default App;
