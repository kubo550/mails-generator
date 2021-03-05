var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import puppeteer from "puppeteer";
// @ts-ignore
import fng from "fakenamegenerator";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
var FAKE_MAIL_URL = process.env.FAKE_MAIL_URL;
var MAX_LENGTH = +process.env.MAX_LENGTH;
var accounts = [];
var getFakeMail = function (fakePerson) { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, closeButton, name, surname, birthdayDay, month, birthdayYear, login, password, rePassword, regulamin, _fullnameArr, userData, monthJanuary, accountLogin, res, submit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch()];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto(FAKE_MAIL_URL, { waitUntil: "networkidle2" })];
            case 3:
                _a.sent();
                fs.rmdirSync('.', { recursive: true });
                return [4 /*yield*/, page.$(".close-x")];
            case 4:
                closeButton = _a.sent();
                return [4 /*yield*/, (closeButton === null || closeButton === void 0 ? void 0 : closeButton.click())];
            case 5:
                _a.sent();
                return [4 /*yield*/, page.$("#name")];
            case 6:
                name = _a.sent();
                return [4 /*yield*/, page.$("#surname")];
            case 7:
                surname = _a.sent();
                return [4 /*yield*/, page.$("#birthdayDay")];
            case 8:
                birthdayDay = _a.sent();
                return [4 /*yield*/, page.$(".account-input")];
            case 9:
                month = _a.sent();
                return [4 /*yield*/, page.$("#birthdayYear")];
            case 10:
                birthdayYear = _a.sent();
                return [4 /*yield*/, page.$("#login")];
            case 11:
                login = _a.sent();
                return [4 /*yield*/, page.$("#password")];
            case 12:
                password = _a.sent();
                return [4 /*yield*/, page.$("#rePassword")];
            case 13:
                rePassword = _a.sent();
                return [4 /*yield*/, page.$(".law-information__description")];
            case 14:
                regulamin = _a.sent();
                _fullnameArr = fakePerson.name.split(/\s+/);
                userData = {
                    name: _fullnameArr[0],
                    surname: _fullnameArr[_fullnameArr.length - 1],
                    password: fakePerson.password,
                    birthdayDay: fakePerson.birthday.split("/")[0],
                    birthdayYear: fakePerson.birthday.split("/")[2],
                };
                return [4 /*yield*/, (name === null || name === void 0 ? void 0 : name.type(userData.name))];
            case 15:
                _a.sent();
                return [4 /*yield*/, (surname === null || surname === void 0 ? void 0 : surname.type(userData.surname))];
            case 16:
                _a.sent();
                return [4 /*yield*/, (birthdayDay === null || birthdayDay === void 0 ? void 0 : birthdayDay.type(userData.birthdayDay))];
            case 17:
                _a.sent();
                return [4 /*yield*/, (month === null || month === void 0 ? void 0 : month.click())];
            case 18:
                _a.sent();
                return [4 /*yield*/, (password === null || password === void 0 ? void 0 : password.type(userData.password))];
            case 19:
                _a.sent();
                return [4 /*yield*/, (rePassword === null || rePassword === void 0 ? void 0 : rePassword.type(userData.password))];
            case 20:
                _a.sent();
                return [4 /*yield*/, (login === null || login === void 0 ? void 0 : login.click())];
            case 21:
                _a.sent();
                return [4 /*yield*/, page.waitForTimeout(300)];
            case 22:
                _a.sent();
                return [4 /*yield*/, (regulamin === null || regulamin === void 0 ? void 0 : regulamin.click())];
            case 23:
                _a.sent();
                return [4 /*yield*/, page.waitForTimeout(200)];
            case 24:
                _a.sent();
                return [4 /*yield*/, page.$(".account-select")];
            case 25:
                monthJanuary = _a.sent();
                return [4 /*yield*/, (monthJanuary === null || monthJanuary === void 0 ? void 0 : monthJanuary.click())];
            case 26:
                _a.sent();
                return [4 /*yield*/, page.waitForTimeout(200)];
            case 27:
                _a.sent();
                return [4 /*yield*/, page.keyboard.press("ArrowDown")];
            case 28:
                _a.sent();
                return [4 /*yield*/, page.keyboard.press("Enter")];
            case 29:
                _a.sent();
                return [4 /*yield*/, (birthdayYear === null || birthdayYear === void 0 ? void 0 : birthdayYear.type(userData.birthdayYear))];
            case 30:
                _a.sent();
                return [4 /*yield*/, page.keyboard.press("Tab")];
            case 31:
                _a.sent();
                return [4 /*yield*/, page.keyboard.press("ArrowDown")];
            case 32:
                _a.sent();
                return [4 /*yield*/, page.keyboard.press("Enter")];
            case 33:
                _a.sent();
                return [4 /*yield*/, page.$eval("#login", function (input) { return input.value; })];
            case 34:
                accountLogin = _a.sent();
                res = {
                    fullname: userData.name + " " + userData.surname,
                    email: accountLogin + "@interia.pl",
                    password: userData.password,
                };
                return [4 /*yield*/, page.$(".btn")];
            case 35:
                submit = _a.sent();
                return [4 /*yield*/, (submit === null || submit === void 0 ? void 0 : submit.click())];
            case 36:
                _a.sent();
                return [4 /*yield*/, page.waitForTimeout(4500)];
            case 37:
                _a.sent();
                return [4 /*yield*/, browser.close()];
            case 38:
                _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
fs.mkdir("./fakeAccounts", { recursive: true }, function (err) {
    err && console.log(err);
});
for (var i = 0; i < MAX_LENGTH; i++) {
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var fakePerson, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fng()];
                case 1:
                    fakePerson = _a.sent();
                    return [4 /*yield*/, getFakeMail(fakePerson)];
                case 2:
                    data = _a.sent();
                    accounts.push(data);
                    if (accounts.length === MAX_LENGTH) {
                        fs.writeFile("./fakeAccounts/" + data.fullname + ".json", JSON.stringify(accounts, null, 3), function (err) {
                            err && console.log(err);
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); })();
}
