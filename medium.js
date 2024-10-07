"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pUser = {
    name: 'Alice',
    address: {
        city: 'Moscow'
    }
};
console.log('PUser:', pUser);
var capitalized = 'Alice';
console.log('Capitalized Word:', capitalized);
var mutableUser = {
    name: 'Alice',
    address: {
        street: 'Shosse',
    }
};
mutableUser.name = 'Ksenia';
mutableUser.address.street = '3mkr';
console.log('Mutable User:', mutableUser);
var urlParams = 'title';
console.log('URL Params:', urlParams);
