'use strict';
var phoneBook = { // Здесь вы храните записи как хотите
    records: [],
    stringRecords: []
};

function isPhoneValid(phone) {
    if (typeof phone === 'undefined') {
        return false;
    }
    phone = phone.replace(/\s/g, '');
    if (phone.length < 10) {
        return false;
    }

    var intraCityNumberLength = 7;

    for (var i = phone.length - 1; i >= phone.length - intraCityNumberLength; i--) {
        if (!/[0-9]/.test(phone[i])) {
            if (phone[i] !== '-' || i !== phone.length - 4 && i !== phone.length - 6) {
                return false;
            } else {
                intraCityNumberLength++;
            }
        }
    }
    if (!(intraCityNumberLength == 9 || intraCityNumberLength == 7)) {
        return false;
    }

    var cityCodeLength = 3;
    var cityCodeLastIndex = phone.length - intraCityNumberLength - 1;
    var cityCodeFirstIndex = cityCodeLastIndex - cityCodeLength;

    if (!/[0-9]{3}/.test(phone.substring(cityCodeFirstIndex + 1, cityCodeLastIndex + 1))) {
        if (/^\([0-9]{3}\)$/.test(phone.substring(cityCodeFirstIndex - 1, cityCodeLastIndex + 1))) {
            cityCodeLength += 2;
        } else {
            return false;
        }
    }
    for (i = cityCodeLastIndex - cityCodeLength; i >= 0; i--) {
        if (!/[0-9]/.test(phone[i])) {
            if (phone[i] !== '+' || i !== 0) {
                return false;
            }
        }
    }
    return true;
}

function isEmailValid(email) {
    if (typeof email === 'undefined') {
        return false;
    }
    return /^[\w.]+@([A-zА-я0-9-]+\.)+([A-zА-я0-9-]+\.?)$/.test(email);
}

function formatPhone(phone) {
    phone = phone.replace(/[\+\)\(\s,-]/g, '');

    var intraCityNumber = phone.substr(phone.length - 7, phone.length - 1);
    var cityCodeLastIndex = phone.length - intraCityNumber.length;
    var cityCode = phone.substr(cityCodeLastIndex - 3, cityCodeLastIndex - 1);
    var countryCode = phone.substr(0, phone.length - intraCityNumber.length - cityCode.length - 1);

    if (countryCode === '') {
        countryCode = '7';
    }
    return '+' + countryCode + cityCode + intraCityNumber;
}

function phoneRecordToString(phoneRecord) {
    return phoneRecord.name + ', ' + phoneRecord.phoneNumber + ', ' + phoneRecord.email;
}
/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
    // Ваша невероятная магия здесь
    if (!isPhoneValid(phone) || !isEmailValid(email)) {
        return;
    }

    var newPhoneRecord = {
        name: '',
        phoneNumber: '',
        email: ''
    };

    newPhoneRecord.name = name;
    newPhoneRecord.phoneNumber = formatPhone(phone);
    newPhoneRecord.email = email;
    phoneBook.records.push(newPhoneRecord);
    phoneBook.stringRecords.push(phoneRecordToString(newPhoneRecord));
};

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    // Ваша удивительная магия здесь
    var results = [];

    if (typeof query === 'undefined') {
        return phoneBook.stringRecords;
    }
    for (var i = 0; i < phoneBook.records.length; i++) {
        for (var j in phoneBook.records[i]) {
            if (phoneBook.records[i][j].toLowerCase().indexOf(query.toLowerCase()) !== -1) {
                results.push(phoneBook.stringRecords[i]);
                console.log(phoneBook.stringRecords[i]);
                break;
            }
        }
    }
    return results;
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    // Ваша необьяснимая магия здесь
    var countOfDeletedRecords = 0;

    if (typeof query === 'undefined') {
    }
    for (var i = 0; i < phoneBook.records.length - countOfDeletedRecords; i++) {
        for (var j in phoneBook.records[i]) {
            if (phoneBook.records[i][j].toLowerCase().indexOf(query.toLowerCase()) !== -1) {
                phoneBook.records.splice(i, 1);
                phoneBook.stringRecords.splice(i, 1);
                countOfDeletedRecords++;
                break;
            }
        }
    }
    console.log(countOfDeletedRecords + ' record(s) removed');
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
