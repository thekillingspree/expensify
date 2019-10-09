import moment from 'moment';

export * from './api';

export const checkEmail = email => {
    // source: Chromium.org
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const curToSymbol = currency => {
    switch(currency) {
        case 'inr':
            return '₹'
        case 'usd':
            return '$'
        case 'eur':
            return '€'
        case 'btc':
            return '₿'
        case 'eth':
            return 'Ξ'
        default: 
            return '₹'
    }
}

export const greet = () => {
    const hour = parseInt(moment().format('H'));
    if (hour < 12) {
        return 'Good Morning,'
    } else if (hour >= 12 && hour < 16) {
        return 'Good Afternoon,'
    } else {
        return 'Good Evening,'
    }
}

export const displayAmount = (curr, amount) => {
    let str = `${curToSymbol(curr)} ${Math.abs(amount).toFixed(2)}`;
    if (amount < 0) {
        return `-${str}`;
    }
    return str
}


export const randomPlaceholder = type => {
    const income = ['Salary Bonus', 'Cashback', 'Savings', 'Gifts', 'Refunds'];
    const expense = ['Bill Payment', 'Train Pass', 'Subscriptions', 'Installments', 'Movie Tickets'];

    const obj = {income, expense};

    return obj[type][Math.floor(Math.random() * 5)]

}

export const getTimeDescription = ms => {
    return moment(ms).fromNow();
}