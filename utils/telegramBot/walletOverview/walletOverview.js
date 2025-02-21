import { sendPhoto, sendMessage, sendButtons, sendReplyKeyboard } from "../../messageHelper.js"
export async function walletOverview(chatId, callback_query, chat, text_message) {
    if ((chat.last_message?.startsWith("wallet_overview")) || (callback_query?.startsWith("wallet_overview")) || (text_message?.startsWith("Wallet Overview 📒"))) {
        console.log("we are in wallet overview");
        const message = "🇵🇰 Wallet Currency: PKR\n💳 Wallet ID: 5RMIOSO7\n💰 Wallet Balance: Rs0.00";
        const buttons = [
            [{ text: "Add Funds", callback_data: "add_funds" }],
            [{ text: "Convert Funds", callback_data: "convert_funds" }],
            [{ text: "Add Currency", callback_data: "add_currency" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0");
    }
}