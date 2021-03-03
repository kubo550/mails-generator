import puppeteer from "puppeteer";
// @ts-ignore
import fng from "fakenamegenerator";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const FAKE_MAIL_URL = process.env.FAKE_MAIL_URL;
const MAX_LENGTH = +process.env.MAX_LENGTH;
let accounts = [];
const getFakeMail = async (fakePerson) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(FAKE_MAIL_URL, { waitUntil: "networkidle2" });
    const closeButton = await page.$(".close-x");
    await closeButton?.click();
    const name = await page.$("#name");
    const surname = await page.$("#surname");
    const birthdayDay = await page.$("#birthdayDay");
    const month = await page.$(".account-input");
    const birthdayYear = await page.$("#birthdayYear");
    const login = await page.$("#login");
    const password = await page.$("#password");
    const rePassword = await page.$("#rePassword");
    const regulamin = await page.$(".law-information__description");
    const _fullnameArr = fakePerson.name.split(/\s+/);
    const userData = {
        name: _fullnameArr[0],
        surname: _fullnameArr[_fullnameArr.length - 1],
        password: fakePerson.password,
        birthdayDay: fakePerson.birthday.split("/")[0],
        birthdayYear: fakePerson.birthday.split("/")[2],
    };
    await name?.type(userData.name);
    await surname?.type(userData.surname);
    await birthdayDay?.type(userData.birthdayDay);
    await month?.click();
    await password?.type(userData.password);
    await rePassword?.type(userData.password);
    await login?.click();
    await page.waitForTimeout(300);
    await regulamin?.click();
    await page.waitForTimeout(200);
    const monthJanuary = await page.$(".account-select");
    await monthJanuary?.click();
    await page.waitForTimeout(200);
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await birthdayYear?.type(userData.birthdayYear);
    await page.keyboard.press("Tab");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    const accountLogin = await page.$eval("#login", input => input.value);
    const res = {
        fullname: `${userData.name} ${userData.surname}`,
        email: `${accountLogin}@interia.pl`,
        password: userData.password,
    };
    const submit = await page.$(".btn");
    await submit?.click();
    await page.waitForTimeout(4500);
    await browser.close();
    return res;
};
fs.mkdir(`./fakeAccounts`, { recursive: true }, err => {
    err && console.log(err);
});
for (let i = 0; i < MAX_LENGTH; i++) {
    (async () => {
        const fakePerson = await fng();
        const data = await getFakeMail(fakePerson);
        accounts.push(data);
        if (accounts.length === MAX_LENGTH) {
            fs.writeFile(`./fakeAccounts/${data.fullname}.json`, JSON.stringify(accounts, null, 3), err => {
                err && console.log(err);
            });
        }
    })();
}
