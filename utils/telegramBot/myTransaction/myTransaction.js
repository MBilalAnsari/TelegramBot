import { sendButtons } from "../../messageHelper.js";
// import { sendButtons } from "../../messageHelper.js";

export async function myTransaction(chatId, callback_query, chat, save_value) {
    const limit = 5; // Number of transactions per page
    console.log("callback for next trans", callback_query);

    // Static Data
    const staticData = [
        { transactionId: "TXN001", date: "14-Feb-2025", time: "10:30 AM", amount: "+1,500 PKR", status: "✅ Successful", description: "Salary Deposit" },
        { transactionId: "TXN002", date: "13-Feb-2025", time: "3:45 PM", amount: "-500 PKR", status: "✅ Successful", description: "Bill Payment - Electricity" },
        { transactionId: "TXN003", date: "12-Feb-2025", time: "11:10 AM", amount: "-200 PKR", status: "❌ Failed", description: "Mobile Top-up" },
        { transactionId: "TXN004", date: "11-Feb-2025", time: "9:00 AM", amount: "+10,000 PKR", status: "✅ Successful", description: "Freelance Payment" },
        { transactionId: "TXN005", date: "10-Feb-2025", time: "7:15 PM", amount: "-1,200 PKR", status: "✅ Successful", description: "Shopping - Groceries" },
        { transactionId: "TXN006", date: "09-Feb-2025", time: "5:25 PM", amount: "-300 PKR", status: "⏳ Pending", description: "Online Subscription" },
        { transactionId: "TXN007", date: "08-Feb-2025", time: "2:50 PM", amount: "+8,000 PKR", status: "✅ Successful", description: "Friend Transfer" },
        { transactionId: "TXN008", date: "07-Feb-2025", time: "4:30 PM", amount: "-650 PKR", status: "✅ Successful", description: "Food Delivery" },
        { transactionId: "TXN009", date: "06-Feb-2025", time: "1:00 PM", amount: "-2,500 PKR", status: "❌ Failed", description: "Flight Booking" },
        { transactionId: "TXN010", date: "05-Feb-2025", time: "10:00 AM", amount: "+4,500 PKR", status: "✅ Successful", description: "Bonus Reward" },
        { transactionId: "TXN011", date: "04-Feb-2025", time: "6:30 PM", amount: "-800 PKR", status: "✅ Successful", description: "Dinner - Restaurant" },
        { transactionId: "TXN012", date: "03-Feb-2025", time: "1:20 PM", amount: "+2,000 PKR", status: "✅ Successful", description: "Online Sale" },
        { transactionId: "TXN013", date: "02-Feb-2025", time: "9:45 AM", amount: "-400 PKR", status: "✅ Successful", description: "Bus Fare" },
        { transactionId: "TXN014", date: "01-Feb-2025", time: "8:00 PM", amount: "+1,800 PKR", status: "✅ Successful", description: "Gift - Birthday" },
        { transactionId: "TXN015", date: "31-Jan-2025", time: "4:10 PM", amount: "-1,500 PKR", status: "✅ Successful", description: "Clothing Purchase" },
        { transactionId: "TXN016", date: "30-Jan-2025", time: "11:30 AM", amount: "-150 PKR", status: "⏳ Pending", description: "Coffee - Cafe" },
        { transactionId: "TXN017", date: "29-Jan-2025", time: "7:00 PM", amount: "+3,000 PKR", status: "✅ Successful", description: "Refund - Online Order" },
        { transactionId: "TXN018", date: "28-Jan-2025", time: "2:30 PM", amount: "-900 PKR", status: "✅ Successful", description: "Movie Tickets" },
        { transactionId: "TXN019", date: "27-Jan-2025", time: "10:15 AM", amount: "-2,000 PKR", status: "❌ Failed", description: "Hotel Booking" },
        { transactionId: "TXN020", date: "26-Jan-2025", time: "6:00 PM", amount: "+5,000 PKR", status: "✅ Successful", description: "Investment Return" }
    ]; 

    // Handling Pagination (Next/Prev)
    if (callback_query) {
        console.log("callback_query_data:", callback_query)

        if (callback_query.startsWith("next_transactions-") || callback_query.startsWith("prev_transactions-")) { // Corrected condition
            const payloadParts = callback_query.split('-');
            console.log(payloadParts, "payloadParts");

            const skip = parseInt(payloadParts[1]);
            const limit = parseInt(payloadParts[2]);
            const transactions = staticData.slice(skip, skip + limit);
            const totalTransactions = staticData.length;

            const transactionsInfo = transactions.map(data => {
                return `📌 Transaction ID: ${data.transactionId}\n📅 Date: ${data.date} | 🕒 Time: ${data.time}\n💰 Amount: ${data.amount}\n${data.status}\n📝 Description: ${data.description}\n`;
            });

            const message = `📑 **Your Transactions:**\n\n${transactionsInfo.join('\n')}`;

            // Inline Keyboard Buttons
            const inlineKeyboard = [];
            if (skip > 0) {
                inlineKeyboard.push([{ text: "⬅ Previous", callback_data: `prev_transactions-${Math.max(skip - limit, 0)}-${limit}` }]);
            }
            if (totalTransactions > skip + limit) {
                inlineKeyboard.push([{ text: "➡ Next", callback_data: `next_transactions-${skip + limit}-${limit}` }]);
            }
            inlineKeyboard.push([{ text: "🏠 Main Menu", callback_data: "main_menu" }]);

            await sendButtons(chatId, inlineKeyboard, message);
            return;
        }
    }

    // Initial Transactions Display
    if (chat.last_message?.startsWith("my_transactions") || chat.last_message?.startsWith("My Transactions 📑")) {
        console.log("initial transaction");
        const transactions = staticData.slice(0, limit);
        console.log("static data limit", transactions);

        const transactionsInfo = transactions.map(data => {
            return `📌 Transaction ID: ${data.transactionId}\n📅 Date: ${data.date} | 🕒 Time: ${data.time}\n💰 Amount: ${data.amount}\n${data.status}\n📝 Description: ${data.description}\n`;
        });

        const message = `📑 **Your Transactions:**\n\n${transactionsInfo.join('\n')}`;

        // Inline Keyboard Buttons
        const inlineKeyboard = [
            [{ text: "➡ Next", callback_data: `next_transactions-${limit}-${limit}` }],
            [{ text: "🏠 Main Menu", callback_data: "main_menu" }]
        ];

        await sendButtons(chatId, inlineKeyboard, message);
    }
}
