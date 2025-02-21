import { sendPhoto, sendMessage, sendButtons, sendReplyKeyboard } from "../../messageHelper.js"

export async function myTransaction(chatId, callback_query, chat, text_message) {
    // my transactions logics here
    if ((chat.last_message?.startsWith("my_transactions")) || (callback_query?.startsWith("my_transactions")) || text_message?.startsWith("My Transactions 📑")) {
        console.log("we are in my transactions");
        const message = `
📌 Transaction ID: TXN001  
📅 Date: 14-Feb-2025 | 🕒 Time: 10:30 AM  
💰 Amount: +1,500 PKR  
✅ Status: Successful  
📝 Description: Salary Deposit  

📌 Transaction ID: TXN002  
📅 Date: 13-Feb-2025 | 🕒 Time: 3:45 PM  
💰 Amount: -500 PKR  
✅ Status: Successful  
📝 Description: Bill Payment - Electricity  

📌 Transaction ID: TXN003  
📅 Date: 12-Feb-2025 | 🕒 Time: 11:10 AM  
💰 Amount: -200 PKR  
❌ Status: Failed  
📝 Description: Mobile Top-up  

📌 Transaction ID: TXN004  
📅 Date: 11-Feb-2025 | 🕒 Time: 9:00 AM  
💰 Amount: +10,000 PKR  
✅ Status: Successful  
📝 Description: Freelance Payment  

📌 Transaction ID: TXN005  
📅 Date: 10-Feb-2025 | 🕒 Time: 7:15 PM  
💰 Amount: -1,200 PKR  
✅ Status: Successful  
📝 Description: Shopping - Groceries  

📌 Transaction ID: TXN006  
📅 Date: 09-Feb-2025 | 🕒 Time: 5:25 PM  
💰 Amount: -300 PKR  
⏳ Status: Pending  
📝 Description: Online Subscription  

📌 Transaction ID: TXN007  
📅 Date: 08-Feb-2025 | 🕒 Time: 2:50 PM  
💰 Amount: +8,000 PKR  
✅ Status: Successful  
📝 Description: Friend Transfer  

📌 Transaction ID: TXN008  
📅 Date: 07-Feb-2025 | 🕒 Time: 4:30 PM  
💰 Amount: -650 PKR  
✅ Status: Successful  
📝 Description: Food Delivery  

📌 Transaction ID: TXN009  
📅 Date: 06-Feb-2025 | 🕒 Time: 1:00 PM  
💰 Amount: -2,500 PKR  
❌ Status: Failed  
📝 Description: Flight Booking  

📌 Transaction ID: TXN010  
📅 Date: 05-Feb-2025 | 🕒 Time: 10:00 AM  
💰 Amount: +4,500 PKR  
✅ Status: Successful  
📝 Description: Bonus Reward  
    `;
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
}