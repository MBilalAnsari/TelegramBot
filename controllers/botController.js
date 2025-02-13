import {TelegramBot,User } from "../models/User.js"; // Import User model
import { registerUserCallback } from './authController.js';
import { sendPhoto, sendMessage, sendButtons } from "../utils/messageHelper.js";
import axios from 'axios';
import { registerUser } from './registerUser.js';


export const handleUpdates = async (req, res) => {
    console.log("Received update:", JSON.stringify(req.body, null, 2));

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