const puppeteer = require('puppeteer');

// (async () => {
// 	const browser = await puppeteer.launch();
// 	const page = await browser.newPage();
// 	await page.goto('https://www.geeksforgeeks.org/');
// 	await page.screenshot({ path: 'GFG.png' });
// 	await browser.close();
// })();

// function to scrape api using puipteer
async function scrape() {
    
    // start browser with Accept-Language header 
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--lang=en-US,en',
            '--headless',
        ]
    });
        const page = await browser.newPage();
	await page.goto(`https://api.winkl.in/brand_user/campaign_profile_v2?id=${12658}`);
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36');
    await page.setExtraHTTPHeaders({
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        // 'Referer': 'http://books.toscrape.com/',
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'DNT': '1',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'Referer': 'https://campaignmanager.winkl.co/',
        'Origin': 'https://campaignmanager.winkl.co',

        // important token below
        'authorization': 'Token ruor7REQi9KJz6wIQKDXvwtt kTSzYRkYHbGTCr3DWtadNQtt'
    });
    await page.screenshot({ path: 'hello.png' });
	await browser.close();
}
scrape()

// pupepteer with User-Agent header
// const browser = await puppeteer.launch({
//     headless: false,
//     args: [
//         '--no-sandbox',
//         '--disable-setuid-sandbox',
//         '--disable-dev-shm-usage',
//         '--disable-accelerated-2d-canvas',
//         '--disable-gpu',
//         '--window-size=1920x1080'
//     ]
// });
//     const page = await browser.newPage();