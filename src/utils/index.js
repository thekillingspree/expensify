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