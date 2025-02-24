import { TelegramBot, User } from "../models/User.js"; // Import User model
import { sendPhoto, sendMessage, sendButtons } from "../utils/messageHelper.js";
import { changeLanguage } from "../utils/telegramBot/changeLanguage/changeLanguage.js";
import { exploreMore } from "../utils/telegramBot/exploreMore/exlporeMore.js";
import { myTransaction } from "../utils/telegramBot/myTransaction/myTransaction.js";
import { qrCode } from "../utils/telegramBot/qrCode/qrCode.js";
import { quickPay } from "../utils/telegramBot/qrQuickpay/qrQuickPay.js";
import { sendQuote } from "../utils/telegramBot/sendQuote/sendQuote.js";
import { walletOverview } from "../utils/telegramBot/walletOverview/walletOverview.js";
// import { registerUser } from './registerUser.js';
import { registerUsers } from "./registerUsers.js"



export const handleUpdates = async (req, res) => {
    // console.log("Received update:", JSON.stringify(req.body, null, 2));
    // console.log( "body per req kia ai", req.body)

    const data = req.body;
    let chatId;
    const currentTime = new Date();

    let text_message = null;
    let callback_query = null;
    let edited_message = null;
    let image_payloads = [];
    let video_payloads = [];


    //  Find chat data in MongoDB

    if (data.message) {
        if (data.message.text) {
            text_message = data.message.text;
            console.log('Text Message:', text_message);
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

            // chat.last_message =  await TelegramBot.findOneAndUpdate({ last_message: last_message }) || text_message || "unknown";
            chat.last_message = callback_query || text_message || "unknown";
            chat.save_value = chat.last_message;
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
    }
    if (callback_query) {
        console.log("Handling callback query:", callback_query);
        console.log("text_message", text_message)
        console.log("save_value", chat.save_value)
        console.log("lasssssssst" , chat.last_message)
        await registerUsers(chatId, callback_query, chat, text_message);


        await qrCode(chatId, callback_query, chat, text_message)

        await exploreMore(chatId, callback_query, chat, text_message)

        await walletOverview(chatId, callback_query, chat, text_message)

        await changeLanguage(chatId, callback_query, chat, text_message)


        await sendQuote(chatId, callback_query, chat, text_message, video_payloads)
    }

    if (callback_query === "my_transactions") {
        await myTransaction(chatId, callback_query, chat, text_message)
        
    }


    if (chat.save_value?.startsWith("qr_quickpay") || (callback_query?.startsWith("qr_quickpay") || callback_query?.startsWith("QR QuickPay")||(chat.last_message === "qr_quickpay"))) {
        await quickPay(chatId, callback_query, chat, chat.save_value , image_payloads, data);
    }

    // yahan se hassan ka code hai
    // ye cond invite someone ke phone number per hai
    // else if (chat.text?.trim().startsWith("+923001234567") || chat.last_message?.trim().includes("+923001234567") || (chat.last_message === "+923001234567")) {

    //     console.log("we are in phone number received");
    //     const message = `Hey, I thought you might be interested in using InstaPay! Here's my invite link.\n\n invitation_link_here`;
    //     const buttons = [
    //         [{ text: "Send Invitation", callback_data: "send_invitation" }],
    //         [{ text: "Personalize Message", callback_data: "personalize_message" }],
    //         [{ text: "Main Menu", callback_data: "main_menu" }],
    //     ];
    //     await sendButtons(chatId, buttons, message, "register_0")
    // }


    //  pay
    // else if ((chat.last_message?.startsWith("qr_quickpay")) || (callback_query?.startsWith("qr_quickpay")) || (text_message?.startsWith("QR QuickPay 🔢"))) {
    //     console.log("we are in Qr QuickPay");
    //     const message = "Scan, Pay and Go with Ease Embrance QR code wallet Evolution";
    //     const buttons = [
    //         [{ text: "Alphanumeric Code", callback_data: "alpha_num_code" }],
    //         [{ text: "Scan Qr Code", callback_data: "scan_qr_code" }],
    //         [{ text: "Main Menu", callback_data: "main_menu" }],
    //     ]
    //     await sendPhoto(chatId, "https://miro.medium.com/v2/resize:fit:828/format:webp/1*7cmKvNClOo6K2cHSXsbW3w.png")
    //     await sendButtons(chatId, buttons, message, "qr_quickpay");
    // }
    // Wallet overview ka flow





    // ye cond invite someone ke email per hai
    else if (chat.last_message?.startsWith("abc@gmail.com") && chat.last_message?.includes("abc@gmail.com")) {

        console.log("we are in email received");
        const message = `Hey, I thought you might be interested in using InstaPay! Here's my invite link.\n\n invitation_link_here`;
        const buttons = [
            [{ text: "Send Invitation", callback_data: "send_invitation" }],
            [{ text: "Personalize Message", callback_data: "personalize_message" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    // ye cond invite someone ke personalize message per hai
    else if ((chat.last_message?.startsWith("Hello") && chat.last_message?.includes("Hello")) || (chat.last_message === "Hello")) {

        console.log("we are in personalize message received");
        const message = `Your personalizeed message preview👇\n\n ${chat.last_message}\n\n my.insta-pay.ch/auth/signup/ihasanalyy`;
        const buttons = [
            [{ text: "Edit", callback_data: "personalize_message" }],
            [{ text: "Send invitation", callback_data: "send_invitation" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if (chat.last_message?.startsWith("ibilalansari") && chat.last_message?.includes("ibilalansari") || (chat.last_message === "ibilalansari") || (chat.last_message === "ibilalansari@gmail.com") || (chat.last_message === "+92123456789")) {

        console.log("we are in email received");
        const message = `(profile URL) M Bilal Ansari\n Username: ibilalansari\n Country: Pakistan`;
        const buttons = [
            [{ text: "Continue", callback_data: "new_continue_with_user" }],
            [{ text: "View profile", callback_data: "view_profile" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
        const messageOption = `Or select preferred option below`;
        const buttonsOption = [
            [{ text: "Choose another", callback_data: "request_money" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttonsOption, messageOption, "register_0")
    }
    else if ((chat.last_message?.startsWith("150") || chat.last_message?.includes("150")) && chat.last_message >= 150) {
        console.log("we are in currency send money");
        const message = "Completing this transaction will exceed your balance limit of 13,505.30 PKR. Please enter an amount within your balance limit or complete KYC verification to increase your balance limit.";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
            [{ text: "Identity Verification", callback_data: "identity_verification" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0");
    }
    else if ((chat.last_message?.startsWith("20") || chat.last_message?.includes("20")) && chat.last_message < 150) {
        console.log("we are in currency send money");
        const message = "What's your transaction today? Choose the type of payment request that works for you:";

        await sendMessage(chatId, message, "register_0");
        const message1 = "Simple, immediate, and secure daily transactions.";
        const message2 = "Stop chasing payments,opt for automatic debiting!";
        const message3 = "Receive your payments on time, no more waiting!";

        const buttons1 = [
            [{ text: "Instant", callback_data: "instant" }],
            [{ text: "Back", callback_data: "request_money" }],
        ];
        const buttons2 = [
            [{ text: "Subscription", callback_data: "subscription" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        const buttons3 = [
            [{ text: "Schedule", callback_data: "schedule" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons1, message1, "register_0");
        await sendButtons(chatId, buttons2, message2, "register_0");
        await sendButtons(chatId, buttons3, message3, "register_0");
    }
    else if (chat.last_message?.startsWith("test") || chat.last_message?.includes("test") || chat.last_message === "test") {
        console.log("we are in test");
        const message = "Would you like to attach a document? It can add more context to your transaction. Supported formats: JPEG, PNG, MP4. You can attach up to 5 files in total, including one video file.";
        const buttons = [
            [{ text: "Yes", callback_data: "yes_attach_a_document_req" }],
            [{ text: "No", callback_data: "dir_skipped" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    // ye condition single pic anay per chalegi db se handle hogi
    // else if ((image_payloads.length > 0)) {
    //     console.log("we are in iniating request");
    //     const message = "You're initiating a request for 10.00 PKR to M Bilal Ansari\n\nProceed?";
    //     const buttons = [
    //         [{ text: "Confirm", callback_data: "confirm" }],
    //         [{ text: "Main Menu", callback_data: "main_menu" }],
    //     ];
    //     await sendButtons(chatId, buttons, message, "register_0")
    // }
    // ye condtion multiple pics anay se chalegi db se handle hogi
    // else if ((image_payloads.length > 0)) {
    //     console.log("we are in instant payment");
    //     const message = "Do you wish to attach a note to this payment request?";
    //     const buttons = [
    //         [{ text: "Yes", callback_data: "add_a_note" }],
    //         [{ text: "No", callback_data: "dir_skipped" }],
    //     ];
    //     await sendButtons(chatId, buttons, message, "register_0");
    // }
    else if ((chat.last_message?.startsWith("hi") && chat.last_message?.includes("hi")) || (chat.last_message === "hi")) {
        console.log("we are in skip");
        const message = "You're initiating a request for 10.00 PKR to M Bilal Ansari\n\nProceed?";
        const buttons = [
            [{ text: "Confirm", callback_data: "confirm" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    // OTP logic static
    else if (chat.last_message?.startsWith("123456") || chat.last_message?.includes("123456") || (chat.last_message === "123456")) {
        console.log("we are in OTP received");
        const message = "You have accepted the payment request.\nTransaction ID: tr_123456789";
        const buttons = [
            [{ text: "Leave a comment", callback_data: "leave_a_comment" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }

    // yahan se bilal ka code hai
    // last message starts with 
    // console.log("chat.last_message", chat.last_message);
    // console.log("text_message", text_message);











    if (text_message && text_message === "225588" || chat.last_message?.startsWith("225588") || callback_query === "its_otp") {
        console.log("we are in otp_code");
        const message = "You have successfully sent 10 PKR to Hasan Ali!"
        const buttons = [
            // [{ text: "Scan QR Code", callback_data: "scan_qr_code" }],
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







    //











    return res.sendStatus(200); // ✅ Respond with 200 OK to prevent Telegram retries
};