import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import styles from '../styles/Four.module.scss';
import '../styles/home.scss';

const Four = () => {
    return (
        <article className={styles.main}>
            <h1>404</h1>
            <h3>It seems like the page you are looking for doesn't exist.</h3>
            <Link to="/" className="btn">Go Home</Link>
        </article>
    )
}

export default withRouter(Four);