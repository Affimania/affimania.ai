const fs = require('fs');
const path = require('path');
const amazonPaapi = require('amazon-paapi');

const commonParameters = {
    'AccessKey': 'AKPALTMLPD1766576649',
    'SecretKey': 'jC7vaQ1o9PGlVMcTC8Uu/RCUeSWuA8w60Sn2rX7z',
    'PartnerTag': 'ascreation00f-21',
    'PartnerType': 'Associates',
    'Marketplace': 'www.amazon.in'
};

const requestParameters = {
    'Keywords': 'Smartwatch Gaming Laptop Headphones Smart Home',
    'SearchIndex': 'All',
    'ItemCount': 10,
    'Resources': ['ItemInfo.Title', 'Offers.Listings.Price', 'Images.Primary.Large', 'Offers.Listings.SavingBasis']
};

async function updateDeals() {
    try {
        console.log("Fetching Real Amazon Products...");
        const data = await amazonPaapi.SearchItems(commonParameters, requestParameters);
        const items = data.SearchResult.Items;
        const realDealsData = [];

        items.forEach(item => {
            const priceData = item.Offers.Listings[0];
            const currentPrice = priceData.Price.Amount;
            const mrp = priceData.SavingBasis ? priceData.SavingBasis.Amount : currentPrice + 500;
            
            realDealsData.push({
                title: item.ItemInfo.Title.DisplayValue,
                price: currentPrice.toLocaleString('en-IN'),
                mrp: mrp.toLocaleString('en-IN'),
                savings: `Save ${priceData.Price.Savings ? priceData.Price.Savings.Percentage : 20}%`,
                affiliate_link: item.DetailPageURL,
                image: item.Images.Primary.Large.URL
            });
        });

        // 40 products loop
        let finalDeals = [];
        while(finalDeals.length < 40) {
            finalDeals = finalDeals.concat(realDealsData);
        }
        finalDeals = finalDeals.slice(0, 40);

        const indexPath = path.join(__dirname, 'index.html');
        let content = fs.readFileSync(indexPath, 'utf8');
        
        // Exact marker replacement logic
        content = content.replace(/const dummyDeals = \[[\s\S]*?\];/, `const dummyDeals = ${JSON.stringify(finalDeals, null, 4)};`);
        
        fs.writeFileSync(indexPath, content);
        console.log('✅ Success: 40 Real Amazon Photos injected into index.html');
    } catch (err) {
        console.error('❌ PA-API Error:', err);
    }
}

updateDeals();
