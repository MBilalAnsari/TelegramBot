import bcrypt from 'bcrypt';
import axios from "axios";
// import express from 'express';
import { teleGramAPI } from "../config/botConfig.js";
import User from "../models/user.js"; // Import User model
// import admin from "firebase-admin";
// import serviceAccount from '../serviceKey.json' assert { type: 'json' };
import { registerUserCallback } from './authController.js';
// const client = require('twilio')(accountSid, authToken);
// if (!admin.apps.length) {
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//     });
// }
// // Session cookie duration (e.g., 7 days)
// const app = express();
// app.use(express.json());

// // Middleware to handle requests
// // Middleware to handle requests
// app.post('/create-session', async (req, res) => {
//     const idToken = req.body.idToken; // Ensure you're passing this from the client
//     const sessionCookieDuration = 7 * 24 * 60 * 60 * 1000;  // 7 days in milliseconds

//     if (!idToken) {
//         return res.status(400).send("idToken is required");
//     }

//     try {
//         const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn: sessionCookieDuration });
//         res.status(200).send({ sessionCookie });
//     } catch (error) {
//         console.error("Error during session cookie creation:", error.message);
//         res.status(500).send("Error creating session cookie");
//     }
// });


// Helper to send messages
const sendMessage = async (chatId, text, options) => {
    const payload = {
        chat_id: chatId,
        text: text,
        ...(options && { reply_markup: options }),
    };
    try {
        const response = await axios.post(`${teleGramAPI}/sendMessage`, payload);
        console.log("Message sent successfully:", response.data);
    } catch (error) {
        console.error("Error sending message:", error.response?.data || error.message);
    }
};

// Helper to send photos
const sendPhoto = async (chatId, photoUrl, caption, options) => {
    const payload = {
        chat_id: chatId,
        photo: photoUrl,
        caption: caption,
        ...(options && { reply_markup: options }),
    };
    try {
        const response = await axios.post(`${teleGramAPI}/sendPhoto`, payload);
        console.log("Photo sent successfully:", response.data);
    } catch (error) {
        console.error("Error sending photo:", error.response?.data || error.message);
    }
};
const sendOtp = async (phoneNumber, otp) => {
    // Example using Twilio
    const accountSid = process.env.ACC_SID; // Replace with your Twilio Account SID
    const authToken = process.env.AUTH_OTP; // Replace with your Twilio Auth Token
    const client = twilio(accountSid, authToken);


    await client.messages.create({
        body: `Your verification code is: ${otp}`,
        from: '+1 507 448 6991', // Replace with your Twilio phone number
        to: phoneNumber,
    });
};

export const handleUpdates = async (req, res) => {
    const { message, callback_query } = req.body;

    if (callback_query) {
        const chatId = callback_query.message.chat.id;
        const data = callback_query.data;

        if (data === "cancel_registration") {
            console.log("Cancel registration triggered");

            try {
                // Delete the user from the database using the User model
                await User.findOneAndDelete({ chatId: chatId });

                // Send confirmation message
                const photoUrl = "https://as1.ftcdn.net/v2/jpg/04/54/38/16/1000_F_454381691_37sakwmAos8PKW2GcmplzsE6Q2oz5RIZ.jpg"
                await sendPhoto(chatId, photoUrl, "Your registration has been canceled.", {
                    inline_keyboard: [
                        [{ text: "Main Menu", callback_data: "back" }], // Provide Main Menu button
                    ],
                });

                // Clear flow for this user
                delete req.app.locals.flows[chatId];
            } catch (error) {
                console.error("Error canceling registration:", error.message);
                await sendMessage(chatId, "Sorry, there was an error canceling your registration. Please try again.");
            }
        }
        if (data === "proceed_registration") {
            const flow = req.app.locals.flows[chatId];
            try {
                // Fetch user from the database
                const user = await User.findOne({ chatId: chatId });
                console.log("user", user)
                if (user) {
                    // Generate a Firebase phone auth session
                    const phoneNumber = user.phoneNumber;
                    if (!phoneNumber) {
                        await sendMessage(chatId, "No phone number found for your account. Please register again.");
                        return;
                    }

                    // Firebase Admin SDK: Create a verification token
                    // const sessionInfo = await admin.auth().createSessionCookie(phoneNumber);
                    // req.app.locals.otpSessions = req.app.locals.otpSessions || {};
                    // req.app.locals.otpSessions[chatId] = sessionInfo;

                    await sendMessage(
                        chatId,
                        `"Please enter the verification code sent to your phone number."\n` +
                        `Please Enter your user name`
                    );
                    flow.step = 5; // Update flow step
                } else {
                    await sendMessage(chatId, "User not found. Please start the registration process again.");
                }
            } catch (error) {
                console.error("Error during OTP generation or sending:", error.message);
                await sendMessage(chatId, "Sorry, there was an error. Please try again.");
            }
        }

        if (data === "confirm_continue") {
            const flow = req.app.locals.flows[chatId];
            if (flow && flow.step === 4) {
                await sendMessage(chatId, "Please enter your password:");
            } else {
                await sendMessage(chatId, "Thank you for confirming your details! ?? Your registration is now complete.");
                delete req.app.locals.flows[chatId]; // Clear flow after confirmation
            }
        }

        else if (data === "modify_details") {
            req.app.locals.flows = req.app.locals.flows || {};
            req.app.locals.flows[chatId] = { step: 1 }; // Reset to step 1
            await sendMessage(chatId, "Let's modify your details. Please enter your first name:");
        } else if (data === "connect") {
            await sendMessage(chatId, "You are now connected.", {
                inline_keyboard: [[{ text: "Back", callback_data: "back" }]],
            });
        }
        else if (data === "register") {

            registerUserCallback(req);
        } else if (data === "register_individual") {
            registerUserCallback(req);
        }
        else if (data === "register_business") {
            registerUserCallback(req);
        }
        //  else if (data === "register") {
        //     const photoUrl = "https://cdn.pixabay.com/photo/2023/01/08/14/22/sample-7705350_640.jpg";
        //     await sendPhoto(chatId, photoUrl, "Great! Are you signing up as an individual or a business? ???", {
        //         inline_keyboard: [
        //             [
        //                 { text: "Individual", callback_data: "register_individual" },
        //                 { text: "Business", callback_data: "register_business" },
        //             ],
        //             [{ text: "Back to Menu", callback_data: "back" }],
        //         ],
        //     });
        // } else if (data === "register_individual") {
        //     req.app.locals.flows = req.app.locals.flows || {};
        //     req.app.locals.flows[chatId] = { step: 1, userType: "individual" };
        //     await sendMessage(chatId, "Please enter your first name:");
        // } else if (data === "register_business") {
        //     const photoBusiness = "https://images.prismic.io/monei/41aa97d5-6257-4453-b008-62b8938d65e3_Instant_Payments.jpeg?auto=compress,format&rect=0,0,1200,700&w=1248&h=728";
        //     await sendPhoto(chatId, photoBusiness, "Business account registration will come soon, stay tuned for more updates.", {
        //         inline_keyboard: [[{ text: "Back", callback_data: "back" }]],
        //     });
        // } 
        else if (data === "back") {

            const photoBusiness = "https://www.everee.com/wp-content/uploads/2022/07/1489157_EmailBanner-NewOp2-600x300-300ppi_102822.png";
            await sendPhoto(chatId, photoBusiness, "Hello, how may I help you?", {
                inline_keyboard: [
                    [
                        { text: "Connect Account", callback_data: "connect" },
                        { text: "Register Account", callback_data: "register" },
                    ],
                    [{ text: "Change Language", callback_data: "change_language" }],
                ],
            });
        }
        else if (data === "verify_otp") {
            const flow = req.app.locals.flows[chatId];
            const enteredOtp = message.text; // Assuming OTP is sent as a text message
            const sessionInfo = req.app.locals.otpSessions[chatId];

            try {
                const decodedToken = await admin.auth().verifyIdToken(enteredOtp, sessionInfo);
                if (decodedToken.phone_number) {
                    await sendMessage(chatId, "Your phone number has been successfully verified.");
                    flow.step = 6; // Proceed to the next step
                } else {
                    await sendMessage(chatId, "Invalid OTP. Please try again.");
                }
            } catch (error) {
                console.error("Error verifying OTP:", error.message);
                await sendMessage(chatId, "Verification failed. Please restart the process.");
            }
        }

    }

    if (message) {
        const chatId = message.chat.id;
        const text = message.text.trim();
        req.app.locals.flows = req.app.locals.flows || {};
        const flow = req.app.locals.flows[chatId];

        if (text.toLowerCase() === "hello" && !flow) {
            const photoBusiness = "https://www.everee.com/wp-content/uploads/2022/07/1489157_EmailBanner-NewOp2-600x300-300ppi_102822.png";
            await sendPhoto(chatId, photoBusiness, "Hello, how may I help you?", {
                inline_keyboard: [
                    [
                        { text: "Connect Account", callback_data: "connect" },
                        { text: "Register Account", callback_data: "register" },
                    ],
                    [{ text: "Change Language", callback_data: "change_language" }],
                ],
            });
        }

        if (flow) {
            if (flow.step === 1) {
                flow.firstName = text;
                flow.step = 2;
                await sendMessage(chatId, "Please enter your last name:");
            } else if (flow.step === 2) {
                flow.lastName = text;

                const existingUser = await User.findOne({ chatId: chatId });
                if (existingUser) {
                    await sendMessage(chatId, "It seems you've already registered. Please contact support if this is a mistake.");
                    delete req.app.locals.flows[chatId];
                    return res.sendStatus(200);
                }

                const userData = {
                    chatId: chatId,
                    userType: flow.userType,
                    name: `${flow.firstName} ${flow.lastName}`,
                    firstName: flow.firstName,
                    lastName: flow.lastName,
                };

                try {
                    const newUser = new User(userData);
                    await newUser.save();
                    await sendMessage(chatId, "Thanks! Your information has been saved.");
                    flow.step = 3; // Move to the next step
                    const phoneNumPhoto = "https://nordicfintechmagazine.com/wp-content/uploads/2024/01/Featured-images-NFM-Q1-Issue-PPI-696x413.jpg"
                    await sendPhoto(chatId, phoneNumPhoto, `"Please type your phone number in international format,\n` +
                        `including your country code(e.g ,+4720000000000 for switzerland). ?? "`);
                } catch (error) {
                    console.error("Error saving user:", error.message);
                    await sendMessage(chatId, "Sorry, there was an error saving your information.");
                    delete req.app.locals.flows[chatId];
                }
            } else if (flow.step === 3) {
                const phoneNumber = text;

                try {
                    const user = await User.findOneAndUpdate(
                        { chatId: chatId },
                        { $set: { phoneNumber: phoneNumber } },
                        { new: true }
                    );
                    if (user) {
                        const photoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRey9O8cPfm2sNanVLKjs4IfTdBjKTU9ClsWw&s";
                        const caption = `Here is what we got so far, please review your details:\n\n` +
                            `*First Name*: ${user.firstName}\n` +
                            `*Last Name*: ${user.lastName}\n` +
                            `*Phone*: ${user.phoneNumber}\n\n` +
                            `Does everything look correct?`;
                        flow.step = 4;

                        await sendPhoto(chatId, photoUrl, caption, {
                            inline_keyboard: [
                                [{ text: "Confirm and Continue", callback_data: "confirm_continue" }],
                                [{ text: "Modify Details", callback_data: "modify_details" }],
                                [{ text: "Main Menu", callback_data: "back" }],
                            ],
                        });
                    } else {
                        await sendMessage(chatId, "User not found. Please start the registration again.");
                    }
                } catch (error) {
                    console.error("Error updating phone number:", error.message);
                    await sendMessage(chatId, "Sorry, there was an error saving your phone number.");
                }
            } else if (flow.step === 4) {
                const password = text;  // The password entered by the user
                // console.log("Password received:", text);

                try {
                    // const saltRounds = 10;
                    // const hashedPassword = await bcrypt.hash(text, saltRounds);

                    const user = await User.findOneAndUpdate(
                        { chatId: chatId },
                        // { $set: { password: hashedPassword } },
                        { password: password },
                        { new: true }
                    );
                    // console.log(user ,  "UserfindoneandUpdate " )
                    if (user) {
                        const caption = `"Please take a moment to read the terms and conditions carefully before proceeding.??"\n\n` +
                            `https://insta-pay-ch/terms\n\n` +
                            `By clicking *Proceed* below, you confirm your agreement to the terms and conditions.`
                        await sendMessage(chatId, caption, {
                            inline_keyboard: [
                                [{ text: "Proceed", callback_data: "proceed_registration" }],
                                [{ text: "Cancel registration", callback_data: "cancel_registration" }],
                                [{ text: "Main Menu", callback_data: "register" }]
                            ],
                        });
                        // delete req.app.locals.flows[chatId]; // Clear flow after completion
                    }
                    // else if (flow.step === 5) { // Step for OTP Verification
                    //     const enteredOtp = text;

                    //     if (req.app.locals.otp && req.app.locals.otp[chatId]) {
                    //         const generatedOtp = req.app.locals.otp[chatId];

                    //         if (enteredOtp === generatedOtp.toString()) {
                    //             // OTP verified successfully
                    //             await sendMessage(chatId, "Your phone number has been successfully verified.");
                    //             // flow.step = 6; // Move to the next step
                    //             delete req.app.locals.otp[chatId]; // Clear OTP
                    //         } else {
                    //             // OTP mismatch
                    //             await sendMessage(chatId, "Invalid verification code. Please try again.");
                    //         }
                    //     } else {
                    //         // No OTP generated for this user
                    //         await sendMessage(chatId, "No verification code found. Please restart the process.");
                    //     }
                    // }


                    else if (!flow) {
                        // Handle case when flow is not defined
                        await sendMessage(chatId, "Your session has expired or is invalid. Please start the registration process again.");
                        delete req.app.locals.flows[chatId];
                    }
                }
                catch (error) {
                    console.error("Error setting password:", error.message);
                    await sendMessage(chatId, "Sorry, there was an error setting your password.");
                }
            } else if (flow.step === 5) {
                const userName = text;
                console.log(userName, "debugging")
                try {
                    const user = await User.findOneAndUpdate(
                        { chatId: chatId },
                        { $set: { userName: userName } },
                        { new: true }
                    );

                    if (user) {
                        await sendMessage(chatId, `Thank you, ${userName}! Your registration process is now complete.`);
                        await sendMessage(chatId, `Great \n` +
                            `Enter your city name to complete your Insta-pay profile 🌍🙂`
                        )
                        flow.step = 6
                    } else {
                        await sendMessage(chatId, "Sorry, there was an error with username. Please try again.");
                    }

                    // Registration process complete, clear flow
                    // delete req.app.locals.flows[chatId];
                } catch (error) {
                    console.error("Error updating username:", error.message);
                    await sendMessage(chatId, "Sorry, there was an error updating your username.");
                }
            } else if (flow.step === 6) {
                const cityName = text;
                console.log(cityName, "debugging")
                try {
                    const user = await User.findOneAndUpdate(
                        { chatId: chatId },
                        { $set: { cityName: cityName } },
                        { new: true }
                    );

                    if (user) {
                        const photoUrl = "https://as2.ftcdn.net/jpg/01/80/93/11/1000_F_180931188_nFEllHc5mWtJfeVSPyflfHLQsgbz1ppe.jpg"
                        await sendPhoto(chatId, photoUrl, `All set, ${user.firstName}\n\n` +
                            `Congrats, InstaPay account is ready!\n\n` +
                            `🚀 Start making transactions today and enjoy the convenience.💸💬`
                            , { inline_keyboard: [[{ text: "Insta-Pay Menu", callback_data: "InstapayMenu" }]] });

                    } else {
                        await sendMessage(chatId, "Sorry, there was an error with city name. Please try again.");
                    }

                    // Registration process complete, clear flow
                    delete req.app.locals.flows[chatId];
                } catch (error) {
                    console.error("Error updating  city name:", error.message);
                    await sendMessage(chatId, "Sorry, there was an error updating your city name.");
                }
            }
        }
    }

    res.sendStatus(200);
};