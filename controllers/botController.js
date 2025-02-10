import bcrypt from 'bcrypt';
import TelegramBot from '../models/user.js';
import User from "../models/user.js"; // Import User model
import { registerUserCallback } from './authController.js';
import { sendPhoto, sendMessage } from "../utils/messageHelper.js";


// export const handleUpdates = async (req, res) => {
//     const { message, callback_query } = req.body;

//     if (callback_query) { 
//         const chatId = callback_query.message.chat.id;
//         const data = callback_query.data;

//         if (data === "cancel_registration") {
//             console.log("Cancel registration triggered");

//             try {
//                 // Delete the user from the database using the User model
//                 await User.findOneAndDelete({ chatId: chatId });

//                 // Send confirmation message
//                 const photoUrl = "https://as1.ftcdn.net/v2/jpg/04/54/38/16/1000_F_454381691_37sakwmAos8PKW2GcmplzsE6Q2oz5RIZ.jpg"
//                 await sendPhoto(chatId, photoUrl, "Your registration has been canceled.", {
//                     inline_keyboard: [
//                         [{ text: "Main Menu", callback_data: "back" }], // Provide Main Menu button
//                     ],
//                 });

//                 // Clear flow for this user
//                 delete req.app.locals.flows[chatId];
//             } catch (error) {
//                 console.error("Error canceling registration:", error.message);
//                 await sendMessage(chatId, "Sorry, there was an error canceling your registration. Please try again.");
//             }
//         }
//         if (data === "proceed_registration") {
//             const flow = req.app.locals.flows[chatId];
//             try {
//                 // Fetch user from the database
//                 const user = await User.findOne({ chatId: chatId });
//                 console.log("user", user)
//                 if (user) {
//                     // Generate a Firebase phone auth session
//                     const phoneNumber = user.phoneNumber;
//                     if (!phoneNumber) {
//                         await sendMessage(chatId, "No phone number found for your account. Please register again.");
//                         return;
//                     }
//                     await sendMessage(
//                         chatId,
//                         "Please enter the verification code sent to your phone number." 
//                     );
//                     flow.step = 5; // Update flow step
//                     console.log("flowstep 5")
//                 } else {
//                     await sendMessage(chatId, "User not found. Please start the registration process again.");
//                 }
//             } catch (error) {
//                 console.error("Error during OTP generation or sending:", error.message);
//                 await sendMessage(chatId, "Sorry, there was an error. Please try again.");
//             }
//         }

//         if (data === "confirm_continue") {
//             const flow = req.app.locals.flows[chatId];
//             if (flow && flow.step === 4) {
//                 await sendMessage(chatId, "Please enter your password:");
//             } else {
//                 await sendMessage(chatId, "Thank you for confirming your details! ?? Your registration is now complete.");
//                 delete req.app.locals.flows[chatId]; // Clear flow after confirmation
//             }
//         }

//         else if (data === "modify_details") {
//             req.app.locals.flows = req.app.locals.flows || {};
//             req.app.locals.flows[chatId] = { step: 1 }; // Reset to step 1
//             await sendMessage(chatId, "Let's modify your details. Please enter your first name:");
//         } else if (data === "connect") {
//             await sendMessage(chatId, "You are now connected.", {
//                 inline_keyboard: [[{ text: "Back", callback_data: "back" }]],
//             });
//         }
//         else if (data === "register") {

//             registerUserCallback(req);
//         } else if (data === "register_individual") {
//             registerUserCallback(req);
//         }
//         else if (data === "register_business") {
//             registerUserCallback(req);
//         }
//         else if (data === "back") {

//             const photoBusiness = "https://www.everee.com/wp-content/uploads/2022/07/1489157_EmailBanner-NewOp2-600x300-300ppi_102822.png";
//             await sendPhoto(chatId, photoBusiness, "Hello, how may I help you?", {
//                 inline_keyboard: [
//                     [
//                         { text: "Connect Account", callback_data: "connect" },
//                         { text: "Register Account", callback_data: "register" },
//                     ],
//                     [{ text: "Change Language", callback_data: "change_language" }],
//                 ],
//             });
//         }
//         else if (data === "verify_otp") {
//             const flow = req.app.locals.flows[chatId];
//             const enteredOtp = message.text; // Assuming OTP is sent as a text message
//             const sessionInfo = req.app.locals.otpSessions[chatId];

//             try {
//                 const decodedToken = await admin.auth().verifyIdToken(enteredOtp, sessionInfo);
//                 if (decodedToken.phone_number) {
//                     await sendMessage(chatId, "Your phone number has been successfully verified.");
//                     flow.step = 6; // Proceed to the next step
//                 } else {
//                     await sendMessage(chatId, "Invalid OTP. Please try again.");
//                 }
//             } catch (error) {
//                 console.error("Error verifying OTP:", error.message);
//                 await sendMessage(chatId, "Verification failed. Please restart the process.");
//             }
//         }

//     }

//     if (message) {
//         const chatId = message.chat.id;
//         const text = message.text.trim();
//         req.app.locals.flows = req.app.locals.flows || {};
//         const flow = req.app.locals.flows[chatId];

//         if (text.toLowerCase() === "hello" && !flow) {
//             const photoBusiness = "https://www.everee.com/wp-content/uploads/2022/07/1489157_EmailBanner-NewOp2-600x300-300ppi_102822.png";
//             await sendPhoto(chatId, photoBusiness, "Hello, how may I help you?", {
//                 inline_keyboard: [
//                     [
//                         { text: "Connect Account", callback_data: "connect" },
//                         { text: "Register Account", callback_data: "register" },
//                     ],
//                     [{ text: "Change Language", callback_data: "change_language" }],
//                 ],
//             });
//         }

//         if (flow) {
//             if (flow.step === 1) {
//                 flow.firstName = text;
//                 flow.step = 2;
//                 await sendMessage(chatId, "Please enter your last name:");
//             } else if (flow.step === 2) {
//                 flow.lastName = text;

//                 const existingUser = await User.findOne({ chatId: chatId });
//                 if (existingUser) {
//                     await sendMessage(chatId, "It seems you've already registered. Please contact support if this is a mistake.");
//                     delete req.app.locals.flows[chatId];
//                     return res.sendStatus(200);
//                 }

//                 const userData = {
//                     chatId: chatId,
//                     userType: flow.userType,
//                     name: `${flow.firstName} ${flow.lastName}`,
//                     firstName: flow.firstName,
//                     lastName: flow.lastName,
//                 };

//                 try {
//                     const newUser = new User(userData);
//                     await newUser.save();
//                     await sendMessage(chatId, "Thanks! Your information has been saved.");
//                     flow.step = 3; // Move to the next step
//                     const phoneNumPhoto = "https://nordicfintechmagazine.com/wp-content/uploads/2024/01/Featured-images-NFM-Q1-Issue-PPI-696x413.jpg"
//                     await sendPhoto(chatId, phoneNumPhoto, `"Please type your phone number in international format,\n` +
//                         `including your country code(e.g ,+4720000000000 for switzerland). ?? "`);
//                 } catch (error) {
//                     console.error("Error saving user:", error.message);
//                     await sendMessage(chatId, "Sorry, there was an error saving your information.");
//                     delete req.app.locals.flows[chatId];
//                 }
//             } else if (flow.step === 3) {
//                 const phoneNumber = text;

//                 try {
//                     const user = await User.findOneAndUpdate(
//                         { chatId: chatId },
//                         { $set: { phoneNumber: phoneNumber } },
//                         { new: true }
//                     );
//                     if (user) {
//                         const photoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRey9O8cPfm2sNanVLKjs4IfTdBjKTU9ClsWw&s";
//                         const caption = `Here is what we got so far, please review your details:\n\n` +
//                             `*First Name*: ${user.firstName}\n` +
//                             `*Last Name*: ${user.lastName}\n` +
//                             `*Phone*: ${user.phoneNumber}\n\n` +
//                             `Does everything look correct?`;
//                         flow.step = 4;

//                         await sendPhoto(chatId, photoUrl, caption, {
//                             inline_keyboard: [
//                                 [{ text: "Confirm and Continue", callback_data: "confirm_continue" }],
//                                 [{ text: "Modify Details", callback_data: "modify_details" }],
//                                 [{ text: "Main Menu", callback_data: "back" }],
//                             ],
//                         });
//                     } else {
//                         await sendMessage(chatId, "User not found. Please start the registration again.");
//                     }
//                 } catch (error) {
//                     console.error("Error updating phone number:", error.message);
//                     await sendMessage(chatId, "Sorry, there was an error saving your phone number.");
//                 }
//             } else if (flow.step === 4) {
//                 const password = text;  // The password entered by the user
//                 // console.log("Password received:", text);

//                 try {
//                     // const saltRounds = 10;
//                     // const hashedPassword = await bcrypt.hash(text, saltRounds);

//                     const user = await User.findOneAndUpdate(
//                         { chatId: chatId },
//                         // { $set: { password: hashedPassword } },
//                         { password: password },
//                         { new: true }
//                     );
//                     // console.log(user ,  "UserfindoneandUpdate " )
//                     if (user) {
//                         const caption = `"Please take a moment to read the terms and conditions carefully before proceeding.??"\n\n` +
//                             `https://insta-pay-ch/terms\n\n` +
//                             `By clicking *Proceed* below, you confirm your agreement to the terms and conditions.`
//                         await sendMessage(chatId, caption, {
//                             inline_keyboard: [
//                                 [{ text: "Proceed", callback_data: "proceed_registration" }],
//                                 [{ text: "Cancel registration", callback_data: "cancel_registration" }],
//                                 [{ text: "Main Menu", callback_data: "register" }]
//                             ],
//                         });
//                         // delete req.app.locals.flows[chatId]; // Clear flow after completion
//                     }


//                     else if (!flow) {
//                         // Handle case when flow is not defined
//                         await sendMessage(chatId, "Your session has expired or is invalid. Please start the registration process again.");
//                         delete req.app.locals.flows[chatId];
//                     }
//                 }
//                 catch (error) {
//                     console.error("Error setting password:", error.message);
//                     await sendMessage(chatId, "Sorry, there was an error setting your password.");
//                 }
//             } else if (flow.step === 5) { // Step for OTP Verification
//                 const enteredOtp = text;

//                     console.log("otp aya kia" , enteredOtp) 
//                     // const generatedOtp = req.app.locals.otp[chatId];

//                     if (enteredOtp === "1234") {
//                         const user = await User.findOneAndUpdate({ chatId: chatId },
//                              { $set: { otpVerified: true } },
//                              { new: true });
//                         // OTP verified successfully
//                         await sendMessage(chatId, "Your phone number has been successfully verified.");
//                         await sendMessage(chatId,"Please Enter your user name")
//                         flow.step = 6; // Move to the next step
//                         // delete req.app.locals.otp[chatId]; // Clear OTP
//                     } else {
//                         // OTP mismatch
//                         await sendMessage(chatId, "Invalid verification code. Please try again.");
//                     }

//             } else if (flow.step === 6) {
//                 const userName = text;
//                 console.log(userName, "debugging")
//                 try {
//                     const user = await User.findOneAndUpdate(
//                         { chatId: chatId },
//                         { $set: { userName: userName } },
//                         { new: true }
//                     );

//                     if (user) {
//                         await sendMessage(chatId, `Thank you, ${userName}! Your registration process is now complete.`);
//                         await sendMessage(chatId, `Great \n` +
//                             `Enter your city name to complete your Insta-pay profile 🌍🙂`
//                         )
//                         flow.step = 7
//                     } else {
//                         await sendMessage(chatId, "Sorry, there was an error with username. Please try again.");
//                     }

//                     // Registration process complete, clear flow
//                     // delete req.app.locals.flows[chatId];
//                 } catch (error) {
//                     console.error("Error updating username:", error.message);
//                     await sendMessage(chatId, "Sorry, there was an error updating your username.");
//                 }
//             } else if (flow.step === 7) {
//                 const cityName = text;
//                 console.log(cityName, "debugging")
//                 try {
//                     const user = await User.findOneAndUpdate(
//                         { chatId: chatId },
//                         { $set: { cityName: cityName } },
//                         { new: true }
//                     );

//                     if (user) {
//                         const photoUrl = "https://as2.ftcdn.net/jpg/01/80/93/11/1000_F_180931188_nFEllHc5mWtJfeVSPyflfHLQsgbz1ppe.jpg"
//                         await sendPhoto(chatId, photoUrl, `All set, ${user.firstName}\n\n` +
//                             `Congrats, InstaPay account is ready!\n\n` +
//                             `🚀 Start making transactions today and enjoy the convenience.💸💬`
//                             , { inline_keyboard: [[{ text: "Insta-Pay Menu", callback_data: "InstapayMenu" }]] });

//                     } else {
//                         await sendMessage(chatId, "Sorry, there was an error with city name. Please try again.");
//                     }

//                     // Registration process complete, clear flow
//                     delete req.app.locals.flows[chatId];
//                 } catch (error) {
//                     console.error("Error updating  city name:", error.message);
//                     await sendMessage(chatId, "Sorry, there was an error updating your city name.");
//                 }
//             }
//         }
//     }

//     res.sendStatus(200);
// };

export const handleUpdates = async (req) => {
    console.log("body ka data", req.body)
    const data = req.body
    let chatId;
    const currentTime = new Date();

    let text_message = null;
    let callback_query = null;
    let edited_message = null;
    let image_payloads = [];
    let video_payloads = [];

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
            // console.log('Image Payloads:', image_payloads);
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
    // else if (data.edited_message) {
    //     edited_message = data.edited_message.text;
    //     console.log('Edited Message:', edited_message);
    // } else {
    //     console.log('Unknown update type:', data);
    // }

    let chat = await TelegramBot.findOne({ recipient: chatId })
    // let selectedLanguage = chat?.selected_language || chat?.account?.language || 'en'

    // if (chat) {

    //     // check if account is active
    //     // if (chat?.account) {
    //     //     if (!chat?.account?.active || chat?.account?.status !== "active") {
    //     //         await sendMessage(chatId, 'This InstaPay account is not active right now!');
    //     //         return;
    //     //     }
    //     // }

    //     // // time expiry
    //     // const lastMessageCheck = isTimeDifferenceGreaterThan30Minutes(chat.last_message_time)
    //     // console.log({ lastMessageCheck })

    //     // if (true) {
    //     //     //  if the account is not connected, then set the last message to connect
    //     //     if (!chat?.account_connected) {
    //     //         await sendMessage(chatId, 'Your session has been expired!', "connect");
    //     //         const buttonText = "How can we help you today? Let's get started!🚀👇"
    //     //         const buttons = [
    //     //             [{ text: lang[selectedLanguage].CONNECT_BUTTON_TITLE, callback_data: "connect_account" }],
    //     //             [{ text: lang[selectedLanguage].REGISTER_BUTTON_TITLE, callback_data: "register" }],
    //     //             [{ text: lang[selectedLanguage].CHANGE_LANGUAGE, callback_data: "language_change" }],
    //     //         ];
    //     //         await sendButtons(chatId, buttonText, buttons);

    //     //         // if the account is connected, then set the last message to 4 (main_menu)
    //     //     } else if (chat?.account_connected) {
    //     //         await sendMessage(chatId, 'Your session has been expired!', "4")
    //     //         await mainMenuMessage(chatId, selectedLanguage)

    //     //     }

    //     //     chat.last_message_time = currentTime;
    //     //     await chat.save();
    //     //     return
    //     // }

    //     chat.last_message_time = currentTime;
    //     await chat.save();
    // }
    // else {
    // chat = new TelegramBot({
    //     recipient: chatId,
    //     last_message_time: currentTime,
    //     last_message: "connect",
    //     account_connected: false,
    //     selected_language: "en"
    // });
    // await chat.save();

    // const buttonText = "How can we help you today? Let's get started!🚀👇"
    // const message = `Hi ${data?.message?.chat?.first_name || data?.callback_query?.message?.chat?.first_name}! 🎉 Welcome to the InstaPay Telegram channel! 💬`;
    // const buttons = [
    //     [{ text: lang[selectedLanguage].CONNECT_BUTTON_TITLE, callback_data: "connect_account" }],
    //     [{ text: lang[selectedLanguage].REGISTER_BUTTON_TITLE, callback_data: "register" }],
    //     [{ text: lang[selectedLanguage].CHANGE_LANGUAGE, callback_data: "language_change" }],
    // ];
    // await sendPhoto(chatId, "https://nodejs-checking-bucket.s3.amazonaws.com/telegram_bot_images/welcome1.png", message);
    // await sendButtons(chatId, buttonText, buttons);
    // return
    // }
    if (text_message === "hello") {
        console.log("text_mess_agya", text_message)
        const photoBusiness = "https://www.everee.com/wp-content/uploads/2022/07/1489157_EmailBanner-NewOp2-600x300-300ppi_102822.png";
        await sendPhoto(chatId, photoBusiness, "Hello, how may I help you?", {
            inline_keyboard: [
                [
                    { text: "qr_code", callback_data: "connect" },
                    { text: "Register Account", callback_data: "register" },
                ],
                [{ text: "Change Language", callback_data: "change_language" }],
            ],
        });
    } else if ((text_message && chat?.last_message?.startsWith("qr_code")) || (callback_query?.startsWith("qr_code") && chat?.last_message?.startsWith("qr_code")) || (callback_query === "qr_code") || (chat?.last_message?.startsWith("qr_code") && (image_payloads.length > 0 || video_payloads.length > 0))) {
        sendMessage(chatId, "Qr_code run")
    }
    else {
        await sendMessage(chatId, "something wrong")
    }




    // flow is related to the qr code



    // OTP Related process
    // if (callback_query === "send_code_via_sms") {
    //     if (chat.last_message === "intl_transfer_card_payment-otp") {
    //         await handleOTPGenerationTG(selectedLanguage, chat, "intl_transfer_card_payment-otp", chat.last_message, "Transaction OTP", true);
    //     }
    //     return
    // }

    // // handling the resending the OTP
    // if (callback_query && callback_query.startsWith("resend_otp_")) {

    //     const context = callback_query.replace("resend_otp_", "");

    //     await handleOTPGenerationTG(selectedLanguage, chat, context, "", context === "confirm_verification" ? "Signup OTP Code" : "Transaction OTP", true);
    //     return
    // }

    // // connection process
    // if ((text_message && chat.last_message?.startsWith("connect")) || (callback_query?.startsWith("connect") && chat.last_message?.startsWith("connect"))) {
    //     await telegramConnection(chatId, callback_query, chat, text_message, selectedLanguage, data)
    //     return
    // }

    // // registeration process
    // if ((text_message && chat.last_message?.startsWith("register")) || (callback_query?.startsWith("register") && (chat.last_message?.startsWith("register") || chat.last_message === "connect"))) {
    //     await accountRegisteration(chatId, callback_query, chat, text_message, selectedLanguage, data)
    //     return
    // }

    // // change language process
    // if ((text_message && chat.last_message?.startsWith("language")) || callback_query?.startsWith("language")) {
    //     await changeLanguage(chatId, callback_query, chat, text_message, selectedLanguage)
    //     return
    // }

    // // initiate_payment process
    // if ((text_message && chat.last_message?.startsWith("i_p"))|| (callback_query?.startsWith("initiate_payment"))|| (callback_query === "initiate_payment")) {
    //     await initiatePayment(chatId, callback_query, chat, text_message, selectedLanguage, data)
    //     return
    // }

    // // international payment process
    // if ((text_message && chat.last_message?.startsWith("intl_transfer"))|| (callback_query?.startsWith("intl_transfer") && chat.last_message?.startsWith("intl_transfer")) || (callback_query === "intl_transfer")|| (chat.last_message?.startsWith("intl_transfer") && (image_payloads.length > 0 || video_payloads.length > 0))) {
    //     await initiateIntlTransfer(chatId, callback_query, chat, text_message, selectedLanguage, data, image_payloads, video_payloads)
    //     return
    // }
    // // w2w payment process
    // if ((text_message && chat.last_message?.startsWith("intl_transfer"))|| (callback_query?.startsWith("intl_transfer") && chat.last_message?.startsWith("intl_transfer"))|| (callback_query === "intl_transfer") || (chat.last_message?.startsWith("intl_transfer") && (image_payloads.length > 0 || video_payloads.length > 0))) {
    //     await initiateW2W(chatId, callback_query, chat, text_message, selectedLanguage, data, image_payloads, video_payloads)
    //     return
    // }

    // // if there is a request to add a payment card
    // if (callback_query === "add_payment_card") {
    //     const backButton = quick_reply?.payload?.split("-")[1];

    //     const message = lang[selectedLanguage].SECURITY_ADVISORY;
    //     const buttons = [
    //         [{ text: lang[selectedLanguage].LOGIN, url: "https://my.insta-pay.ch/auth/login" }],
    //         [{ text: lang[selectedLanguage].MAIN_MENU_MESSAGE, callback_data: "main_menu" }],
    //     ];

    //     if (chat.last_message !== "4") {
    //         buttons.push([{ text: lang[selectedLanguage].BACK_TITLE, callback_data: backButton || "main_menu" }]);
    //     }

    //     return await sendButtons(chatId, message, buttons);
    // }

    // // if there is any random text or button, then show main manu
    // if ((text_message && !callback_query && chat.last_message === "4") || (callback_query === "main_menu")) {
    //     return await mainMenuMessage(chatId, selectedLanguage)
    // }

};