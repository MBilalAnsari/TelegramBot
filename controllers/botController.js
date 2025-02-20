import { TelegramBot, User } from "../models/User.js"; // Import User model
import { sendPhoto, sendMessage, sendButtons } from "../utils/messageHelper.js";
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
        await registerUsers(chatId, callback_query, chat, text_message);
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


    // Qr quick pay
    else if ((chat.last_message?.startsWith("qr_quickpay")) || (callback_query?.startsWith("qr_quickpay")) || (text_message?.startsWith("QR QuickPay 🔢"))) {
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
    // Wallet overview ka flow
    else if ((chat.last_message?.startsWith("wallet_overview")) || (callback_query?.startsWith("wallet_overview")) || (text_message?.startsWith("Wallet Overview 📒"))) {
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
    // my transactions logics here
    else if ((chat.last_message?.startsWith("my_transactions")) || (callback_query?.startsWith("my_transactions")) || text_message?.startsWith("My Transactions 📑")) {
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

    // my qr code ka flow 
    else if ((chat.last_message?.startsWith("my_qr_code")) || (callback_query?.startsWith("my_qr_code")) || text_message?.startsWith("My QR Code 🏷️")) {
        console.log("we are in connect account");
        const message = "Select the Wallet currencey to be credited";
        const buttons = [
            [{ text: "🇵🇰 PKR", callback_data: "Pkr_Curr" }],
            [{ text: "🇺🇸 USD", callback_data: "Usd_Curr" }],
        ]
        await sendPhoto(chatId, "https://miro.medium.com/v2/resize:fit:828/format:webp/1*7cmKvNClOo6K2cHSXsbW3w.png")
        await sendButtons(chatId, buttons, message, "my_qr_code");
    }
    // languages view pages logics
     if ((chat.last_message?.startsWith("language_change")) || (callback_query?.startsWith("language_change")) || (text_message?.startsWith("Change Language"))) {
        console.log("we are in language change");
        const message = "Please select the language";
        const buttons = [
            [{ text: "English", callback_data: "english_lang" }],
            [{ text: "Spanish", callback_data: "spanish_lang" }],
            [{ text: "French", callback_data: "french_lang" }],
            [{ text: "German", callback_data: "german_lang" }],
            [{ text: "Hindi", callback_data: "hindi_lang" }],
            [{ text: "Chinese", callback_data: "chinese_lang" }],
            [{ text: "View More", callback_data: "view_more_pg1" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("view_more_pg1")) || (callback_query?.startsWith("view_more_pg1")) || (callback_query === "view_more_pg1")) {
        console.log("we are in view more");
        const message = "Please select the language";
        const buttons = [
            [{ text: "🔙", callback_data: "language_change" }],
            [{ text: "Indonesian", callback_data: "indonesian_lang" }],
            [{ text: "Italian", callback_data: "italian_lang" }],
            [{ text: "Sawahili", callback_data: "sawahili_lang" }],
            [{ text: "Dutch", callback_data: "dutch_lang" }],
            [{ text: "Yoruba", callback_data: "yoruba_lang" }],
            [{ text: "Urdu", callback_data: "urdu_lang" }],
            [{ text: "View More", callback_data: "view_more_pg2" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("view_more_pg2")) || (callback_query?.startsWith( "view_more_pg2")) || (callback_query === "view_more_pg2")) {
        console.log("we are in view more");
        const message = "Please select the language";
        const buttons = [
            [{ text: "🔙", callback_data: "view_more_pg1" }],
            [{ text: "Polish", callback_data: "polish_lang" }],
            [{ text: "Hausa", callback_data: "hausa_lang" }],
            [{ text: "Portuguese", callback_data: "portuguese_lang" }],
            [{ text: "Russian", callback_data: "russian_lang" }],
            [{ text: "Turkish", callback_data: "turkish_lang" }],
            [{ text: "Ukrainian", callback_data: "ukrainian_lang" }],
            [{ text: "Arabic", callback_data: "arabic_lang" }],
            [{ text: "Main Menu", callback_data: "main_menu" }]
        ];

        await sendButtons(chatId, buttons, message, "register_0")
    }
    // languages logics selected by user 
    else if ((chat.last_message?.startsWith("english_lang")) || (callback_query?.startsWith("english_lang")) || (callback_query === "english_lang")) {
        console.log("we are in english");
        const message = "Language changed to English";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("urdu_lang")) || (callback_query?.startsWith("urdu_lang")) || (callback_query === "urdu_lang")) {
        console.log("we are in urdu");
        const message = "Language changed to Urdu";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("spanish_lang")) || (callback_query?.startsWith("spanish_lang")) || (callback_query === "spanish_lang")) {
        console.log("we are in spanish");
        const message = "Language changed to Spanish";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("french_lang")) || (callback_query?.startsWith("french_lang")) || (callback_query === "french_lang")) {
        console.log("we are in french");
        const message = "Language changed to French";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("german_lang")) || (callback_query?.startsWith("german_lang")) || (callback_query === "german_lang")) {
        console.log("we are in german");
        const message = "Language changed to German";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("hindi_lang")) || (callback_query?.startsWith("hindi_lang")) || (callback_query === "hindi_lang")) {
        console.log("we are in hindi");
        const message = "Language changed to Hindi";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("chinese_lang")) || (callback_query?.startsWith("chinese_lang")) || (callback_query === "chinese_lang")) {
        console.log("we are in chinese");
        const message = "Language changed to Chinese";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("indonesian_lang")) || (callback_query?.startsWith("indonesian_lang")) || (callback_query === "indonesian_lang")) {
        console.log("we are in indonesian");
        const message = "Language changed to Indonesian";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("italian_lang")) || (callback_query?.startsWith("italian_lang")) || (callback_query === "italian_lang")) {
        console.log("we are in italian");
        const message = "Language changed to Italian";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("sawahili_lang")) || (callback_query?.startsWith("sawahili_lang")) || (callback_query === "sawahili_lang")) {
        console.log("we are in sawahili");
        const message = "Language changed to Sawahili";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("dutch_lang")) || (callback_query?.startsWith("dutch_lang")) || (callback_query === "dutch_lang")) {
        console.log("we are in dutch");
        const message = "Language changed to Dutch";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("yoruba_lang")) || (callback_query?.startsWith("yoruba_lang")) || (callback_query === "yoruba_lang")) {
        console.log("we are in yoruba");
        const message = "Language changed to Yoruba";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("polish_lang")) || (callback_query?.startsWith("polish_lang")) || (callback_query === "polish_lang")) {
        console.log("we are in polish");
        const message = "Language changed to Polish";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("hausa_lang")) || (callback_query?.startsWith("hausa_lang")) || (callback_query === "hausa_lang")) {
        console.log("we are in hausa");
        const message = "Language changed to Hausa";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("portuguese_lang")) || (callback_query?.startsWith("portuguese_lang")) || (callback_query === "portuguese_lang")) {
        console.log("we are in portuguese");
        const message = "Language changed to Portuguese";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("russian_lang")) || (callback_query?.startsWith("russian_lang")) || (callback_query === "russian_lang")) {
        console.log("we are in russian");
        const message = "Language changed to Russian";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("turkish_lang")) || (callback_query?.startsWith("turkish_lang")) || (callback_query === "turkish_lang")) {
        console.log("we are in turkish");
        const message = "Language changed to Turkish";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("ukrainian_lang")) || (callback_query?.startsWith("ukrainian_lang")) || (callback_query === "ukrainian_lang")) {
        console.log("we are in ukrainian");
        const message = "Language changed to Ukrainian";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("arabic_lang")) || (callback_query?.startsWith("arabic_lang")) || (callback_query === "arabic_lang")) {
        console.log("we are in arabic");
        const message = "Language changed to Arabic";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }

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
    if (text_message && text_message === "225588" || chat.last_message?.startsWith("225588  ") || callback_query === "its_otp") {
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

    // explore more ka flow
    if ((chat.last_message?.startsWith("explore_more")) || (callback_query?.startsWith("explore_more")) || text_message?.startsWith("Explore More")) {
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
    if (text_message && chat.last_message?.startsWith("PKR_Wallet") || (callback_query?.startsWith("PKR_wallet")) || (callback_query === "PKR_Wallet")) {
        console.log("we are in PKR_Wallet");
        const message = `You currently have 89.00\n\nProceed or choose a different wallet.`;
        const buttons = [
            [{ text: "Proceed", callback_data: "Proceed" }],
            [{ text: "Another Wallet", callback_data: "InstaPay_wallet" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    // Usd wallet ka flow
    if (text_message && chat.last_message?.startsWith("USD_Wallet") || (callback_query?.startsWith("USD_wallet")) || (callback_query === "USD_Wallet")) {
        console.log("we are in PKR_Wallet");
        const message = `You currently have 100.00 USD`;
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
            "You can send between 98.15 and 24,538.97.";
        await sendMessage(chatId, message, text_message);
    }
    // airtime insufficent amount ka flow
    if (text_message && text_message === "1000") {
        console.log("we are in Air_time");
        const message = "Insufficient Balance! Please topup your wallet.";
        const buttons = [
            [{ text: "Add Funds", callback_data: "add_funds" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    // pkr airtime amount ka flow
    if (text_message && text_message === "500") {
        console.log("we are in Air_time");
        const message = "Amount to send: 500 PKR\n" +
            "Service: Airtime\n" +
            "Recipent Gets: 459.00 PKR\n" +
            "Country: Pakistan\n" +
            "Operator: Zong Pakistan\n" +
            "Phone: +923112047859"

        const buttons = [
            [{ text: "Confirm Purchase", callback_data: "proceed_transfer" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    // Usd airtime amount ka flow
    if (text_message && text_message === "1") {
        console.log("we are in Air_time");
        const message = "Review your airtime details:\n\n" +
            "Total Cost: 0.95 USD\n" +
            "Amount to send: 1.00 USD\n" +
            "Service: Airtime\n\n" +
            "Recipient Gets: 226.83 PKR\n\n" +
            "Country: Pakistan\n" +
            "Operator: Zong Pakistan\n" +
            "Phone: +923112047859";

        const buttons = [
            [{ text: "Confirm Purchase", callback_data: "proceed_transfer" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    if (text_message && text_message === "225577" || chat.last_message?.startsWith("225577") || callback_query === "its_otp_airtime") {
        console.log("we are in otp_code");
        const message = "You have successfully charged +923112047859";
        const buttons = [
            [{ text: "New Transaction", callback_data: "mobile_airtime" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendPhoto(chatId, "https://images.peopleimages.com/picture/202306/2836772-png-shot-of-a-handsome-young-man-standing-alone-in-the-studio-with-his-finger-on-his-lips-fit_400_400.jpg");
        await sendButtons(chatId, buttons, message, text_message);
    }
    if (text_message && text_message === "225599" || chat.last_message?.startsWith("225599") || callback_query === "its_otp_airtime") {
        console.log("we are in otp_code");
        const message = "You have successfully charged +923112047859\n" +
            "Transaction ID: 1234567890\n" +
            "Amount: 0.95 USD\n" +
            "Recipent Gets: 225.1PKR"
        const buttons = [
            [{ text: "New Transaction", callback_data: "mobile_airtime" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendPhoto(chatId, "https://images.peopleimages.com/picture/202306/2836772-png-shot-of-a-handsome-young-man-standing-alone-in-the-studio-with-his-finger-on-his-lips-fit_400_400.jpg");
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
    } else if ((text_message && chat.last_message?.startsWith("assistan_required")) || (callback_query?.startsWith("assistan_required")) || (callback_query === "assistan_required")) {
        console.log("We are in assistan_required");

        const message = "Please let us know how we can assist you today.";

        const buttons = [
            [{ text: "Login Issues", callback_data: "assist_login_issues" }],
            [{ text: "Transaction Query", callback_data: "assist_transaction_query" }],
            [{ text: "Profile Setup Help", callback_data: "assist_profile_setup" }],
            [{ text: "Other Issue", callback_data: "assist_other_issue" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];

        await sendButtons(chatId, buttons, message, text_message);
    }
    const assistButtons = ["assist_login_issues", "assist_transaction_query", "assist_profile_setup", "assist_other_issue"];

    if ((text_message && assistButtons.includes(chat.last_message)) || (callback_query && assistButtons.includes(callback_query))) {
        console.log("We are in assistance flow");

        const message = "Once of our reprensentatives will get back to youshortly.";

        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }]
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








    // Initiate payment ka flow
    if ((text_message && chat.last_message?.startsWith("initiate_payment")) || (callback_query?.startsWith("initiate_payment")) || text_message?.startsWith("Initiate Payment 💰")) {
        console.log("we are in Initiate Payment 💰");
        const message = "How Can I serve you today?";
        const buttons = [
            [{ text: "Send Money", callback_data: "send_money" }],
            [{ text: "Request Money", callback_data: "request_money" }],
            [{ text: "Send a Quote", callback_data: "send_a_quote" }],
            [{ text: "Send Crypto", callback_data: "send_crypto" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }

    // Send a Quote ka flow
    if ((text_message && chat.last_message?.startsWith("send_a_quote")) || (callback_query?.startsWith("send_a_quote")) || (callback_query === "send_a_quote")) {
        console.log("We are in send_a_quote");

        const message = "Ready to send a quote? Let's get the details right to ensure a smooth transaction.";

        const buttons = [
            [{ text: "Create Quote", callback_data: "create_quote" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];

        await sendButtons(chatId, buttons, message, text_message);
    }
    // Create Quote ka flow
    if ((text_message && chat.last_message?.startsWith("create_quote")) || (callback_query?.startsWith("create_quote")) || (callback_query === "create_quote")) {
        console.log("We are in create_quote");

        const message = "Who will receive your quote today? Please enter their InstaPay/Instagram username, mobile number, or email, or choose from your frequently contacted list.\n\n" +
            "Please follow these examples:\n\n" +
            "👤 InstaPay/Instagram Username: instauser\n" +
            "📧 Email: user@email.com\n" +
            "📞 Phone Number: 44795396600 (With Country Code)";

        const buttons = [
            [{ text: "Invite Someone", callback_data: "invite_someone" }]
        ];

        await sendButtons(chatId, buttons, message, text_message);
    }
    // Invite Someone ka flow
    // if ((text_message && chat.last_message?.startsWith("invite_someone")) || (callback_query?.startsWith("invite_someone")) || (callback_query === "invite_someone")) {
    //     console.log("We are in invite_someone");

    //     const message = "How would you like to invite?\n\nBy: 👇";

    //     const buttons = [
    //         [{ text: "📞 Phone Number", callback_data: "invite_by_phone" }],
    //         [{ text: "📧 Email", callback_data: "invite_by_email" }]
    //     ];

    //     await sendButtons(chatId, buttons, message, text_message);
    // }
    if ((text_message && chat.last_message?.startsWith("alara07")) || (callback_query?.startsWith("alara07")) || (callback_query === "alara07")) {
        console.log("We are in invite_someone");
        const message = "Alara ALi\n" +
            "Username: alara07\n" +
            "Country: Pakistan\n" +
            "Or Select option below"
        const buttons = [
            [{ text: "Continue", callback_data: "continue" }],
            [{ text: "View Profile", callback_data: "view_profile" }],
            [{ text: "Select Different User", callback_data: "create_quote" }],
            [{ text: "Main Menu", callback_data: "main_menu" }]
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    // continue ka flow
    if ((text_message && chat.last_message?.startsWith("continue")) || (callback_query?.startsWith("continue")) || (callback_query === "continue")) {
        console.log("We are in continue");
        const message = "Select the currency wallet for receiving the payment:";
        const buttons = [
            [{ text: "USD", callback_data: "send_qoute" }],
            [{ text: "PKR", callback_data: "send_qoute" }],
            [{ text: "Main Menu", callback_data: "main_menu" }]
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    // send qoute ka flow
    if ((text_message && chat.last_message?.startsWith("send_qoute")) || (callback_query?.startsWith("send_qoute")) || (callback_query === "send_qoute")) {
        console.log("We are in send_qoute");
        const message = "Please enter the amount of your qoute.";
        await sendMessage(chatId, message, text_message);
    }
    // qoute ka req
    if ((text_message && chat.last_message?.startsWith("5")) || (callback_query?.startsWith("100")) || (callback_query === "100")) {
        console.log("We are in qoute");
        const message = "Add the title of your qoute.";
        await sendMessage(chatId, message, text_message);
    }
    // qoute title ka flow
    if ((text_message && chat.last_message?.startsWith("makequote")) || (callback_query?.startsWith("makequote")) || (callback_query === "makequote")) {
        console.log("We are in qoute title");
        const message = "Would you like to add more details to this transaction?"
        const buttons = [
            [{ text: "Add a Note", callback_data: "add_note" }],
            [{ text: "Attach a Document", callback_data: "doc_att" }],
            [{ text: "Skip", callback_data: "skip" }],
            [{ text: "Main Menu", callback_data: "main_menu" }]
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    // Add a Note 
    if ((text_message && text_message === "add_note") || (callback_query?.startsWith("add_note")) || (callback_query === "add_note")) {
        console.log("We are in add_note");
        const message = "Please type your note below to additional details to your qoute.";
        await sendMessage(chatId, message, text_message);
    }
    // After Add a note
    if ((text_message && text_message === "addednote")) {
        console.log("We are in addednote");
        const message = "Would you like to attach a document? It can add more context to your transaction. Supported formats: JPEG, PNG, MP4. You can attach up to 5 files in total, including one video file."
        const buttons = [
            [{ text: "Yes", callback_data: "attach_document" }],
            [{ text: "No", callback_data: "no_document" }],
            [{ text: "Main Menu", callback_data: "main_menu" }]
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    // attach doc 01
    if ((text_message && text_message === "doc_att") || (callback_query?.startsWith("doc_att")) || (callback_query === "doc_att")) {
        console.log("We are in attach_document_01");
        const message = "Please Attach yout Document";
        const buttons = [
            [{ text: "Back", callback_data: "testing" }],
            [{ text: "Main Menu", callback_data: "main_menu" }]
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    // Attach a Document
    if ((text_message && text_message === "attach_document") || (callback_query?.startsWith("attach_document")) || (callback_query === "attach_document")) {
        console.log("We are in attach_document");
        const message = "Please attach your document.";
        await sendMessage(chatId, message, text_message);
    }
    // After Attach a Document
    if (video_payloads.length > 0) {
        console.log("We are in after_attach_document");
        const message = "Would you like to allow bargaining on this quote? It gives the recipient a chance to negotiate the price.";
        const buttons = [
            [{ text: "Yes", callback_data: "yes_skip" }],
            [{ text: "No", callback_data: "yes_skip" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    // No Document
    if ((text_message && text_message === "no_document") || (callback_query?.startsWith("no_document")) || (callback_query === "no_document")) {
        console.log("We are in no_document");
        const message = "Would you like to allow bargaining on this quote? It gives the recipient a chance to negotiate the price."
        const buttons = [
            [{ text: "Yes", callback_data: "yes_skip" }],
            [{ text: "No", callback_data: "no_skip" }],
            [{ text: "Main Menu", callback_data: "main_menu" }]
        ];
        await sendButtons(chatId, buttons, message, text_message)
    }


    // skip ka flow
    if ((text_message && chat.last_message?.startsWith("skip")) || (callback_query?.startsWith("skip")) || (callback_query === "skip")) {
        console.log("We are in skip");
        const message = "Would you like to allow bargaining on this quote? It gives the recipient a chance to negotiate the price.";
        const buttons = [
            [{ text: "Yes", callback_data: "yes_skip" }],
            [{ text: "No", callback_data: "yes_skip" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    // yes skip ka flow
    if ((text_message && chat.last_message?.startsWith("yes_skip")) || (callback_query?.startsWith("yes_skip")) || (callback_query === "yes_skip")) {
        console.log("We are in yes skip");
        const message = "You're initiating a quote request for 10.00 PKR to ihasanalyy\n" +
            "Proceed";
        const buttons = [
            [{ text: "Send a Quote", callback_data: "proceed_transfer" }],
            [{ text: "Edit Quote", callback_data: "create_quote" }],
            [{ text: "Cancel", callback_data: "cancel_qoute" }],
            [{ text: "Main Menu", callback_data: "main_menu" }]
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    // cancel qoute ka flow
    if ((text_message && text_message === "cancel_qoute") || (callback_query?.startsWith("cancel_qoute")) || (callback_query === "cancel_qoute")) {
        console.log("We are in cancel qoute");
        const message = "Your transaction has been cancelled as per your request."
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    if ((text_message && chat.last_message?.startsWith("222555")) || (callback_query?.startsWith("222555")) || (callback_query === "its_otp_qoute")) {
        console.log("We are in its otp qoute");
        const message = "Creating your Qoutation"
        await sendMessage(chatId, message, text_message)
    }
    // qoute otp ka flow
    if ((text_message && chat.last_message?.startsWith("222555")) || (callback_query?.startsWith("222555")) || (callback_query === "its_otp_qoute")) {
        console.log("we are in otp_code");
        const message = "Your qoute has been sent!\n"
        "Quotation ID:qa_1739868978196"
        "Amount: 10.00 PKR\n" +
            "Recipient: ihasanalyy\n" +
            "Date: 2023-10-01\n" +
            "Title: testing"
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
            [{ text: "Accept flow", callback_data: "agree_Quote" }]
        ];
        await sendPhoto(chatId, "https://as1.ftcdn.net/jpg/01/63/74/20/1000_F_163742074_xXiKIiQ75jdQDULESQql7Y1f5uS0XIMK.webp");
        await sendButtons(chatId, buttons, message, text_message);
    }






    //Accept Quote ka flow
    //Accept Quote ka flow
    if ((text_message && chat.last_message?.startsWith("agree_Quote")) || (callback_query?.startsWith("agree_Quote")) || (callback_query === "agree_Quote")) {
        console.log("We are in agree_quote");
        const message = "You've received a new quote from alara07\n" +
            "Amount: 10.00 PKR\n" +
            "Country: Pakistan";
        const buttons = [
            [{ text: "Accept Qoute", callback_data: "accept_qoute" }],
            [{ text: "Decline", callback_data: "dec_qoute" }],
            [{ text: "Negotiate", callback_data: "neg_qoute" }],
        ];
        await sendPhoto(chatId, "https://img.freepik.com/premium-photo/friends-women-with-smartphone-social-media-technology-with-students-campus-online-outdoor-connection-meme-post-with-happiness-communication-with-5g-network-gen-z-youth_590464-130948.jpg")
        await sendButtons(chatId, buttons, message, text_message);
    }
    if (
        text_message && text_message === "dec_qoute" || chat.last_message?.startsWith("dec_qoute ") || callback_query === "dec_qoute") {
        console.log("we are in decline");

        const message = `You've declined the quote from alara07.\n` +
            `No payment will be processed.\n` +
            `Quotation ID: qa_1739960958719\n` +
            `Amount: 12.00 PKR\n` +
            `Title: Test`;
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendPhoto(chatId, "https://img.freepik.com/premium-photo/friends-women-with-smartphone-social-media-technology-with-students-campus-online-outdoor-connection-meme-post-with-happiness-communication-with-5g-network-gen-z-youth_590464-130948.jpg")

        await sendButtons(chatId, buttons, message, text_message);
    }


    if ((text_message && chat.last_message?.startsWith("agree_Quote")) || (callback_query?.startsWith("agree_Quote")) || (callback_query === "agree_Quote")) {
        console.log("We are in accept_quote");
        const message = "Click below to view details"
        const buttons = [
            [{ text: "View Details", callback_data: "view_details" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    if ((text_message && chat.last_message?.startsWith("view_details")) || (callback_query?.startsWith("view_details")) || (callback_query === "view_details")) {
        console.log("We are in View details");
        const message = `Quotation ID: qa_1739960958719\n` +
            `Amount: 10.00 PKR\n` +
            `Title: Test\n` +
            `Description: undefined\n` +
            `Bargain: Allowed`;
        await sendMessage(chatId, message, text_message);
    }
    if ((text_message && chat.last_message?.startsWith("neg_qoute")) || (callback_query?.startsWith("neg_qoute")) || (callback_query === "neg_qoute")) {
        console.log("We are in neg_qoute");
        const message = `Enter your counter offer in PKR, and we'll send it back for approval.`;
        await sendMessage(chatId, message, text_message);
    }
    if ((text_message && chat.last_message?.startsWith("12")) || (callback_query?.startsWith("12")) || (callback_query === "12")) {
        console.log("We are in neg_qoute");
        const message = `Please enter the code sent to your registered number or email.`;
        await sendMessage(chatId, message, text_message);
    }


    if ((text_message && chat.last_message?.startsWith("222111")) || (callback_query?.startsWith("222111")) || (callback_query === "n_otp_qoute")) {
        console.log("we are in otp_code");
        const message =
            `You have successfully submitted a counteroffer in PKR for the quote sent by alara07.\n` +

            `Quotation ID: qa_1739960958719\n` +
            `Bargaining amount: 12.00 PKR\n` +
            `Title: Test\n` +
            `Status: Negotiation in Progress`;
        await sendMessage(chatId, message, text_message);
    }



    //Accept Quote ka flow
    if ((text_message && text_message === "accept_qoute") || (callback_query?.startsWith("accept_qoute")) || (callback_query === "accept_qoute")) {
        console.log("we are in accept-qoute")
        const message = "Select the payment method you would like to pay with:"
        const buttons = [
            [{ text: "InstaPay wallet", callback_data: "Acc_Ins_wallet" }],
            [{ text: "Paypal", callback_data: "Proceed" }],
            [{ text: "Add Payment Card", callback_data: "Add_pay_card" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    if (text_message && chat.last_message?.startsWith("Acc_Ins_wallet") || callback_query?.startsWith("Acc_Ins_wallet") && callback_query === "Acc_Ins_wallet") {
        console.log("we are in instapay_wallet_code");
        const message = "Among the active currencies in your Wallet, select the one to be debited"
        const buttons = [
            [{ text: "PKR", callback_data: "Acc_pkr_wll" }],
            [{ text: "USD", callback_data: "usd" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        sendButtons(chatId, buttons, message, text_message);
    }
    if (text_message && chat.last_message?.startsWith("Acc_pkr_wll") || (callback_query?.startsWith("Acc_pkr_wll")) || (callback_query === "Acc_pkr_wll")) {
        console.log("we are in PKR_Wallet");
        const message = `You currently have 89.00\n\nProceed or choose a different wallet.`;
        const buttons = [
            [{ text: "Proceed", callback_data: "acc_pr" }],
            [{ text: "Another Wallet", callback_data: "accept_qoute" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    if (text_message && chat.last_message?.startsWith("acc_pr") || (callback_query?.startsWith("acc_pr")) || (callback_query === "acc_pr")) {
        console.log("we are in PKR_Wallet");
        const message = `Amount to send: 5:00 PKR\n` +
            `Recipient Gets: 5.00 PKR\n` +
            `Total amount: 5.00 PKR`
        const buttons = [
            [{ text: "Yes, Continue", callback_data: "proceed_transfer" }],
            [{ text: "Cancel", callback_data: "cancel_proceed" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, text_message);
    }
    if (text_message && text_message === "222666" || chat.last_message?.startsWith("222666") || callback_query === "Acc_q_otp") {
        console.log("we are in otp_code");
        const message = `You’ve accepted the quote. The payment will be processed per the agreed terms\n.` +
            `Quotation ID: qa_17398689788169\n` +
            `Amount: 5.00 PKR\n` +
            `Username: alara07\n` +
            `Title: Test`;
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendPhoto(chatId, "https://images.peopleimages.com/picture/202306/2836772-png-shot-of-a-handsome-young-man-standing-alone-in-the-studio-with-his-finger-on-his-lips-fit_400_400.jpg");
        await sendButtons(chatId, buttons, message, text_message);
    }



    // Invite by Phone Number ka flow
    if ((text_message && chat.last_message?.startsWith("invite_by_phone")) || (callback_query?.startsWith("invite_by_phone")) || (callback_query === "invite_by_phone")) {
        console.log("We are in invite_by_phone");

        const message = "Input your phone number. Example: +923292432631";

        await sendMessage(chatId, message, "invite_by_phone");
    }
    // Invite by Phone Number ka flow
    if (text_message && text_message === "+923112047859") {
        console.log("Valid phone number received");

        const message = "Hey, I thought you might be interested in using InstaPay! Here's my invite link:\n" +
            "https://my.insta-pay.ch/auth/signup/ibilalansari";
        const buttons = [
            [{ text: "Send Invitation", callback_data: "send_inv" }],
            [{ text: "Personalize Message", callback_data: "personalized_mess" }],
            [{ text: "Main Menu", callback_data: "main_menu" }]
        ];

        await sendButtons(chatId, buttons, message, text_message);
    }
    // Send Personalize mess
    if ((text_message && chat.last_message?.startsWith("personalized_mess")) || (callback_query?.startsWith("personalized_mess")) || (callback_query === "personalized_mess")) {
        console.log("We are in personalized_mess");

        const message = "Please type your personalized message for the invitee.";

        await sendMessage(chatId, message, text_message);
    }
    // Edit Personalize Mess
    if (text_message && text_message === "addedmess" || chat.last_message?.startsWith("addedmess") || callback_query === "addedmess") {
        console.log("we are in send_inv");
        const message = `Your personalized message preview 👇\n` +
            `addedmess\n` +
            `my.insta-pay.ch/auth/signup/ibilalansari`;
        const buttons = [
            [{ text: "Edit", callback_data: "personalized_mess" }],
            [{ text: "Send Invitation", callback_data: "send_inv" }],
            [{ text: "Main Menu", callback_data: "main_menu" }]
        ];
        await sendPhoto(chatId, "https://images.peopleimages.com/picture/202306/2836772-png-shot-of-a-handsome-young-man-standing-alone-in-the-studio-with-his-finger-on-his-lips-fit_400_400.jpg");
        await sendButtons(chatId, buttons, message, text_message);
    }

    // Send inv 
    if (text_message && text_message === "send_inv" || chat.last_message?.startsWith("send_inv") || callback_query === "send_inv") {
        console.log("we are in send_inv");
        const message = `Your invite to +923112047859 has been sent successfully!\n` +
            `* Refer & Earn Money with the InstaPay Tiered Affiliation Program* \n` +
            `Unlock endless rewards with our Tiered Affiliation Program! Earn commissions based on the activity of your followers on INSTAPAY.The more they transact, the more you earn.Dive into the lucrative world of INSTAPAY and turn influence into affluence.`;
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
            [{ text: "Share Referral Link", callback_data: "share_referral_link" }],
            [{ text: "Track My Earnings", callback_data: "track_my_earnings" }],
            [{ text: "Learn More", callback_data: "learn_more" }],
        ];
        await sendPhoto(chatId, "https://images.peopleimages.com/picture/202306/2836772-png-shot-of-a-handsome-young-man-standing-alone-in-the-studio-with-his-finger-on-his-lips-fit_400_400.jpg");
        await sendButtons(chatId, buttons, message, text_message);
    }

    // invite by Email ka flow
    if ((text_message && chat.last_message?.startsWith("invite_by_email")) || (callback_query?.startsWith("invite_by_email")) || (callback_query === "invite_by_email")) {
        console.log("We are in invite_by_email");

        const message = "Input the email address you want to invite.";

        await sendMessage(chatId, message, "invite_by_email");
    }

    return res.sendStatus(200); // ✅ Respond with 200 OK to prevent Telegram retries
};