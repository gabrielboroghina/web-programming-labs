import React, {useEffect, useState} from 'react';
import styles from './App.module.scss';

function Counter(props) {
    const [value, setValue] = useState(props.initialVal);

    useEffect(() => {
        if (value === 0)
            alert("Counter set to 0");
    });

    return (
        <div className={styles.counter}>
            <p>Value: {value}</p>

            <button onClick={() => setValue(props.increment)}>Increment</button>
            <br/>
            <button onClick={() => setValue(props.decrement)}>Decrement</button>
            <br/>
            <button onClick={() => setValue(props.resetVal)}>Reset</button>
        </div>
    );
}

const Header = () => (
    <div className={styles.header}>
        <h2>Header</h2>
    </div>
);

const Nav = () => (
    <div className={styles.nav}>
        <div className={styles.nav_left}>
            <img className={styles.logo} src={process.env.PUBLIC_URL + '/logo192.png'}/>
            <a className={styles.navitem} href="#">Home</a>
            <a className={styles.navitem} href="#">Books</a>
            <a className={styles.navitem} href="#">Authors</a>
        </div>
        <div className={styles.nav_right}>
            <select className={styles.dropdown}>
                <option>Logout</option>
                <option>Account</option>
            </select>
        </div>
    </div>
);

const Footer = () => (
    <div className={styles.footer}>
        <p>
            Gabriel Boroghina
            <br/>
            Facultatea de Automatica si Calculatoare
            <br/>
            Anul absolvirii: 2020
        </p>
    </div>
);

function Layout(props) {
    return (
        <div className={styles.layout}>
            {props.children}
        </div>
    );
}

function App() {
    return (
        <Layout>
            <Header/>
            <Nav/>
            <Counter initialVal={0}
                     increment={val => val + 1}
                     decrement={val => val - 1}
                     resetVal={val => 0}/>
            <Footer/>
        </Layout>
    );
}

export default App;
