import React from "react";

export default (event: React.SyntheticEvent) => {
    let target = event.target;
    let count = 0;
    while (target.nodeName !== 'BUTTON' || count > 5) {
        target = target.parentNode;
        count++;
    }

    return target;
};