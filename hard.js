"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var camelizedEx = {
    user: {
        name: 'Alice',
        phone: 9291,
        address: {
            city: 'Moscow'
        }
    }
};
console.log('Camelized Example:', camelizedEx);
var pickedUserCity = {
    user: {
        address: {
            city: 'Moscow'
        }
    }
};
console.log('Picked User City:', pickedUserCity);
