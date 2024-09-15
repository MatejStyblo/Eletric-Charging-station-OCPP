const puppeteer = require('puppeteer');
const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
const createUrlWithTodayDate = () => {
    const baseUrl = 'https://www.ote-cr.cz/cs/kratkodobe-trhy/elektrina/denni-trh?date=';
    const todayDate = getTodayDate();
    return `${baseUrl}${todayDate}`;
};

const scrapeData = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = createUrlWithTodayDate();
    await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });

    const hoursOfDay = await page.evaluate(() => {
        const rows = document.querySelectorAll('#content-core > div > div.report_content > div.bigtable.left-sticky > div.sticky-wrap > table.table.report_table.sticky-enabled > tbody > tr');
        return Array.from(rows).map(row => {
            const cell = row.querySelector('th:nth-child(1)');
            const text = cell ? cell.textContent.trim() : null;
            return text === '0' ? '1' : text;
        }).filter(value => value !== null);
    });

    const pricesOfDay = await page.evaluate(() => {
        const rows = document.querySelectorAll('#content-core > div > div.report_content > div.bigtable.left-sticky > div.sticky-wrap > table.table.report_table.sticky-enabled > tbody > tr');
        return Array.from(rows).map(row => {
            const cell = row.querySelector('td:nth-child(2)');
            return cell ? cell.textContent.trim() : null;
        }).filter(value => value !== null);
    });

    await browser.close();

    const combinedResults = hoursOfDay.map((hour, index) => ({
        hour: hour,
        price: pricesOfDay[index] || 'Unknown'
    }));

    return combinedResults;
};

module.exports = scrapeData;
