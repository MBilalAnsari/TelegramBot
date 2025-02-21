import { sendPhoto, sendMessage, sendButtons, sendReplyKeyboard } from "../../messageHelper.js"

export async function changeLanguage(chatId, callback_query, chat, text_message) {
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
    else if ((chat.last_message?.startsWith("view_more_pg2")) || (callback_query?.startsWith("view_more_pg2")) || (callback_query === "view_more_pg2")) {
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

}