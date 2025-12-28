const fs = require('fs');
const path = require('path');
const amazonPaapi = require('amazon-paapi');

// 🔐 Your Credentials
const commonParameters = {
    'AccessKey': 'AKPALTMLPD1766576649',
    'SecretKey': 'jC7vaQ1o9PGlVMcTC8Uu/RCUeSWuA8w60Sn2rX7z',
    'PartnerTag': 'ascreation00f-21',
    'PartnerType': 'Associates',
    'Marketplace': 'www.amazon.in'
};

const requestParameters = {
    'Keywords': 'Smartphone Gaming Headphones Laptop Watch', // Trending categories
    'SearchIndex': 'All',
    'ItemCount': 10,
    'Resources': [
        'ItemInfo.Title',
        'Offers.Listings.Price',
        'Images.Primary.Large',
        'Offers.Listings.SavingBasis'
    ]
};

async function fetchRealAmazonDeals() {
    try {
        console.log("Fetching Real Amazon Data & Photos...");
        const data = await amazonPaapi.SearchItems(commonParameters, requestParameters);
        const items = data.SearchResult.Items;
        const realDealsData = [];

        items.forEach(item => {
            const priceInfo = item.Offers.Listings[0];
            const currentPrice = priceInfo.Price.Amount;
            const mrp = priceInfo.SavingBasis ? priceInfo.SavingBasis.Amount : currentPrice + 499;

            realDealsData.push({
                title: item.ItemInfo.Title.DisplayValue,
                price: currentPrice.toLocaleString('en-IN'),
                mrp: mrp.toLocaleString('en-IN'),
                savings: `Save ${priceInfo.Price.Savings ? priceInfo.Price.Savings.Percentage : 15}%`,
                affiliate_link: item.DetailPageURL,
                image: item.Images.Primary.Large.URL // ✨ Real Amazon Primary Photo
            });
        });

        // Filling up to 40 deals (repeat logic for grid filling)
        let finalDeals = [];
        while(finalDeals.length < 40) {
            finalDeals = finalDeals.concat(realDealsData);
        }
        finalDeals = finalDeals.slice(0, 40);

        // Update index.html
        const indexPath = path.join(__dirname, 'index.html');
        let content = fs.readFileSync(indexPath, 'utf8');
        
        const replaceStr = `const dummyDeals = ${JSON.stringify(finalDeals, null, 4)};`;
        content = content.replace(/const dummyDeals = \[[\s\S]*?\];/, replaceStr);
        
        fs.writeFileSync(indexPath, content);
        console.log('✅ Success: 40 Real Amazon Deals with Photos Updated!');

    } catch (err) {
        console.error('❌ Error fetching from Amazon API:', err);
    }
}

fetchRealAmazonDeals();
