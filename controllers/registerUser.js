

import { sendPhoto,sendMessage, sendButtons } from "../utils/messageHelper.js";



export async function registerUser(chatId,  payload, chat) {
    console.log("we are in registerUSer foo")
    // console.log(currentStep, "currentStep")
    console.log(payload, "payload aya kia")
   
    if (payload === "register_cancel" && chat.last_message?.startsWith("register")) {
        console.log("we are in register cancel")
        const buttonText = "Registration Cancelled";
        const buttons = [
            [{ text: "Connect Account", callback_data: "connect_account" }],
            [{ text: "Register", callback_data: "register" }],
            [{ text: "Change Language", callback_data: "language_change" }],
        ];
        await sendButtons(chatId, buttons, buttonText, "connect");
    }
    else if (payload === "register_template" && chat.last_message?.startsWith("connect")) {
        console.log("we are in register template") 
        const buttons = [
            [{ text: "Connect Account", callback_data: "connect_account" }],
            [{ text: "Register", callback_data: "register" }],
            [{ text: "Change Language", callback_data: "language_change" }],
        ];
        await sendButtons(chatId, buttons,"How can we help you today? Let's get started!🚀👇",  "register000");
    }
    else if (payload === "register" && chat.last_message === "register") {
        console.log("we are in register")
        const buttonText = "Great! Are you signing up as an individual or a business?";
        const buttons = [
            [{ text: "Account Register Ind", callback_data: "register_acc_ind" }],
            [{ text: "Account Register Bus", callback_data: "register_acc_bus" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendPhoto(chatId, "https://nodejs-checking-bucket.s3.amazonaws.com/telegram_bot_images/Select.png");

        await sendButtons(chatId,buttons, buttonText,  "register_0");
    } else if (payload === "register_acc_ind" && chat.last_message === "register_0") {
        console.log("we are in register individual")
        const buttons = [
            [{ text: "Cancel Registration", callback_data: "register_cancel" }],
        ];
        await sendPhoto(chatId, "https://nodejs-checking-bucket.s3.amazonaws.com/telegram_bot_images/Individual.png");
        await sendMessage(chatId, "Please enter your first name:", buttons, "register_1");
    } else if (payload === "register_acc_bus" && chat.last_message === "register_1") {
        console.log("we are in register business")
        const buttons = [
            [{ text: "Cancel Registration", callback_data: "register_cancel" }],
        ];
        await sendPhoto(chatId, "https://nodejs-checking-bucket.s3.amazonaws.com/telegram_bot_images/Business.png");
        await sendMessage(chatId, "Business account registration will come soon.", buttons, "register_2");
    } else if (payload === "main_menu" || chat.last_message === "register_0") {
        console.log("Going to main menu");
        const message = "Welcome back! Need to make a transaction? Select from the options below🚀👇";
        const buttons = [
            [{ text: "📒 Wallet Overview", callback_data: "wallet_overview" }],
            [{ text: "💰 Initiate Payment", callback_data: "initiate_payment" }],
            [{ text: "📑 My Transactions", callback_data: "my_transactions" }],
            [{ text: "🔢 QR QuickPay", callback_data: "qr_quickpay" }],
            [{ text: "🏷️ My QR Code", callback_data: "my_qr_code" }],
            [{ text: "🔍 Explore More", callback_data: "explore_more" }],
            [{ text: "🌍 Change Language", callback_data: "language_change" }],
            [{ text: "💬 Chat with us", callback_data: "chat_with_us" }],
        ];
        await sendButtons(chatId, buttons, message,"wallets_0");
    } else if (payload === "wallet_overview" && chat.last_message === "wallets_0") {
        console.log("we are in wallet overview");
        const message = "Wallet Currency: USD\nAvailable Balance: $1000\nYour wallet is your financial hub. Manage funds, make transactions, and keep track of your balance all in one place.";
        const buttons = [
            [{ text: "💳 Add Funds", callback_data: "add_funds" }]
            [{ text: "💸 Convert Funds", callback_data: "convert_funds" }],
            [{ text: "💰 Add Currency", callback_data: "add_currency" }],
            [{ text: "🏠 Main Menu", callback_data: "main_menu" }],
        ] 
        // await sendButtons(chatId, buttons, message, "wallet_overview"); 
}




}