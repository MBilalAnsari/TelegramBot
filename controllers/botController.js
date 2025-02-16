// import { text } from "body-parser";
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
    let edited_message = null;
    let image_payloads = [];
    let video_payloads = [];

    // if (data.message) {
    //     text_message = data.message.text || null;
    //     chatId = data.message.chat.id.toString();
    // }
    // if (data.message.photo) {
    //     image_payloads = data.message.photo.map(photo => ({
    //         file_id: photo.file_id,
    //         caption: data.message.caption || null
    //     }));
    //     console.log('Image Payloads:', image_payloads);
    // }
    // if (data.message.video) {
    //     video_payloads = [{
    //         file_id: data.message.video.file_id,
    //         caption: data.message.caption || null,
    //         mime_type: data.message.video.mime_type
    //     }];
    //     console.log('Video Payloads:', video_payloads);
    // }
    // else if (data.callback_query) {
    //     callback_query = data.callback_query.data;
    //     chatId = data.callback_query.message.chat.id.toString();
    //     // text_message = data.callback_query.message.text || null;
    //     // console.log("Callback Query received:", callback_query);
    // }


    //  Find chat data in MongoDB

    if (data.message) {
        if (data.message.text) {
            text_message = data.message.text;
            // console.log('Text Message:', text_message);
        }
        if (data.message.photo) { 
            image_payloads = data.message.photo.map(photo => ({
                file_id: photo.file_id,
                caption: data.message.caption || null
            }));
            console.log('Image Payloads:', image_payloads);
        }
        if (data.message.video) {
            video_payloads = [{
                file_id: data.message.video.file_id,
                caption: data.message.caption || null,
                mime_type: data.message.video.mime_type
            }];
            // console.log('Video Payloads:', video_payloads);
        }
        chatId = data.message.chat.id.toString()
    } else if (data.callback_query) {
        callback_query = data.callback_query.data;
        chatId = data.callback_query.message.chat.id.toString()
        // console.log('Callback Query:', callback_query);
    }
    let chat = await TelegramBot.findOne({ recipient: chatId });

    //  If last message is the same, avoid duplicate processing
    if (chat && chat.last_message === text_message) {
        // console.log("Duplicate message detected, ignoring:", text_message);
        return res.sendStatus(200); //  Early exit
    }
    var last_message;
    //  Save new last_message to prevent repeat responses
    if (chat) {
        console.log("1111111111111111111111111111111we are in chat")
        // console.log("Updating existing chat:", chatId);
        // console.log("chat.last_meshihihsage", chat.last_message);
        if (text_message !== "4WOHZT9V") {
            let last_message;
            // chat.last_message =  await TelegramBot.findOneAndUpdate({ last_message: last_message }) || text_message || "unknown";
            chat.last_message = callback_query || text_message || "unknown";
            chat.last_message_time = currentTime;
            await chat.save();
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
        sendButtons(chatId, buttons, message, "text_message");
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
        sendButtons(chatId, buttons, message, "pay_pal");
    }
    if (text_message && chat.last_message?.startsWith("add_payment_card") || callback_query?.startsWith("add_payment_card") && callback_query === "add_payment_card") {
        console.log("we are in pkr_wallet_code");
        const message = `For improved security, it's recommended to add a payment card through the web portal.\n\n
    
        To add a payment card, log in to your InstaPay account on the web portal and follow these steps:\n\n
    
        1️⃣ After logging in, go to the "Wallets" page and click the "Add Funds" button.\n
        2️⃣ Enter the desired amount and click "Next."\n
        3️⃣ Choose "Payment Card" from the available payment methods and click "Next."\n
        4️⃣ Enter your card details, check the "Save Card Info" option, and proceed with the top-up.\n\n
    
        ✅ Once completed, your card will be saved in your InstaPay account, allowing you to use it directly through the chatbot for future transactions. 🚀`;
        const buttons = [
            [{ text: "Login", callback_data: "login" }],
            [{ text: "Back", callback_data: "yes" }],
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
        const message = "Amount to send: 0.37 USD\n" +
            "Fee: 0.00 USD\n" +
            "Exchange Rate: 1 USD = 272.759245 PKR\n" +
            "Recipient Gets: 100.00 PKR\n" +
            "Total amount: 0.37 USD\n" +
            "Insufficient Balance! Please topup your wallet.";
        const buttons = [
            [{ text: "Add Funds", callback_data: "add_funds" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        sendButtons(chatId, buttons, message, text_message);
    }
    if (text_message && text_message === "101" || callback_query?.startsWith("pay_pal") && callback_query === "pay_pal") {
        console.log("we are in PayPal amount_code");
        const message = "Amount to send: 100.00 PKR\n\n" +
            "Fee: 2.25 PKR\n\n" +
            "Recipient Gets: 100.00 PKR\n\n" +
            "Total amount: 102.25 PKR\n" +
            "PKR is not supported by PayPal, USD will be used as the default currency.\n\n" +
            "Exchange Rate: 1.00 PKR = 0.003593 USD\n" +
            "Amount in USD: 0.36 USD";
        const buttons = [
            [{ text: "Proceed to Transfer", callback_data: "proceed_transfer" }],
            [{ text: "Adjust Amount", callback_data: "adjust_amount" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    if (text_message && text_message === "proceed_transfer" || chat.last_message?.startsWith("proceed_transfer") || callback_query === "proceed_transfer") {
        console.log("we are in proceed_transfer_code");
        const message = "Please enter the code sent to your registered number or email";
        const buttons = [
            [{ text: "Resend OTP", callback_data: "resend_otp" }],
            [{ text: "Assistance Required", callback_data: "assistan_required" }],
            [{ text: "Cancel", callback_data: "cancel_proceed" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendPhoto(chatId, "https://images.peopleimages.com/picture/202306/2836772-png-shot-of-a-handsome-young-man-standing-alone-in-the-studio-with-his-finger-on-his-lips-fit_400_400.jpg");
        await sendButtons(chatId, buttons, message, text_message);
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
    if ((chat.last_message?.startsWith("pay_pal_btn")) || (callback_query?.startsWith("pay_pal_btn")) || (callback_query === "pay_pal_btn")) {
        console.log("we are in paypal");
        const message = "This payout channel is not available at the moment.";
        const buttons = [
            [{ text: "Change Method", callback_data: "add_funds" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0");
    }
    if ((chat.last_message?.startsWith("google_pay")) || (callback_query?.startsWith("google_pay")) || (callback_query === "google_pay")) {
        console.log("we are in google pay");
        const message = "This payout channel is not available at the moment.";
        const buttons = [
            [{ text: "Change Method", callback_data: "add_funds" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0");
    }
    if ((chat.last_message?.startsWith("apple_pay")) || (callback_query?.startsWith("apple_pay")) || (callback_query === "apple_pay")) {
        console.log("we are in apple pay");
        const message = "This payout channel is not available at the moment.";
        const buttons = [
            [{ text: "Change Method", callback_data: "add_funds" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0");
    }
    if ((chat.last_message?.startsWith("other_payment_method")) || (callback_query?.startsWith("other_payment_method")) || (callback_query === "other_payment_method")) {
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





    // QR QuickPay code ka flow
    if ((chat.last_message?.startsWith("scan_qr_code")) || (callback_query?.startsWith("scan_qr_code")) || (callback_query === "scan_qr_code")) {
        console.log("we are in scan_qr_code");
        const message = "Please submit your merchant's QR code image from your phone gallery.";
        await sendMessage(chatId, message, "scan_qr_code");
    }
    if ((image_payloads.length > 0 || video_payloads.length > 0)) {
        console.log("we are in data qr code")
        const message =
            "Hasan Ali\n" +
            "Username: ihasanalyy\n" +
            "Country: Pakistan\n" +
            "Wallet ID: 5RMIOSO7\n" +
            "Wallet Currency: PKR\n\n" +
            "Proceed?";
        const buttons = [
            [{ text: "View Profile", callback_data: "view_profile" }],
            // [{ text: "Scan Again", callback_data: "scan_qr" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
            [{ text: "Yes", callback_data: "yes" }, { text: "No", callback_data: "main_menu" }],
            [{ text: "Scan Again", callback_data: "scan_qr_code" }, { text: "Main Menu", callback_data: "main_menu" }]
        ];
        // Sending the message with buttons
        await sendButtons(chatId, buttons, message, text_message);
    }

    // explore more ka flow
    if ((chat.last_message?.startsWith("explore_more")) || (callback_query?.startsWith("explore_more")) || (callback_query === "explore_more")) {
        console.log("we are in explore_more");
        const message = "Top up phones globally & explore the world with E-SIM!";
        const buttons = [
            [{ text: "Mobile airtime", callback_data: "mobile_airtime" }],
            [{ text: "E-SIM", callback_data: "e_sim" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ]
        await sendPhoto(chatId, "https://egyptianstreets.com/wp-content/uploads/2024/11/en-1-1024x576-1.png");
        await sendButtons(chatId, buttons, message, text_message);
    }
    // mobile airtime ka flow
    if ((text_message && chat.last_message?.startsWith("mobile_airtime")) || (callback_query?.startsWith("mobile_airtime")) || (callback_query === "mobile_airtime")) {
        console.log("we are in mobile_airtime");
        const message = "Ready to instantly top up mobile credit for your loved ones—or yourself—in over 150 countries ? 🌎 Enter the recipient’s phone number with the country code.Example: +41798396699.";
        await sendMessage(chatId, message, text_message);
    }
    // mobile number ka flow
    if (text_message && chat.last_message?.startsWith("+123456789") || (callback_query?.startsWith("+123456789")) || (callback_query === "+123456789")) {
        console.log("we are in mobile_number");
        const message = `Please confirm the number and its details:\n\n` +
            `Country: Pakistan\n` +
            `Operator: Zong Pakistan\n` +
            `Phone: +923112047859`;
        const buttons = [
            [{ text: "Confirm", callback_data: "Confirm_num" }],
            [{ text: "Edit Num", callback_data: "Edit_num" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    // Confirm number ka flow
    if (text_message && chat.last_message?.startsWith("Confirm_num") || (callback_query?.startsWith("Confirm_num")) || (callback_query === "Confirm_num")) {
        console.log("we are in Confirm_num");
        const message = "Select the payment method you would like to pay with:";
        const buttons = [
            [{ text: "InstaPay wallet", callback_data: "InstaPay_wallet" }],
            [{ text: "Paypal", callback_data: "Proceed" }],
            [{ text: "Add Payment Card", callback_data: "Add_pay_card" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    // InstaPay wallet ka flow
    if (text_message && chat.last_message?.startsWith("InstaPay_wallet") || (callback_query?.startsWith("InstaPay_wallet")) || (callback_query === "InstaPay_wallet")) {
        console.log("we are in InstaPay_wallet");
        const message = "Select the currency you would like to pay with:";
        const buttons = [
            [{ text: "🇺🇸 USD", callback_data: "USD_wallet" }],
            [{ text: "🇵🇰 PKR", callback_data: "PKR_Wallet" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    // pkr wallet ka flow
    if (text_message && chat.last_message?.startsWith("PKR_Wallet") || (callback_query?.startsWith("USD_wallet")) || (callback_query === "PKR_Wallet")) {
        console.log("we are in PKR_Wallet");
        const message = `You currently have 0.00 \n\nProceed or choose a different wallet.`;
        const buttons = [
            [{ text: "Proceed", callback_data: "Proceed" }],
            [{ text: "Another Wallet", callback_data: "InstaPay_wallet" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    // Proceed pkr ka flow
    if (text_message && chat.last_message?.startsWith("Proceed") || (callback_query?.startsWith("Proceed")) || (callback_query === "Proceed")) {
        console.log("we are in Proceed");
        const message = "Select the service you need:";
        const buttons = [
            [{ text: "Airtime", callback_data: "Air_time" }],
            [{ text: "Bundle", callback_data: "Bundle" }],
            [{ text: "Data/Internet", callback_data: "Data_Int" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    // add payment card ka flow
    if (text_message && chat.last_message?.startsWith("Add_pay_card") || (callback_query?.startsWith("Add_pay_card")) || (callback_query === "Add_pay_card")) {
        console.log("we are in Add_pay_card");
        const message = "For improved security, it's recommended to add a payment card through the web portal.\n\n" +
            "To add a payment card, log in to your InstaPay account on the web portal and follow these steps:\n\n" +
            "1️⃣ After logging in, go to the \"Wallets\" page and click the \"Add Funds\" button.\n" +
            "2️⃣ Enter the desired amount and click \"Next.\"\n" +
            "3️⃣ Choose \"Payment Card\" from the available payment methods and click \"Next.\"\n" +
            "4️⃣ Enter your card details, check the \"Save Card Info\" option, and proceed with the top-up.\n\n" +
            "Once completed, your card will be saved in your InstaPay account, allowing you to use it directly through the chatbot for future transactions.";
        const buttons = [
            [{ text: "Login", callback_data: "login" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    // airtime ka flow 
    if (text_message && chat.last_message?.startsWith("Air_time") || (callback_query?.startsWith("Air_time")) || (callback_query === "Air_time")) {
        console.log("we are in Air_time");
        const message = "Enter the talk time amount you want to send. 📱\n" +
            "You can send between 98.15 and 24,538.97 PKR.";
        await sendMessage(chatId, message, text_message);
    }
    if (text_message && text_message === "1000") {
        console.log("we are in Air_time");
        const message = "Insufficient Balance! Please topup your wallet.";
        const buttons = [
            [{ text: "Add Funds", callback_data: "add_funds" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    // bundle ka flow 
    if (text_message && chat.last_message?.startsWith("Bundle") || (callback_query?.startsWith("Bundle")) || (callback_query === "Bundle")) {
        console.log("we are in Bundle");
        const message = `Choose a bundle package that suits your needs.\n\nHere are the available options:\n\n1️⃣ Weekly SMS Package || 61.86 PKR\n2️⃣ Zong Unlimited || 123.73 PKR\n3️⃣ Monthly SMS || 145.38 PKR\n4️⃣ Weekly Call || 269.11 PKR\n5️⃣ Stay at home || 303.14 PKR\n6️⃣ Apna Shehr Max || 377.38 PKR`;
        const buttons = [
            [{ text: "1️⃣ Weekly SMS Package", callback_data: "weekly_sms" }],
            [{ text: "2️⃣ Zong Unlimited", callback_data: "zong_unlimited" }],
            [{ text: "3️⃣ Monthly SMS", callback_data: "monthly_sms" }],
            [{ text: "4️⃣ Weekly Call", callback_data: "weekly_call" }],
            [{ text: "5️⃣ Stay at Home", callback_data: "stay_home" }],
            [{ text: "6️⃣ Apna Shehr Max", callback_data: "apna_shehr_max" }],
            [{ text: "➡️ Next", callback_data: "next_page" }],
            [{ text: "🔙 Main Menu", callback_data: "main_menu" }]
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    if (text_message && chat.last_message?.startsWith("weekly_sms") || (callback_query?.startsWith("weekly_sms")) || (callback_query === "weekly_sms")) {
        console.log("we are in weekly_sms");
        const message = `Review your bundle details:\n\nCountry: Pakistan\nOperator: Zong Pakistan\nPhone: +923112047859\n\nService Bundle\n\nBundle Name: Weekly SMS Package\n\nBundle Description: 200 MB Social Data, SMS 1300\n\nBundle Price: 61.86 PKR\nFee: 265.16 PKR\nTotal Cost: 327.03 PKR`;
        const buttons = [
            [{ text: "Confirm", callback_data: "confirm_pkg" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    } else if (text_message && chat.last_message?.startsWith("zong_unlimited") || (callback_query?.startsWith("zong_unlimited")) || (callback_query === "zong_unlimited")) {
        console.log("we are in zong_unlimited");
        const message = `Review your bundle details:\n\nCountry: Pakistan\nOperator: Zong Pakistan\nPhone: +923112047859\n\nService Bundle\n\nBundle Name: Zong Unlimited\n\nBundle Description: Unlimited Calls and SMS\n\nBundle Price: 123.73 PKR\nFee: 265.16 PKR\nTotal Cost: 388.89 PKR`;
        const buttons = [
            [{ text: "Confirm", callback_data: "confirm_pkg" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    } else if (text_message && chat.last_message?.startsWith("monthly_sms") || (callback_query?.startsWith("monthly_sms")) || (callback_query === "monthly_sms")) {
        console.log("we are in monthly_sms");
        const message = `Review your bundle details:\n\nCountry: Pakistan\nOperator: Zong Pakistan\nPhone: +923112047859\n\nService Bundle\n\nBundle Name: Monthly SMS\n\nBundle Description: 500 SMS\n\nBundle Price: 145.38 PKR\nFee: 265.16 PKR\nTotal Cost: 410.54 PKR`;
        const buttons = [
            [{ text: "Confirm", callback_data: "confirm_pkg" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    } else if (text_message && chat.last_message?.startsWith("weekly_call") || (callback_query?.startsWith("weekly_call")) || (callback_query === "weekly_call")) {
        console.log("we are in weekly_call");
        const message = `Review your bundle details:\n\nCountry: Pakistan\nOperator: Zong Pakistan\nPhone: +923112047859\n\nService Bundle\n\nBundle Name: Weekly Call\n\nBundle Description: Unlimited Calls for 7 Days\n\nBundle Price: 269.11 PKR\nFee: 265.16 PKR\nTotal Cost: 534.27 PKR`;
        const buttons = [
            [{ text: "Confirm", callback_data: "confirm_pkg" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    } else if (text_message && chat.last_message?.startsWith("stay_home") || (callback_query?.startsWith("stay_home")) || (callback_query === "stay_home")) {
        console.log("we are in stay_home");
        const message = `Review your bundle details:\n\nCountry: Pakistan\nOperator: Zong Pakistan\nPhone: +923112047859\n\nService Bundle\n\nBundle Name: Stay at Home\n\nBundle Description: 5 GB Data + 500 SMS\n\nBundle Price: 303.14 PKR\nFee: 265.16 PKR\nTotal Cost: 568.30 PKR`;
        const buttons = [
            [{ text: "Confirm", callback_data: "confirm_pkg" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    } else if (text_message && chat.last_message?.startsWith("apna_shehr_max") || (callback_query?.startsWith("apna_shehr_max")) || (callback_query === "apna_shehr_max")) {
        console.log("we are in apna_shehr_max");
        const message = `Review your bundle details:\n\nCountry: Pakistan\nOperator: Zong Pakistan\nPhone: +923112047859\n\nService Bundle\n\nBundle Name: Apna Shehr Max\n\nBundle Description: 10 GB Data + 1000 SMS\n\nBundle Price: 377.38 PKR\nFee: 265.16 PKR\nTotal Cost: 642.54 PKR`;
        const buttons = [
            [{ text: "Confirm", callback_data: "confirm_pkg" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    } else if (text_message && chat.last_message?.startsWith("confirm_pkg") || (callback_query?.startsWith("confirm_pkg")) || (callback_query === "confirm_pkg")) {
        console.log("we are in confirm_pkg");
        const message = `Please enter the code sent to your registered number or email`;
        const buttons = [
            [{ text: "Resend OTP", callback_data: "resend_otp" }],
            [{ text: "Assistance Required", callback_data: "assistan_required" }],
            [{ text: "Cancel", callback_data: "cancel_proceed" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    } else if (text_message && chat.last_message?.startsWith("cancel_proceed") || (callback_query?.startsWith("cancel_proceed")) || (callback_query === "cancel_proceed")) {
        console.log("we are in cancel_proceed");
        const message = "Transaction cancelled. As per request";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }



    // e-sim ka flow
    if ((chat.last_message?.startsWith("e_sim")) || (callback_query?.startsWith("e_sim")) || (callback_query === "e_sim")) {
        console.log("we are in e_sim");
        const message = "Purchase an eSIM 📶 for immediate connection - Global Coverage - Coming Soon!";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }]
        ]
        await sendButtons(chatId, buttons, message, "e_sim");
    }
    return res.sendStatus(200); // ✅ Respond with 200 OK to prevent Telegram retries
};
