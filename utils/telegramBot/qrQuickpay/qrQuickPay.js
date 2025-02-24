import { sendPhoto, sendMessage, sendButtons, sendReplyKeyboard } from "../../messageHelper.js"

export async function quickPay(chatId, callback_query, chat, save_value , image_payloads, data) {
    console.log(callback_query, "callback agayi qr ke ander")
    console.log("datttttttttt" , data)
    console.log("saaaaaave value" , save_value)
    let text_message = save_value
    console.log("texxt value" , text_message)

    if ((chat.last_message?.startsWith("qr_quickpay")) || (callback_query?.startsWith("qr_quickpay")) || (text_message?.startsWith("QR QuickPay 🔢"))) {
        console.log("we are in Qr QuickPay");
        const message = "Scan, Pay and Go with Ease Embrance QR code wallet Evolution";
        const buttons = [
            [{ text: "Alphanumeric Code", callback_data: "alpha_num_code" }],
            [{ text: "Scan Qr Code", callback_data: "scan_qr_code" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ]
        await sendPhoto(chatId, "https://miro.medium.com/v2/resize:fit:828/format:webp/1*7cmKvNClOo6K2cHSXsbW3w.png")
        await sendButtons(chatId, buttons, message);

    }
      // User se QR Code ya Alphanumeric Code mangwana
    if ((chat.last_message?.startsWith("alpha_num_code")) || (callback_query?.startsWith("alpha_num_code")) || (callback_query === "alpha_num_code")) {
        console.log("we are in alpha_num_code");
        const message = "Please enter the alphanumeric wallet code";
        await sendMessage(chatId, message, "qr_quickpay");
    }  
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
    if (text_message && text_message === "10" || callback_query?.startsWith("usd") && callback_query === "usd") {
        console.log("we are in amount_code");
        const message = "Amount to send: 10 PKR\n" +
            "Fee: 0.10 PKR\n" +
            "Total amount: 10.10 PKR";
        const buttons = [
            [{ text: "Yes, Continue", callback_data: "proceed_transfer" }],
            [{ text: "Cancel", callback_data: "cancel_proceed" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        sendButtons(chatId, buttons, message, text_message);
    }
    if (text_message && text_message === "101" || callback_query?.startsWith("101") && callback_query === "101   ") {
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
    if (text_message && text_message === "225566" || chat.last_message?.startsWith("225566") || callback_query === "its_otp") {
        console.log("we are in otp_code");
        const message = "You have successfully sent 10 PKR to Muhammad Yaseen!"
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendPhoto(chatId, "https://images.peopleimages.com/picture/202306/2836772-png-shot-of-a-handsome-young-man-standing-alone-in-the-studio-with-his-finger-on-his-lips-fit_400_400.jpg");
        await sendButtons(chatId, buttons, message, text_message);
    }
    if ((chat.last_message?.startsWith("scan_qr_code")) || (callback_query?.startsWith("scan_qr_code")) || (callback_query === "scan_qr_code")) {
        console.log("we are in scan_qr_code");
        const message = "Please submit your merchant's QR code image from your phone gallery.";
        await sendMessage(chatId, message, "scan_qr_code");
    }
    if ((image_payloads.length > 0)) {
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
   
}