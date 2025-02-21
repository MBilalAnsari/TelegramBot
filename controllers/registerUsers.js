
// import { text } from "body-parser";
import  { sendPhoto, sendMessage, sendButtons,sendReplyKeyboard } from "../utils/messageHelper.js";
export async function registerUsers(chatId, payload, chat, text_message) {
    console.log("text_message in registerUser", text_message)
    // const text_message = data.message.text;
    // console.log("we are checking text", text)
    if (payload === "register_cancel" && chat.last_message?.startsWith("register")) {
        console.log("we are in register cancel")
        const buttonText = "Registration Cancelled";
        const buttons = [
            [{ text: "Connect Account", callback_data: "connect_account" }],
            [{ text: "Register", callback_data: "register" }],
            [{ text: "Change Language", callback_data: "language_change" }],
        ];
        await sendButtons(chatId, buttons, buttonText, "connect");
        console.log("we are in register template") 
    }
    // Agar user "Register" button click karta hai
    else if (payload === "register_template" && chat.last_message?.startsWith("connect")) {
        const buttons = [
            [{ text: "Connect Account", callback_data: "connect_account" }],
            [{ text: "Register", callback_data: "register" }],
            [{ text: "Change Language", callback_data: "language_change" }],
        ];
        await sendButtons(chatId, buttons, "How can we help you today? Let's get started!🚀👇", "register000");

    }
    // Agar user "Register" button click karta hai
    else if (payload === "register" && chat.last_message === "register") {
        console.log("we are in register")
        const buttonText = "Great! Are you signing up as an individual or a business?";
        const buttons = [
            [{ text: "Account Register Ind", callback_data: "register_acc_ind" }],
            [{ text: "Account Register Bus", callback_data: "register_acc_bus" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendPhoto(chatId, "https://nodejs-checking-bucket.s3.amazonaws.com/telegram_bot_images/Select.png");

        await sendButtons(chatId, buttons, buttonText, "register_0");
    }
    // Individual account registration ka flow
    else if (payload === "register_acc_ind" && chat.last_message === "register_0") {
        console.log("we are in register individual")
        const buttons = [
            [{ text: "Cancel Registration", callback_data: "register_cancel" }],
        ];
        await sendPhoto(chatId, "https://nodejs-checking-bucket.s3.amazonaws.com/telegram_bot_images/Individual.png");
        await sendMessage(chatId, "Please enter your first name:", buttons, "register_1");
    }
    // Business account registration ka flow
    else if (payload === "register_acc_bus" && chat.last_message === "register_1") {
        console.log("we are in register business")
        const buttons = [
            [{ text: "Cancel Registration", callback_data: "register_cancel" }],
        ];
        await sendPhoto(chatId, "https://nodejs-checking-bucket.s3.amazonaws.com/telegram_bot_images/Business.png");
        await sendMessage(chatId, "Business account registration will come soon.", buttons, "register_2");
    }
    // Main menu par wapas jane ka option
    else if (payload === "main_menu" || chat.last_message === "register_0"|| chat.last_message?.startsWith("Main Menu 🔙")) {
        console.log("Going to main menu");
        const message = "Welcome back! Need to make a transaction? Select from the options below🚀👇";
        const buttons = [
            [{ text: "Wallet Overview 📒", callback_data: "wallet_overview" }],
            [{ text: "Initiate Payment 💰", callback_data: "initiate_payment" }],
            [{ text: "My Transactions 📑", callback_data: "my_transactions" }],
            [{ text: "QR QuickPay 🔢", callback_data: "qr_quickpay" }],
            [{ text: "My QR Code 🏷️", callback_data: "my_qr_code" }],
            [{ text: "Explore More 🔍", callback_data: "explore_more" }],
            [{ text: "Change Language 🌍", callback_data: "language_change" }],
            [{ text: "Chat with us 💬", callback_data: "chat_with_us" }],
            [{ text: "Run Recieve Req flow", callback_data: "recieve_request" }] //ye ek temp button hai recieve req flow ko run karne ke liye
        ];
          
        await sendButtons(chatId, buttons, message, "Opt_all");
        const mainMenuKeyboard = [
                ["Wallet Overview 📒", "Initiate Payment 💰"],
                ["My Transactions 📑", "QR QuickPay 🔢"],
                ["My QR Code 🏷️", "Explore More 🔍"],
                ["Change Language 🌍", "Main Menu 🔙"],
                ["Chat with us 💬"], // Ensure it's the last button
            ];
            
        
        await sendReplyKeyboard(chatId, mainMenuKeyboard, "Welcome to the Main Menu! Choose an option:", text_message);
        
    }
    // QR QuickPay ka flow
    // else if ((chat.last_message?.startsWith("qr_quickpay")) || (payload?.startsWith("qr_quickpay")) || (payload?.startsWith("qr_quickpay"))) {
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









    // my qr code ka flow 
    else if ((chat.last_message?.startsWith("my_qr_code")) || (payload?.startsWith("my_qr_code")) || (payload === "my_qr_code")) {
        console.log("we are in connect account");
        const message = "Select the Wallet currencey to be credited";
        const buttons = [
            [{ text: "🇵🇰 PKR", callback_data: "Pkr_Curr" }],
            [{ text: "🇺🇸 USD", callback_data: "Usd_Curr" }],
        ]
        await sendPhoto(chatId, "https://miro.medium.com/v2/resize:fit:828/format:webp/1*7cmKvNClOo6K2cHSXsbW3w.png")
        await sendButtons(chatId, buttons, message, "my_qr_code");
    }
    // pkr currency ka flow
    else if ((chat.last_message?.startsWith("Pkr_Curr")) || (payload?.startsWith("Pkr_Curr")) || (payload === "Pkr_Curr")) {
        console.log("we are in Pkr_Curr");
        const message = "PKR QR Code🫡";
        const buttons = [
            [{ text: "🏠 Main Menu", callback_data: "main_menu" }],
        ]
        await sendPhoto(chatId, "https://nmgprod.s3.amazonaws.com/media/files/c4/89/c489299ae466b3478d86d95c60d07b7a/cover_image_1659989989.jpg.760x400_q85_crop_upscale.jpg")
        await sendButtons(chatId, buttons, message, "Pkr_Curr");
    }
    // usd currency ka flow
    else if ((chat.last_message?.startsWith("Usd_Curr")) || (payload?.startsWith("Usd_Curr")) || (payload === "Usd_Curr")) {
        console.log("we are in Pkr_Curr");
        const message = "USD QR Code🫡";
        const buttons = [
            [{ text: "🏠 Main Menu", callback_data: "main_menu" }],
        ]
        await sendPhoto(chatId, "https://nmgprod.s3.amazonaws.com/media/files/c4/89/c489299ae466b3478d86d95c60d07b7a/cover_image_1659989989.jpg.760x400_q85_crop_upscale.jpg")
        await sendButtons(chatId, buttons, message, "Usd_Curr");
    }
  
    // scan qr code ka flow
    // else if ((chat.last_message?.startsWith("scan_qr_code")) || (payload?.startsWith("scan_qr_code")) || (payload === "scan_qr_code")) {
    //     console.log("we are in scan_qr_code");
    //     const message = "Please submit your merchant's QR Code Image from your gallery";
    //     await sendMessage(chatId, message, "scan_qr_code");
    // }

    // yahan se hassan ka code hai


    else if ((chat.last_message?.startsWith("wallet_overview")) || (payload?.startsWith("wallet_overview")) || (payload === "wallet_overview")) {
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
    // Wallet Overview options
    else if ((chat.last_message?.startsWith("add_funds")) || (payload?.startsWith("add_funds")) || (payload === "add_funds")) {
        console.log("we are in add funds");
        const message = "Select your top-up channel:";
        const buttons = [
            [{ text: "PayPal", callback_data: "pay_pal" }],
            [{ text: "Google Pay", callback_data: "google_pay" }],
            [{ text: "Apple Pay", callback_data: "apple_pay" }],
            [{ text: "Other payment method", callback_data: "other_payment_method" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("pay_pal")) || (payload?.startsWith("pay_pal")) || (payload === "pay_pal")) {
        console.log("we are in paypal");
        const message = "This payout channel is not available at the moment.";
        const buttons = [
            [{ text: "Change Method", callback_data: "add_funds" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0");
    }
    else if ((chat.last_message?.startsWith("google_pay")) || (payload?.startsWith("google_pay")) || (payload === "google_pay")) {
        console.log("we are in google pay");
        const message = "This payout channel is not available at the moment.";
        const buttons = [
            [{ text: "Change Method", callback_data: "add_funds" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0");
    }
    else if ((chat.last_message?.startsWith("apple_pay")) || (payload?.startsWith("apple_pay")) || (payload === "apple_pay")) {
        console.log("we are in apple pay");
        const message = "This payout channel is not available at the moment.";
        const buttons = [
            [{ text: "Change Method", callback_data: "add_funds" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0");
    }
    else if ((chat.last_message?.startsWith("other_payment_method")) || (payload?.startsWith("other_payment_method")) || (payload === "other_payment_method")) {
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

    else if ((chat.last_message?.startsWith("convert_funds")) || (payload?.startsWith("convert_funds")) || (payload === "convert_funds")) {
        console.log("we are in convert funds");
        const message = "You do not have multiple currencies available for conversion!\nPlease add your desired currency by clicking below.";
        const buttons = [
            [{ text: "Add Currency", callback_data: "add_currency" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    } else if ((chat.last_message?.startsWith("add_currency")) || (payload?.startsWith("add_currency")) || (payload === "add_currency")) {
        console.log("we are in add currency");
        const message = "Select your preferred Wallet";
        const buttons = [
            [{ text: "USD", callback_data: "usd" }],
            [{ text: "EUR", callback_data: "eur" }],
            [{ text: "GBP", callback_data: "gbp" }],
            [{ text: "INR", callback_data: "inr" }],
            [{ text: "AED", callback_data: "aed" }],
            [{ text: "PHP", callback_data: "php" }],
            [{ text: "ALL", callback_data: "all" }],
            [{ text: "ARS", callback_data: "ars" }],
            [{ text: "XOF", callback_data: "xof" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    // different currencies logics
    else if ((chat.last_message?.startsWith("usd")) || (payload?.startsWith("usd")) || (payload === "usd")) {
        console.log("we are in usd");
        const message = "Please write below the reason for requesting a new USD Currency";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("eur")) || (payload?.startsWith("eur")) || (payload === "eur")) {
        console.log("we are in eur");
        const message = "Please write below the reason for requesting a new EUR Currency";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("gbp")) || (payload?.startsWith("gbp")) || (payload === "gbp")) {
        console.log("we are in gbp");
        const message = "Please write below the reason for requesting a new GBP Currency";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("inr")) || (payload?.startsWith("inr")) || (payload === "inr")) {
        console.log("we are in ind");
        const message = "Please write below the reason for requesting a new INR Currency";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("aed")) || (payload?.startsWith("aed")) || (payload === "aed")) {
        console.log("we are in aed");
        const message = "Please write below the reason for requesting a new AED Currency";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("php")) || (payload?.startsWith("php")) || (payload === "php")) {
        console.log("we are in php");
        const message = "Please write below the reason for requesting a new PHP Currency";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("all")) || (payload?.startsWith("all")) || (payload === "all")) {
        console.log("we are in sar");
        const message = "Please write below the reason for requesting a new ALL Currency";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("ars")) || (payload?.startsWith("ars")) || (payload === "ars")) {
        console.log("we are in ars");
        const message = "Please write below the reason for requesting a new ARS Currency";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("xof")) || (payload?.startsWith("xof")) || (payload === "xof")) {
        console.log("we are in xof");
        const message = "Please write below the reason for requesting a new XOF Currency";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
  
    // my transactions logics here
    else if ((chat.last_message?.startsWith("my_transactions")) || (payload?.startsWith("my_transactions")) || (payload === "my_transactions")) {
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

    // iniate payment logics here  // botcont.js me ha
    // else if ((chat.last_message?.startsWith("initiate_payment")) || (payload?.startsWith("initiate_payment")) || (payload === "initiate_payment")) {
    //     console.log("we are in initiate payment");
    //     const message = "How can I serve you today?🤔👇";
    //     const buttons = [
    //         [{ text: "Send Money", callback_data: "send_money" }],
    //         [{ text: "Request Money", callback_data: "request_money" }],
    //         [{ text: "Send a Quote", callback_data: "send_a_quote" }],
    //         [{ text: "Send Crypto", callback_data: "send_crypto" }],
    //         [{ text: "Main Menu", callback_data: "main_menu" }],
    //     ];
    //     await sendButtons(chatId, buttons, message, "register_0")
    // }
    else if ((chat.last_message?.startsWith("send_money")) || (payload?.startsWith("send_money")) || (payload === "send_money")) {
        console.log("we are in send money");
        const messageInt = "Send Mnoey Internationally to over 130 countries: Security and simplicity for your international transfers.";
        const buttonsInt = [
            [{ text: "International Transfer", callback_data: "international_transfer" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttonsInt, messageInt, "register_0")

        const messageWallet = "Wallet to Wallet Transfer: Instantly exchange funds between users.";
        const buttonsWallet = [
            [{ text: "Wallet to Wallet", callback_data: "wallet_to_wallet" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttonsWallet, messageWallet, "register_0")

        const messageAirTime = "Secure and fast international mobile top-ups";
        const buttonsAirTime = [
            [{ text: "Mobile airtime", callback_data: "mobile_airtime" }],
        ];
        await sendButtons(chatId, buttonsAirTime, messageAirTime, "register_0")
    }
    else if ((chat.last_message?.startsWith("request_money")) || (payload?.startsWith("request_money")) || (payload === "request_money")) {
        console.log("we are in request money");
        const message = `Who would you like to request money from today?\nEnter the InstaPay/Instagram username, mobile number, or email,\nor select from frequently contacted users.\n\nPlease follow these examples:\n\n👤 InstaPay/Instagram Username: instauser\n📧 Email: user@email.com\n📞 Phone Number: 44795396600 (With Country Code)
                        `;
        const buttons = [
            [{ text: "Invite Someone", callback_data: "invite_someone" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    // else if ((chat.last_message?.startsWith("send_a_quote")) || (payload?.startsWith("send_a_quote")) || (payload === "send_a_quote")) {
    //     console.log("we are in send a quote");
    //     const message = "Ready to sendReady to send a quote? Let's get the details right to ensure a smooth transaction.";
    //     const buttons = [
    //         [{ text: "Create Quote", callback_data: "create_quote" }],
    //         [{ text: "Main Menu", callback_data: "main_menu" }],
    //     ];
    //     await sendButtons(chatId, buttons, message, "register_0")
    // }
    else if ((chat.last_message?.startsWith("send_crypto")) || (payload?.startsWith("send_crypto")) || (payload === "send_crypto")) {
        console.log("we are in send crypto");
        const message = "Unlock the future of finance -\n cryptocurrency integration coming soon!";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    // invite someone logic here
    else if ((chat.last_message?.startsWith("invite_someone")) || (payload?.startsWith("invite_someone")) || (payload === "invite_someone")) {
        console.log("we are in invite someone");
        const message = "How would you like to invite?\n\nBy: 👇";
        const buttons = [
            [{ text: "📞 Phone Number", callback_data: "phone_number" }],
            [{ text: "📧 Email", callback_data: "email_btn" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("phone_number")) || (payload?.startsWith("phone_number")) || (payload === "phone_number")) {
        console.log("we are in phone number");
        const message = "Input your phone number. Example: +923001234567";
        await sendMessage(chatId, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("email_btn")) || (payload?.startsWith("email_btn")) || (payload === "email_btn")) {
        console.log("we are in email");
        const message = "Input the email address you want to invite."
        await sendMessage(chatId, message, "register_0")
    }

    // else if ((chat.last_message?.startsWith("send_invitation")) || (payload?.startsWith("send_invitation")) || (payload === "send_invitation")) {
    //     console.log("we are in send invitation");
    //     const message = "Your invite to +923001234567/abc@gmail.com has been sent successfully!";
    //     const messageRef = `Refer & Earn Money with the InstaPay Tiered Affiliation Program\n\n Unlock endless rewards with our Tiered Affiliation Program! Earn commissions based on the activity of your followers on INSTAPAY. The more they transact, the more you earn. Dive into the lucrative world of INSTAPAY and turn influence into affluence`;
    //     // const picture = "https://media.istockphoto.com/id/1313901506/photo/cropped-shot-of-an-african-american-young-woman-using-smart-phone-at-home-smiling-african.jpg?s=612x612&w=0&k=20&c=geSmPOcfVl3aJ13j4XIDG85LZVbOVPhYsCBJ1I0BVrk=";
    //     const buttons = [
    //         [{ text: "Main Menu", callback_data: "main_menu" }],
    //     ];
    //     const buttonsRef = [
    //         [{ text: "Share Referral Link", callback_data: "share_referral_link" }],
    //         [{ text: "Track My Earning", callback_data: "track_my_earning" }],
    //         [{ text: "Learn More", callback_data: "learn_more" }],
    //     ];
    //     await sendButtons(chatId, buttons, message, "register_0");
    //     await sendButtons(chatId, buttonsRef, messageRef, "register_0")
    // }
    else if ((chat.last_message?.startsWith("personalize_message")) || (payload?.startsWith("personalize_message")) || (payload === "personalize_message")) {
        console.log("we are in personalize message");
        const message = "Type your personalized message below:";
        await sendMessage(chatId, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("new_continue_with_user")) || (payload?.startsWith("new_continue_with_user")) || (payload === "new_continue_with_user")) {
        console.log("we are in continue user");
        const message = "Select the currency wallet for receiving the payment";
        const buttons = [
            [{ text: "🇵🇰 PKR", callback_data: "pkr_currency_recieve" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("pkr_currency_recieve")) || (payload?.startsWith("pkr_currency_recieve")) || (payload === "pkr_currency_recieve")) {
        console.log("we are in pkr currency recieve");
        const message = "Please enter the amount you're requesting. Example: 150";
        const buttons = [
            [{ text: "Another wallet", callback_data: "continue_with_user" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("identity_verification") && payload?.startsWith("identity_verification")) || (payload === "identity_verification")) {
        console.log("we are in identity verification");
        const message = `To verify your identity, please follow the below steps.\n\n1⃣ Login to InstaPay web portal.\n\n 2️⃣ Go to settings page and select "Identity verification" option from sub-menu.\n\n3⃣ Type in the requested information and click "Start verification" button.`;
        const messageLogin = `Click below to log in now.`
        const buttons = [
            [{ text: "Login", callback_data: "login" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendMessage(chatId, message, "register_0");
        await sendButtons(chatId, buttons, messageLogin, "register_0");
    }
    else if ((chat.last_message?.startsWith("instant") && payload?.startsWith("instant")) || (payload === "instant")) {
        console.log("we are in instant");
        const message = "Would you like to add more details to this transaction?";
        const buttons = [
            [{ text: "Add a note", callback_data: "add_a_note" }],
            [{ text: "Attach a document", callback_data: "attach_a_document" }],
            [{ text: "Skip", callback_data: "dir_skipped" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("add_a_note") && payload?.startsWith("add_a_note")) || (payload === "add_a_note")) {
        console.log("we are in add a note");
        const message = "Please type your message below. Add any details that help clarify your transaction.";
        await sendMessage(chatId, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("attach_a_document") && payload?.startsWith("attach_a_document")) || (payload === "attach_a_document")) {
        console.log("we are in attach a document");
        const message = "Please attach your document in an image or video format. You can only attach up to 4 images and 1 video, totaling 5 files.";
        await sendMessage(chatId, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("dir_skipped") && payload?.startsWith("dir_skipped")) || (payload === "dir_skipped")) {
        console.log("we are in skip");
        const message = "You're initiating a request for 10.00 PKR to M Bilal Ansari\n\nProceed?";
        const buttons = [
            [{ text: "Confirm", callback_data: "confirm" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("schedule") && payload?.startsWith("schedule")) || (payload === "schedule")) {
        console.log("we are in skip");
        const message = "Schedule your payment by specifying the date and time.";
        const buttons = [
            [{ text: "Select date & time", callback_data: "select_date_time" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("subscription") && payload?.startsWith("subscription")) || (payload === "subscription")) {
        console.log("we are in skip");
        const message = "Please set the start date for this subscription.";
        const buttons = [
            [{ text: "Select date", callback_data: "select_date" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("yes_attach_a_document_req") && payload?.startsWith("yes_attach_a_document_req")) || (payload === "yes_attach_a_document_req")) {
        console.log("we are in yes");
        const message = "Please attach your document.";
        // await sendButtons(chatId, buttons, message, "register_0")
        await sendMessage(chatId, message, "register_0");
    }
    else if ((chat.last_message?.startsWith("confirm") && payload?.startsWith("confirm")) || (payload === "confirm")) {
        console.log("we are in confirm");
        const message = "To send a payment request, please share your location--this helps us boost security and build trust for a smoother experience!";
        const buttons = [
            [{ text: "Share Location", callback_data: "share_location" }],
            [{ text: "Cancel", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    // recieve a request logics here
    else if ((chat.last_message?.startsWith("recieve_request")) || (payload?.startsWith("recieve_request")) || (payload === "recieve_request")) {
        console.log("we are in recieve request");
        const message = `You've received a Payment Request from M.Bilal\nRequest ID: rq_1234567890\nSender Name: M.Bilal\nAmount: 10.00 PKR\nCountry: Pakistan`;
        const buttons = [
            [{ text: "Accept", callback_data: "accept_recieve_request" }],
            [{ text: "Decline", callback_data: "decline_recieve_request" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
        const messageLocation = `The above payment request originated from the below address👇\n\nSaquib Enterprises, South Park Avenue, DHA Phase 2 Extension,Saddar Town Karachi District,Karachi Division, Sindh,75500,Pakistan`
        const buttonsLocation = [
            [{ text: "View Pin Location📍", callback_data: "view_pin_location" }],
        ]
        await sendButtons(chatId, buttonsLocation, messageLocation, "register_0")
    }
    else if ((chat.last_message?.startsWith("decline_recieve_request") && payload?.startsWith("decline_recieve_request")) || (payload === "decline_recieve_request")) {
        console.log("we are in accept recieve request");
        const message = "You have declined this payment request";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("accept_recieve_request") && payload?.startsWith("accept_recieve_request")) || (payload === "accept_recieve_request")) {
        console.log("we are in accept recieve request");
        const message = "Select the payment method you would like to pay with:";
        const buttons = [
            [{ text: "Payment Card", callback_data: "accept_payment_card" }],
            [{ text: "Instapay Wallets", callback_data: "accept_instapay_wallets" }],
            [{ text: "PayPal", callback_data: "accept_pay_pal" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("accept_instapay_wallets") && payload?.startsWith("accept_instapay_wallets")) || (payload === "accept_instapay_wallets")) {
        console.log("we are in accept payment card");
        const message = "Select the wallet currency to be credited.";
        const buttons = [
            [{ text: "🇵🇰 PKR", callback_data: "accept_pkr_currency" }],
            [{ text: "🇪🇺 EUR", callback_data: "accept_eur_currency" }],
            [{ text: "🇬🇧 GBP", callback_data: "accept_gbp_currency" }],
            [{ text: "🇮🇳 INR", callback_data: "accept_inr_currency" }],
            [{ text: "🇦🇪 AED", callback_data: "accept_aed_currency" }],
            [{ text: "🇵🇭 PHP", callback_data: "accept_php_currency" }],
            [{ text: "🇦🇷 ARS", callback_data: "accept_ars_currency" }],
            [{ text: "🇨🇮 XOF", callback_data: "accept_xof_currency" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];

        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("accept_pkr_currency") && payload?.startsWith("accept_pkr_currency")) || (payload === "accept_pkr_currency")) {
        console.log("we are in accept pkr currency");
        const message = "You currently have 100.00 PKR\n\nProceed or choose a different wallet.";
        const buttons = [
            [{ text: "Proceed", callback_data: "proceed_accept_instapay_wallets" }],
            [{ text: "Another wallet", callback_data: "accept_instapay_wallets" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("proceed_accept_instapay_wallets") && payload?.startsWith("proceed_accept_instapay_wallets")) || (payload === "proceed_accept_instapay_wallets")) {
        console.log("we are in proceed accept instapay wallets");
        const message = "Amount to send: 10.00 PKR\n\nFee: 278.93 PKR\n\nRecipent Gets: 10.00 PKR\n\nTotal amount: 283.93 PKR";
        const buttons = [
            [{ text: "Yes, continue", callback_data: "Yes_continue_instapay_wallets" }],
            [{ text: "Cancel", callback_data: "main_menu" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("Yes_continue_instapay_wallets") && payload?.startsWith("Yes_continue_instapay_wallets")) || (payload === "Yes_continue_instapay_wallets")) {
        console.log("we are in yes continue instapay wallets");
        const message = "Please enter the code from your authentication app.";
        const buttons = [
            [{ text: "Send via SMS/email", callback_data: "send_via_sms_email" }],
            [{ text: "Asistance Required", callback_data: "asistance_required" }],
            [{ text: "Cancel", callback_data: "main_menu" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("send_via_sms_email") && payload?.startsWith("send_via_sms_email")) || (payload === "send_via_sms_email")) {
        console.log("we are in send via sms email");
        const message = "Please enter the code sent to your registered number or email.";
        const buttons = [
            [{ text: "Resend OTP", callback_data: "send_via_sms_email" }],
            [{ text: "Asistance Required", callback_data: "asistance_required" }],
            [{ text: "Cancel", callback_data: "main_menu" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ]
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("asistance_required") && payload?.startsWith("asistance_required")) || (payload === "asistance_required")) {
        console.log("we are in asistance required");
        const message = "Please let us know how we can assist you today.";
        const buttons = [
            [{ text: "Login issues", callback_data: "contact_support" }],
            [{ text: "Transaction Query", callback_data: "contact_support" }],
            [{ text: "Profile Setup Help", callback_data: "contact_support" }],
            [{ text: "Other issues", callback_data: "contact_support" }],
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }
    else if ((chat.last_message?.startsWith("contact_support") && payload?.startsWith("contact_support")) || (payload === "contact_support")) {
        console.log("we are in contact support");
        const message = "One of our representatives will get back to you shortly.";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }],
        ];
        await sendButtons(chatId, buttons, message, "register_0")
    }










}    