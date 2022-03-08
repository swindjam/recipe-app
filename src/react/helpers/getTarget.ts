import React from 'react';

export default (event: React.SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    let count = 0;
    while (target.nodeName !== 'BUTTON' || count > 5) {
        target = target.parentNode as HTMLInputElement;
        count++;
    }

    return target;
};