import React from 'react';
import moment from 'moment';
import styles from '../styles/RecentCard.module.scss';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { getTimeDescription, displayAmount } from '../utils';

const RecentCard = ({expense, currency}) => {
    const {title, type, notes, updatedAt, value, date} = expense;
    return (
        <section className={styles[type]}>
            <div className={styles.details}>
                <h2>{title}</h2>
                <p>{notes}</p>
                <div className={styles.date}>
                <CalendarTodayIcon /> 
                    {moment(date).format('Do MMM, YYYY')}
                </div>
                <p>Created {getTimeDescription(updatedAt)}</p>
            </div>
            <h2 className={styles.amount}>
                {displayAmount(currency, value)}
            </h2>
        </section>
    )
}

export default RecentCard
