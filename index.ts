import puppeteer from "puppeteer";
import dotenv from "dotenv";
import chalk from "chalk";
// @ts-ignore
import fng from "fakenamegenerator";

import { Person } from "./types";

dotenv.config();


const password = process.env.PASSWORD!;
const timeoutMS = Number(process.env.TIMEOUT_MS!);

const URL = "https://konto-pocztowe.interia.pl/#/nowe-konto/darmowe";
const DOMAIN = "@interia.pl";
let trials = 0;
let created = 0;

const getSafeDay = (day: string): string => (day === "31" ? "30" : day);

const random = (limit: number): number => Math.ceil(Math.random() * limit);

const createAccount = async (
    person: Person,
    password: string
): Promise<[string, boolean]> => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const { name, birthday } = person;
    const names = name.split(/\s+/);
    const dates = birthday.split("/");

    const imie = names[0];
    const surname = names[names.length - 1];

    const day = dates[0];
    const year = dates[dates.length - 1];

    if (!imie || !surname || !day || !year) {
        throw Error("Fng failed");
    }

    await page.goto(URL, { waitUntil: "networkidle2" });
    await page.waitForTimeout(500);

    const closeButton = await page.$(".close-x");
    await closeButton?.click();

    await page.waitForTimeout(timeoutMS);

    const imieInput = await page.$("#name");
    await imieInput?.click();
    await page.keyboard.type(imie, { delay: 10 });

    await page.keyboard.press("Tab");
    await page.waitForTimeout(timeoutMS);
    await page.keyboard.type(surname, { delay: 10 });
    await page.waitForTimeout(timeoutMS);

    await page.keyboard.press("Tab");
    await page.keyboard.type(getSafeDay(day), { delay: 10 });
    await page.waitForTimeout(timeoutMS);

    await page.keyboard.press("Tab");
    const r1 = random(12);

    for (let i = 0; i < r1; i++) {
        await page.keyboard.press("ArrowDown");
    }

    await page.keyboard.press("Enter");
    await page.waitForTimeout(timeoutMS);

    await page.keyboard.press("Tab");
    await page.keyboard.type(year, { delay: 10 });
    await page.waitForTimeout(timeoutMS);

    await page.keyboard.press("Tab");
    const r2 = random(2);

    for (let i = 0; i < r2; i++) {
        await page.keyboard.press("ArrowDown");
    }

    await page.keyboard.press("Enter");
    await page.waitForTimeout(timeoutMS);

    await page.keyboard.press("Tab");
    await page.waitForTimeout(timeoutMS);

    const passwordInput = await page.$("#password");
    await passwordInput?.click();
    await page.keyboard.type(password, { delay: 10 });
    await page.waitForTimeout(timeoutMS);

    const rePasswordInput = await page.$("#rePassword");
    await rePasswordInput?.click();
    await page.keyboard.type(password, { delay: 10 });
    await page.waitForTimeout(timeoutMS);

    const loginInput = await page.$("#login");
    const loginEl = await loginInput?.getProperty("value");
    const login = loginEl?._remoteObject.value as string;
    await page.waitForTimeout(timeoutMS);

    // const checkbox = await page.$('.checkbox-label')
    // await checkbox?.click()
    await page.waitForTimeout(timeoutMS);

    const errors = await page.$(".account-input__error");

    const registerBtn = await page.$(".btn");
    await registerBtn?.click();
    await page.waitForTimeout(timeoutMS * 2);

    await browser.close();

    const mail = login + DOMAIN;
    const completed = !errors;
    return [mail, completed];
};

const interval = async (): Promise<void> => {
    const person: Person = await fng();

    const [mail, completed] = await createAccount(person, password);
    trials++;
    if (completed) {
        created += 1;
    }

    console.log(
        chalk.blue(mail),
        chalk.magenta(password),
        chalk[completed ? "green" : "red"](completed),
        `${chalk.greenBright(trials)}/${chalk.cyanBright(trials)}`
    );

    await interval();
};

(async () => {
    console.log(chalk.cyanBright("Start creating..."));
    try {
        await interval();
    } catch (err) {
        console.log(
            chalk.yellowBright`Something went really wrong!`,
            chalk.red(err)
        );
    } finally {
        console.log(
            `Total trails: ${chalk.blue(trials)}`,
            `Total created: ${chalk.green(created)}`
        );
    }
})();
