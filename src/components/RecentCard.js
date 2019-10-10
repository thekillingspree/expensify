import React from 'react';
import moment from 'moment';
import styles from '../styles/RecentCard.module.scss';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { getTimeDescription, displayAmount } from '../utils';

const RecentCard = ({expense, currency}) => {
    const {title, type, notes, updatedAt, value, date} = expense;
    const amt = displayAmount(currency, value);
    return (
        <section className={styles[type]}>
            <div className={styles.details}>
                <h2 className={title.length > 15 && styles.smallH2}>{title}</h2>
                <div className={styles.date}>
                <CalendarTodayIcon /> 
                    {moment(date).format('Do MMM, YYYY')}
                </div>
                <p>Created {getTimeDescription(updatedAt)}</p>
            </div>
            <h2 className={amt.length >= 10 ? styles.amountSmall : styles.amount}>
                {amt}
            </h2>
        </section>
    )
}

export default RecentCard
