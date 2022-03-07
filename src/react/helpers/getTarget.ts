import React from "react";

export default (event: React.SyntheticEvent) => {
    let target = event.currentTarget;
    let count = 0;
    while (target.nodeName !== 'BUTTON' || count > 5) {
        target = target.parentNode;
        count++;
    }

    return target;
};