
import bcrypt from 'bcrypt';
// import TelegramBot from '../models/User.js';
import {TelegramBot,User } from "../models/User.js"; // Import User model
import { registerUserCallback } from './authController.js';
import { sendPhoto, sendMessage, sendButtons } from "../utils/messageHelper.js";
import axios from 'axios';
import { teleGramAPI } from '../config/botConfig.js';
import { registerUser } from './registerUser.js';



// export const handleUpdates = async (req) => {
//     const data = req.body
//     let chatId;
//     const currentTime = new Date();

//     let text_message = null;
//     let callback_query = null;
//     let edited_message = null;
//     let image_payloads = [];
//     let video_payloads = [];

//     if (data.message) {
//         if (data.message.text) {
//             text_message = data.message.text;
//             // console.log('Text Message:', text_message);
//         }
//         if (data.message.photo) {
//             image_payloads = data.message.photo.map(photo => ({
//                 file_id: photo.file_id,
//                 caption: data.message.caption || null
//             }));
//             // console.log('Image Payloads:', image_payloads);
//         }
//         if (data.message.video) {
//             video_payloads = [{
//                 file_id: data.message.video.file_id,
//                 caption: data.message.caption || null,
//                 mime_type: data.message.video.mime_type
//             }];
//             // console.log('Video Payloads:', video_payloads);
//         }
//         chatId = data.message.chat.id.toString()
//     } else if (data.callback_query) {
//         callback_query = data.callback_query.data;
//         chatId = data.callback_query.message.chat.id.toString()
//         console.log('Callback Query agayi', callback_query);
//     }
//     let chat = await TelegramBot.findOne({ recipient: chatId })
//     console.log("chat agayi", chat)

//     // let selectedLanguage = chat?.selected_language || chat?.account?.language || 'en'

//     if (true) {
//         console.log('Chat ID condition true:', chatId);
//         // console.log("chat milega " , chat)
//         // check if account is active
//         // if (chat?.account) {
//         //     if (!chat?.account?.active || chat?.account?.status !== "active") {
//         //         await sendMessage(chatId, 'This InstaPay account is not active right now!');
//         //         return;
//         //     }
//         // }

//         // // time expiry
//         // const lastMessageCheck = isTimeDifferenceGreaterThan30Minutes(chat.last_message_time)
//         // console.log({ lastMessageCheck })

//         // if (true) {
//         //     //  if the account is not connected, then set the last message to connect
//         //     if (!chat?.account_connected) {
//         //         await sendMessage(chatId, 'Your session has been expired!', "connect");
//         //         const buttonText = "How can we help you today? Let's get started!🚀👇"
//         //         const buttons = [
//         //             [{ text: "reg acc", callback_data: "register" }],
//         //             [{ text: "change ln", callback_data: "language_change" }],
//         //             [{ text: "connect acc", callback_data: "connect_account" }],
//         //         ];
//         //         await sendButtons(chatId, buttonText, buttons);

//         //         // if the account is connected, then set the last message to 4 (main_menu)
//         //     } else if (chat?.account_connected) {
//         //         await sendMessage(chatId, 'Your session has been expired!', "4")
//         //         // await mainMenuMessage(chatId, selectedLanguage)

//         //     }

//         //     chat.last_message_time = currentTime;
//         //     await chat.save();
//         //     return
//         // }

//         // chat.last_message_time = currentTime;
//         // await chat.save();
//         // const buttonText = "How can we help you today? Let's get started!🚀👇"
//         // const message = `Hi ${data?.message?.chat?.first_name || data?.callback_query?.message?.chat?.first_name}! 🎉 Welcome to the InstaPay Telegram channel! 💬`;
//         // const buttons = [
//         //     [{ text: "reg acc", callback_data: "connect_account" }],
//         //     [{ text: "change ln", callback_data: "register" }],
//         //     [{ text: "connect acc", callback_data: "language_change" }],
//         // ];
//         // await sendPhoto(chatId, "https://nodejs-checking-bucket.s3.amazonaws.com/telegram_bot_images/welcome1.png", message);
//         // await sendButtons(chatId, buttonText, buttons , chat.last_message );
//         // console.log("chat agayi", chat.last_message)
//         registerUser(chatId,  callback_query,chat);
//     }
//     else {
//         chat = new TelegramBot({
//             recipient: chatId,
//             last_message_time: currentTime,
//             last_message: "connect",
//             // account_connected: false,
//             // selected_language: "en"
//         });
//         await chat.save();

//         const buttonText = "How can we help you today? Let's get started!🚀👇"
//         const message = `Hi ${data?.message?.chat?.first_name || data?.callback_query?.message?.chat?.first_name}! 🎉 Welcome to the InstaPay Telegram channel! 💬`;
//         const buttons = [
//             [{ text: "reg acc", callback_data: "connect_account" }],
//             [{ text: "change ln", callback_data: "register" }],
//             [{ text: "connect acc", callback_data: "language_change" }],
//         ];
//         await sendPhoto(chatId, "https://nodejs-checking-bucket.s3.amazonaws.com/telegram_bot_images/welcome1.png", message);
//         await sendButtons(chatId, buttonText, buttons , chat.last_message );
//     }
//     // if (text_message === "hello") {
//     //     console.log("text_mess_agya", text_message)
//     //     const photoBusiness = "https://www.everee.com/wp-content/uploads/2022/07/1489157_EmailBanner-NewOp2-600x300-300ppi_102822.png";
//     //     await sendPhoto(chatId, photoBusiness, "Hello, how may I help you?", {
//     //         inline_keyboard: [
//     //             [
//     //                 { text: "qr_code", callback_data: "connect" },
//     //                 { text: "Register Account", callback_data: "register" },
//     //             ],
//     //             [{ text: "Change Language", callback_data: "change_language" }],
//     //         ],
//     //     });
//     // } 
//     // else {
//     //     await sendMessage(chatId, "something wrong") 
//     // }

//     // flow is related to the qr code
//     // if ((text_message && chat?.last_message?.startsWith("qr_code")) || (callback_query?.startsWith("qr_code") && chat?.last_message?.startsWith("qr_code")) || (callback_query === "qr_code") || (chat?.last_message?.startsWith("qr_code") && (image_payloads.length > 0 || video_payloads.length > 0))) {
//     //     sendMessage(chatId, "Qr_code run")
//     // }
// };

export const handleUpdates = async (req, res) => {
    // console.log("Received update:", JSON.stringify(req.body, null, 2));

    const data = req.body;
    let chatId;
    const currentTime = new Date();

    let text_message;
    let callback_query = null;

    if (data.message) {
        text_message = data.message.text || null;
        chatId = data.message.chat.id.toString();
    } else if (data.callback_query) {
        callback_query = data.callback_query.data;
        chatId = data.callback_query.message.chat.id.toString();
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
        console.log(text_message , "text chat wala")
        console.log("Previous last_message:", chat.last_message);
        chat.last_message = callback_query || text_message || "unknown";
        chat.last_message_time = currentTime;
        await chat.save();
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
        await sendButtons(chatId,buttons , "Welcome onboard!");
    } else if (callback_query) {
        console.log("Handling callback query:", callback_query); 
        registerUser(chatId, callback_query, chat);
    }

    return res.sendStatus(200); // ✅ Respond with 200 OK to prevent Telegram retries
};