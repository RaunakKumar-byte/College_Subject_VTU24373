const generateReceipt = (price, tip) => {
const total = price + tip;
console.log(`Total Bill: ₹${total}`);
};

generateReceipt(500,50);