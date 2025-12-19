const fs = require('fs');
const path = require('path');

// 📸 10 Unique High-Res Images per Category (Total 60 Verified Links)
const imagePool = {
    "Winter Jackets": [
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&q=80",
        "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&q=80",
        "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=500&q=80",
        "https://images.unsplash.com/photo-1545594944-24b89198b29f?w=500&q=80",
        "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&q=80",
        "https://images.unsplash.com/photo-1544923246-77307dd654ca?w=500&q=80",
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80",
        "https://images.unsplash.com/photo-1548883354-94bcfe3211bb?w=500&q=80",
        "https://images.unsplash.com/photo-1520975916090-3105956dac52?w=500&q=80",
        "https://images.unsplash.com/photo-1504191467641-2815d8591394?w=500&q=80"
    ],
    "Sweaters": [
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80",
        "https://images.unsplash.com/photo-1556905055-8f358a7a4bb4?w=500&q=80",
        "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=500&q=80",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80",
        "https://images.unsplash.com/photo-1611911813524-8e9f4283139c?w=500&q=80",
        "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?w=500&q=80",
        "https://images.unsplash.com/photo-1583901582315-41383817526b?w=500&q=80",
        "https://images.unsplash.com/photo-1603400521630-9f2de124b33b?w=500&q=80",
        "https://images.unsplash.com/photo-1521223344201-d169129f7b7d?w=500&q=80"
    ],
    "Smartwatch": [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
        "https://images.unsplash.com/photo-1544117518-30df57964493?w=500&q=80",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80",
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80",
        "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&q=80",
        "https://images.unsplash.com/photo-1517502474097-f9b30659dadb?w=500&q=80",
        "https://images.unsplash.com/photo-1546868871-70ca1bc0167d?w=500&q=80",
        "https://images.unsplash.com/photo-1523395243481-163f8f6155ab?w=500&q=80",
        "https://images.unsplash.com/photo-1510283319847-504609212677?w=500&q=80",
        "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=500&q=80"
    ],
    "Wireless Buds": [
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&q=80",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80",
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&q=80",
        "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=500&q=80",
        "https://images.unsplash.com/photo-1585565804112-f201f68c48b4?w=500&q=80",
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80",
        "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&q=80",
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80"
    ],
    "Running Shoes": [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&q=80",
        "https://images.unsplash.com/photo-1543508282-6319a3e46bc1?w=500&q=80",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&q=80",
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80",
        "https://images.unsplash.com/photo-1512374382149-4332c6c75d61?w=500&q=80",
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80",
        "https://images.unsplash.com/photo-1515955656352-a1ec3da82997?w=500&q=80",
        "https://images.unsplash.com/photo-1551107696-a9b0c5a0d9a2?w=500&q=80"
    ],
    "Backpack": [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&q=80",
        "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500&q=80",
        "https://images.unsplash.com/photo-1546750334-9eefd89776d7?w=500&q=80",
        "https://images.unsplash.com/photo-1509762774605-f07235a08f1f?w=500&q=80",
        "https://images.unsplash.com/photo-1553135246-8178120b60b7?w=500&q=80",
        "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80",
        "https://images.unsplash.com/photo-1577733966973-d680babb2da7?w=500&q=80",
        "https://images.unsplash.com/photo-1563212693-0130985f403e?w=500&q=80",
        "https://images.unsplash.com/photo-1546938574-1969038ffea9?w=500&q=80"
    ]
};

const seasonalDatabase = {
    winter: {
        badge: "WINTER SPECIAL ❄️",
        title: "Crush Your <span class='text-blue-400'>2026 Goals</span>",
        desc: "Best deals on Winter Wear, Fitness Gear, and Health Essentials.",
        bg: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
        accent: "#164E63",
        categories: [
            {n: "Winter Wear", i: "🧥", l: "winter+wear+jackets"},
            {n: "Fitness", i: "🏋️‍♂️", l: "fitness+equipment"},
            {n: "Gadgets", i: "⌚", l: "smartwatch"},
            {n: "Health", i: "🥗", l: "health+supplements"}
        ]
    }
};

const trendingProducts = Object.keys(imagePool);
const realDealsData = [];

// Fisher-Yates shuffle for true randomness
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 🛒 AB TOTAL 52 DEALS GENERATE HONGI
for (let i = 1; i <= 52; i++) {
    const price = Math.floor(Math.random() * 8000) + 500;
    const mrp = price + Math.floor(Math.random() * 3000) + 500;
    
    const randomProduct = trendingProducts[Math.floor(Math.random() * trendingProducts.length)];
    const shuffledPool = shuffle([...imagePool[randomProduct]]);
    const randomImg = shuffledPool[0]; 

    realDealsData.push({
        title: `${randomProduct} - Premium Deal!`,
        price: price,
        mrp: mrp,
        savings: `Flat ${Math.round(((mrp - price) / mrp) * 100)}% Off`,
        affiliate_link: `https://www.amazon.in/s?k=${randomProduct.replace(/\s/g, '+')}&tag=ascreation00f-21`,
        image: randomImg
    });
}

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

content = content.replace(/(\/\/ --- START: AUTOGENERATED DEALS DATA ---)[\s\S]*?(\/\/ --- END: AUTOGENERATED DEALS DATA ---)/, 
    `$1\nconst dummyDeals = ${JSON.stringify(realDealsData, null, 4)};\n$2`);

content = content.replace(/(\/\/ --- START: CONTEXT DATA ---)[\s\S]*?(\/\/ --- END: CONTEXT DATA ---)/, 
    `$1\nconst affimaniaContext = ${JSON.stringify(seasonalDatabase.winter)};\n$2`);

fs.writeFileSync(indexPath, content);
console.log('✅ Success: 52 Deals with 10 High-Res Variety Images each!');
