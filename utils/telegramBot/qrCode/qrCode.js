import { sendPhoto, sendMessage, sendButtons, sendReplyKeyboard } from "../../messageHelper.js"


export async function qrCode(chatId, callback_query, chat, text_message) {
       // my qr code ka flow 
        if ((chat.last_message?.startsWith("my_qr_code")) || (callback_query?.startsWith("my_qr_code")) || text_message?.startsWith("My QR Code 🏷️")) {
        console.log("we are in My QrCode");
        const message = "Select the Wallet currencey to be credited";
        const buttons = [
            [{ text: "🇵🇰 PKR", callback_data: "Pkr_Curr" }],
            [{ text: "🇺🇸 USD", callback_data: "Usd_Curr" }],
        ]
        await sendPhoto(chatId, "https://miro.medium.com/v2/resize:fit:828/format:webp/1*7cmKvNClOo6K2cHSXsbW3w.png")
        await sendButtons(chatId, buttons, message, "my_qr_code");
    }
}