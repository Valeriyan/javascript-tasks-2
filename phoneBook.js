'use strict';
var phoneBook = { // Здесь вы храните записи как хотите
    records: [],
    stringRecords: []
};

function validatePhone(phone) {
    if (typeof phone === 'undefined') {
        return false;
    }
    phone = phone.replace(/\s/g, '');
    if (phone.length < 10) {
        return false;
    }

    var intraCityNumberLength = 7;

    if (!/[0-9]{7}/.test(phone.substr(phone.length - intraCityNumberLength))) {
        if (/^[0-9]{3}-[0-9]-[0-9]{3}$/.test(phone.substr(phone.length - (intraCityNumberLength + 2)))) {
            intraCityNumberLength += 2;
        } else {
            return false;
        }
    }

    var cityCodeLength = 3;
    var cityCodeFirstIndex = phone.length - intraCityNumberLength - 1 - cityCodeLength;

    if (!/[0-9]{3}/.test(phone.substr(cityCodeFirstIndex + 1, 3))) {
        if (/^\([0-9]{3}\)$/.test(phone.substr(cityCodeFirstIndex - 1, 5))) {
            cityCodeLength += 2;
        } else {
            return false;
        }
    }
    if (phone.length - intraCityNumberLength - cityCodeLength === 0) {
        return true;
    }
    return /^(\+)?[0-9]+$/.test(phone.substr(0, phone.length - intraCityNumberLength - cityCodeLength));
}

function validateEmail(email) {
    if (typeof email === 'undefined') {
        return false;
    }
    return /^[\w.]+@([A-zА-я0-9-]+\.)+([A-zА-я0-9-]+\.?)$/.test(email);
}

function formatPhone(phone) {
    phone = phone.replace(/[\+\)\(\s,-]/g, '');

    var intraCityNumber = phone.substr(phone.length - 7);
    var cityCode = phone.substr(phone.length - intraCityNumber.length - 3, 3);
    var countryCode = phone.substr(0, phone.length - intraCityNumber.length - cityCode.length);

    if (countryCode === '') {
        countryCode = '7';
    }
    return '+' + countryCode + cityCode + intraCityNumber;
}
//возвращает индексы записей, которые удовлетворяют запросу на поиск/удаление
function findMatchingRecords(query) {
    var matchingRecords = [];

    for (var i = 0; i < phoneBook.records.length; i++) {

        var keys = Object.keys(phoneBook.records[i]);

        for (var j = 0; j < keys.length; j++) {
            if (phoneBook.records[i][keys[j]].toLowerCase().indexOf(query.toLowerCase()) !== -1) {
                matchingRecords.push(i);
                break;
            }
        }
    }
    return matchingRecords;
}

function getPhoneRecordAsString(phoneRecord) {
    return phoneRecord.name + ', ' + phoneRecord.phoneNumber + ', ' + phoneRecord.email;
}
/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
    // Ваша невероятная магия здесь
    if (!validatePhone(phone) || !validateEmail(email)) {
        return;
    }

    var newPhoneRecord = {
        name: name,
        phoneNumber: formatPhone(phone),
        email: email
    };

    phoneBook.records.push(newPhoneRecord);
    phoneBook.stringRecords.push(getPhoneRecordAsString(newPhoneRecord));
};

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    // Ваша удивительная магия здесь
    if (typeof query === 'undefined') {
        for (var i = 0; i < phoneBook.stringRecords.length; i++) {
            console.log(phoneBook.stringRecords[i]);
        }
        return phoneBook.records;
    }

    var matchingRecords = findMatchingRecords(query);
    var foundRecords = [];

    for (var i = 0; i <  matchingRecords.length; i++) {
        console.log(phoneBook.stringRecords[matchingRecords[i]]);
        foundRecords.push(phoneBook.records[matchingRecords[i]]);
    }
    return foundRecords;
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    // Ваша необьяснимая магия здесь
    if (typeof query === 'undefined') {
        return;
    }

    var matchingResults = findMatchingRecords(query);
    var deletedRecords = [];

    for (var i = matchingResults.length - 1; i >= 0; i--) {
        deletedRecords.push(phoneBook.records[matchingResults[i]]);
        phoneBook.records.splice(matchingResults[i], 1);
        phoneBook.stringRecords.splice(matchingResults[i], 1);
    }
    console.log(matchingResults.length + ' record(s) removed');
    return deletedRecords;
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {

    var data = require('fs').readFileSync(filename, 'utf-8');
    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу
    data = data.split(/[;\r\n]+/g);
    for (var i = 0; i < data.length; i += 3) {
        this.add(data[i], data[i + 1], data[i + 2]);
    }
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/

module.exports.showTable = function showTable() {
    // Ваша чёрная магия здесь
};
