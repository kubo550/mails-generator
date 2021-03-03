import puppeteer from "puppeteer";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const FAKE_MAIL_URL = process.env.FAKE_MAIL_URL;
const MAX_LENGTH = +process.env.MAX_LENGTH;
let emails = [];
const getFakeMail = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(FAKE_MAIL_URL, { waitUntil: "networkidle2" });
    await page.waitForTimeout(4000);
    const emial = await page.$eval("#mail", (el) => el.value);
    emails.push(emial);
    if (emails.length === MAX_LENGTH) {
        emails = emails.filter(e => e !== "Ładowanie...");
        fs.writeFile(`./fakeEmails/${emails[0].split(/[0-9@]/)[0]}.json`, JSON.stringify(emails, null, 3), err => {
            err && console.log(err);
        });
    }
    await browser.close();
};
fs.mkdir(`./fakeemails`, { recursive: true }, err => {
    err && console.log(err);
});
for (let i = 0; i < MAX_LENGTH; i++) {
    getFakeMail();
}
