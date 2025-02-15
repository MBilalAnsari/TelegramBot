import { TelegramBot, User } from "../models/User.js"; // Import User model
// import { registerUserCallback } from './authController.js';
import { sendPhoto, sendMessage, sendButtons } from "../utils/messageHelper.js";
// import axios from 'axios';
import { registerUser } from './registerUser.js';


export const handleUpdates = async (req, res) => {
    // console.log("Received update:", JSON.stringify(req.body, null, 2));

    const data = req.body;
    let chatId;
    const currentTime = new Date();

    let text_message = null;
    let callback_query = null;

    if (data.message) {
        text_message = data.message.text || null;
        chatId = data.message.chat.id.toString();
    } else if (data.callback_query) {
        callback_query = data.callback_query.data;
        chatId = data.callback_query.message.chat.id.toString();
        // text_message = data.callback_query.message.text || null;
        // console.log("Callback Query received:", callback_query);
    }

    //  Find chat data in MongoDB
    let chat = await TelegramBot.findOne({ recipient: chatId });

    //  If last message is the same, avoid duplicate processing
    if (chat && chat.last_message === text_message) {
        // console.log("Duplicate message detected, ignoring:", text_message);
        return res.sendStatus(200); //  Early exit
    }

    //  Save new last_message to prevent repeat responses
    if (chat) {
        console.log("1111111111111111111111111111111we are in chat")
        // console.log("Updating existing chat:", chatId);
        // console.log("chat.last_meshihihsage", chat.last_message);
        if (text_message !== "4WOHZT9V") {
            chat.last_message = callback_query || text_message || "unknown"; //  Update last message
            chat.last_message_time = currentTime;
            await chat.save()
                ;
        }
    } else {
        chat = new TelegramBot({
            recipient: chatId,
            last_message_time: currentTime,
            last_message: text_message || callback_query || "unknown",
        });
        await chat.save();
    }

    // ✅ Proceed with responses
    if (text_message === "hello") {
        // console.log("Processing 'hello' message for", chatId);
        const buttons = [
            [{ text: "Connect Account", callback_data: "connect_account" }],
            [{ text: "Register", callback_data: "register" }],
            [{ text: "Change Language", callback_data: "language_change" }],
        ];
        await sendPhoto(chatId, "https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705350_640.jpg");
        await sendButtons(chatId, buttons, "Welcome onboard!");
    } else if (callback_query) {
        console.log("Handling callback query:", callback_query);
        console.log("text_message", text_message)
        await registerUser(chatId, callback_query, chat, text_message);
    }

    // last message starts with 
    console.log("chat.last_message", chat.last_message);
    console.log("text_message", text_message);
    if (text_message && chat.last_message?.startsWith("alpha_num_code") && text_message === "4WOHZT9V") {
        console.log("we are in alphanum_wallet_code");
        const message = `Username: Mohammad Yaseen\n` +
            `Country: Pakistan\n` +
            `Wallet Name: 4WOHZT9V\n` +
            `Wallet Currency: PKR`;
        const buttons = [
            [{ text: "Yes", callback_data: "yes" }],
            [{ text: "No", callback_data: "main_menu" }],
            [{ text: "Send again", callback_data: "alpha_num_code" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        sendButtons(chatId, buttons, message, text_message);

    }
    if (text_message && chat.last_message?.startsWith("yes") || callback_query?.startsWith("yes") && callback_query === "yes") {
        console.log("we are in alphanum_wallet_code");
        const message = "Select the payment method you would like to pay with:"
        const buttons = [
            [{ text: "Instapay Wallets", callback_data: "instapay_wallets" }],
            [{ text: "Paypal", callback_data: "pay_pal" }],
            [{ text: "Add Payment Card", callback_data: "add_payment_card" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        sendButtons(chatId, buttons, message, text_message);

    }
    if (text_message && chat.last_message?.startsWith("instapay_wallets") || callback_query?.startsWith("instapay_wallets") && callback_query === "instapay_wallets") {
        console.log("we are in instapay_wallet_code");
        const message = "Among the active currencies in your Wallet, select the one to be debited"
        const buttons = [
            [{ text: "PKR", callback_data: "pkr" }],
            [{ text: "USD", callback_data: "usd" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        sendButtons(chatId, buttons, message, text_message);

    }
    if (text_message && chat.last_message?.startsWith("pay_pal") || callback_query?.startsWith("pay_pal") && callback_query === "pay_pal") {
        console.log("we are in paypal_wallet_code");
        const message = `Please enter the amount in PKR for your transaction\n Example: 100`
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        sendButtons(chatId, buttons, message, text_message);

    }
    if (text_message && chat.last_message?.startsWith("add_payment_card") || callback_query?.startsWith("add_payment_card") && callback_query === "add_payment_card") {
        console.log("we are in pkr_wallet_code");
        const message = `For improved security, it's recommended to add a payment card through the web portal.

To add a payment card, log in to your InstaPay account on the web portal and follow these steps:

1️⃣ After logging in, go to the "Wallets" page and click the "Add Funds" button.
2️⃣ Enter the desired amount and click "Next."
3️⃣ Choose "Payment Card" from the available payment methods and click "Next."
4️⃣ Enter your card details, check the "Save Card Info" option, and proceed with the top-up.

Once completed, your card will be saved in your InstaPay account, allowing you to use it directly through the chatbot for future transactions.`
        const buttons = [
            [{ text: "Login", callback_data: "login" }],
            [{ text: "Back", callback_data: "back" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        sendButtons(chatId, buttons, message, text_message);

    }
    if (text_message && chat.last_message?.startsWith("pkr") || callback_query?.startsWith("pkr") && callback_query === "pkr") {
        console.log("we are in pkr_wallet_code");
        const message = `Please enter the amount in PKR for your transaction\n Example: 100`
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        sendButtons(chatId, buttons, message, text_message);

    }
    if (text_message && chat.last_message?.startsWith("usd") || callback_query?.startsWith("usd") && callback_query === "usd") {
        console.log("we are in usd_wallet_code");
        const message = `Please enter the amount in USD for your transaction\n Example: 100`
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        sendButtons(chatId, buttons, message, "usd");
    }
    if (text_message && text_message === "100" || callback_query?.startsWith("usd") && callback_query === "usd") {
        console.log("we are in amount_code");
        const message = `Amount to send: 0.37 USD
                    Fee: 0.00 USD
                    Exchange Rate: 1 USD = 272.759245 PKR
       
                    Recipient Gets: 100.00 PKR
    
                    Total amount: 0.37 USD
                    Insufficient Balance! Please topup your wallet.`
        const buttons = [
            [{ text: "Add Funds", callback_data: "add_funds" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        sendButtons(chatId, buttons, message, text_message);
    }
    if ((chat.last_message?.startsWith("add_funds")) || (callback_query?.startsWith("add_funds")) || (callback_query === "add_funds")) {
        console.log("we are in add funds");
        const message = "Select your top-up channel:";
        const buttons = [
            [{ text: "PayPal", callback_data: "pay_pal_btn" }],
            [{ text: "Google Pay", callback_data: "google_pay" }],
            [{ text: "Apple Pay", callback_data: "apple_pay" }],
            [{ text: "Other payment method", callback_data: "other_payment_method" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    else if ((chat.last_message?.startsWith("pay_pal_btn")) || (callback_query?.startsWith("pay_pal_btn")) || (callback_query === "pay_pal_btn")) {
        console.log("we are in paypal");
        const message = "This payout channel is not available at the moment.";
        const buttons = [
            [{ text: "Change Method", callback_data: "add_funds" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0");
    }
    else if ((chat.last_message?.startsWith("google_pay")) || (callback_query?.startsWith("google_pay")) || (callback_query === "google_pay")) {
        console.log("we are in google pay");
        const message = "This payout channel is not available at the moment.";
        const buttons = [
            [{ text: "Change Method", callback_data: "add_funds" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0");
    }
    else if ((chat.last_message?.startsWith("apple_pay")) || (callback_query?.startsWith("apple_pay")) || (callback_query === "apple_pay")) {
        console.log("we are in apple pay");
        const message = "This payout channel is not available at the moment.";
        const buttons = [
            [{ text: "Change Method", callback_data: "add_funds" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0");
    }
    else if ((chat.last_message?.startsWith("other_payment_method")) || (callback_query?.startsWith("other_payment_method")) || (callback_query === "other_payment_method")) {
        console.log("we are in change method");
        const messageLogin = 'To add funds, please follow the below steps.\n\n 1⃣ Login to InstaPay web portal.\n 2⃣ Go to wallets page and select "Add funds" option from Wallet Management menu.';
        const messageMain = "Click below to log in now.";
        const buttons = [
            [{ text: "Login", callback_data: "log_in" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendMessage(chatId, messageLogin, "register_0");
        await sendButtons(chatId, buttons, messageMain, "register_0");
    }

    return res.sendStatus(200); // ✅ Respond with 200 OK to prevent Telegram retries
};
