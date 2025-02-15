
// import { text } from "body-parser";
import { sendPhoto, sendMessage, sendButtons } from "../utils/messageHelper.js";
export async function registerUser(chatId, payload, chat ,  text_message) {
    console.log("text_message in registerUser", text_message)
    // const text_message = data.message.text;
    // console.log("we are checking text", text)
    if (payload === "register_cancel" && chat.last_message?.startsWith("register")) {
        console.log("we are in register cancel")
        const buttonText = "Registration Cancelled";
        const buttons = [
            [{ text: "Connect Account", callback_data: "connect_account" }],
            [{ text: "Register", callback_data: "register" }],
            [{ text: "Change Language", callback_data: "language_change" }],
        ];
        await sendButtons(chatId, buttons, buttonText, "connect");
        console.log("we are in register template")
    }
    // Agar user "Register" button click karta hai
    else if (payload === "register_template" && chat.last_message?.startsWith("connect")) {
        const buttons = [
            [{ text: "Connect Account", callback_data: "connect_account" }],
            [{ text: "Register", callback_data: "register" }],
            [{ text: "Change Language", callback_data: "language_change" }],
        ];
        await sendButtons(chatId, buttons, "How can we help you today? Let's get started!🚀👇", "register000");

    }
    // Agar user "Register" button click karta hai
    else if (payload === "register" && chat.last_message === "register") {
        console.log("we are in register")
        const buttonText = "Great! Are you signing up as an individual or a business?";
        const buttons = [
            [{ text: "Account Register Ind", callback_data: "register_acc_ind" }],
            [{ text: "Account Register Bus", callback_data: "register_acc_bus" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendPhoto(chatId, "https://nodejs-checking-bucket.s3.amazonaws.com/telegram_bot_images/Select.png");

        await sendButtons(chatId, buttons, buttonText, "register_0");
    }
    // Individual account registration ka flow
    else if (payload === "register_acc_ind" && chat.last_message === "register_0") {
        console.log("we are in register individual")
        const buttons = [
            [{ text: "Cancel Registration", callback_data: "register_cancel" }],
        ];
        await sendPhoto(chatId, "https://nodejs-checking-bucket.s3.amazonaws.com/telegram_bot_images/Individual.png");
        await sendMessage(chatId, "Please enter your first name:", buttons, "register_1");
    }
    // Business account registration ka flow
    else if (payload === "register_acc_bus" && chat.last_message === "register_1") {
        console.log("we are in register business")
        const buttons = [
            [{ text: "Cancel Registration", callback_data: "register_cancel" }],
        ];
        await sendPhoto(chatId, "https://nodejs-checking-bucket.s3.amazonaws.com/telegram_bot_images/Business.png");
        await sendMessage(chatId, "Business account registration will come soon.", buttons, "register_2");
    }
    // Main menu par wapas jane ka option
    else if (payload === "main_menu" || chat.last_message === "register_0") {
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
        await sendButtons(chatId, buttons, message, "Opt_all");
    }
    // QR QuickPay ka flow
    else if ((chat.last_message?.startsWith("qr_quickpay")) || (payload?.startsWith("qr_quickpay")) || (payload === "qr_quickpay")) {
        console.log("we are in Qr QuickPay");
        const message = "Scan, Pay and Go with Ease Embrance QR code wallet Evolution";
        const buttons = [
            [{ text: "Alphanumeric Code", callback_data: "alpha_num_code" }],
            [{ text: "Scan Qr Code", callback_data: "scan_qr_code" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ]
        await sendPhoto(chatId, "https://miro.medium.com/v2/resize:fit:828/format:webp/1*7cmKvNClOo6K2cHSXsbW3w.png")
        await sendButtons(chatId, buttons, message, "qr_quickpay");
    }









    // my qr code ka flow 
    else if ((chat.last_message?.startsWith("my_qr_code")) || (payload?.startsWith("my_qr_code")) || (payload === "my_qr_code")) {
        console.log("we are in connect account");
        const message = "Select the Wallet currencey to be credited";
        const buttons = [
            [{ text: "🇵🇰 PKR", callback_data: "Pkr_Curr" }],
            [{ text: "🇺🇸 USD", callback_data: "Usd_Curr" }],
        ]
        await sendPhoto(chatId, "https://miro.medium.com/v2/resize:fit:828/format:webp/1*7cmKvNClOo6K2cHSXsbW3w.png")
        await sendButtons(chatId, buttons, message, "my_qr_code");
    }
    // pkr currency ka flow
    else if ((chat.last_message?.startsWith("Pkr_Curr")) || (payload?.startsWith("Pkr_Curr")) || (payload === "Pkr_Curr")) {
        console.log("we are in Pkr_Curr");
        const message = "PKR QR Code🫡";
        const buttons = [
            [{ text: "🏠 Main Menu", callback_data: "main_menu" }],
        ]
        await sendPhoto(chatId, "https://nmgprod.s3.amazonaws.com/media/files/c4/89/c489299ae466b3478d86d95c60d07b7a/cover_image_1659989989.jpg.760x400_q85_crop_upscale.jpg")
        await sendButtons(chatId, buttons, message, "Pkr_Curr");
    }
    // usd currency ka flow
    else if ((chat.last_message?.startsWith("Usd_Curr")) || (payload?.startsWith("Usd_Curr")) || (payload === "Usd_Curr")) {
        console.log("we are in Pkr_Curr");
        const message = "USD QR Code🫡";
        const buttons = [
            [{ text: "🏠 Main Menu", callback_data: "main_menu" }],
        ]
        await sendPhoto(chatId, "https://nmgprod.s3.amazonaws.com/media/files/c4/89/c489299ae466b3478d86d95c60d07b7a/cover_image_1659989989.jpg.760x400_q85_crop_upscale.jpg")
        await sendButtons(chatId, buttons, message, "Usd_Curr");
    }
    // User se QR Code ya Alphanumeric Code mangwana
    else if ((chat.last_message?.startsWith("alpha_num_code")) || (payload?.startsWith("alpha_num_code")) || (payload === "alpha_num_code")) {
        console.log("we are in alpha_num_code");
        const message = "Please enter the alphanumeric wallet code";
        await sendMessage(chatId, message, "alpha_num_code");
    } 
    // scan qr code ka flow
    else if ((chat.last_message?.startsWith("scan_qr_code")) || (payload?.startsWith("scan_qr_code")) || (payload === "scan_qr_code")) {
        console.log("we are in scan_qr_code");
        const message = "Please submit your merchant's QR Code Image from your gallery";
        await sendMessage(chatId, message, "scan_qr_code");
    }











 
}    