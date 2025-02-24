import { sendPhoto, sendMessage, sendButtons, sendReplyKeyboard } from "../../messageHelper.js"


export async function exploreMore(chatId, callback_query, chat, text_message , image_payloads) {
    console.log("text messsssssssssg" , text_message)
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
    // e-sim ka flow
    if ((chat.last_message?.startsWith("e_sim")) || (callback_query?.startsWith("e_sim")) || (callback_query === "e_sim")) {
        console.log("we are in e_sim");
        const message = "Purchase an eSIM 📶 for immediate connection - Global Coverage - Coming Soon!";
        const buttons = [
            [{ text: "Main Menu", callback_data: "main_menu" }]
        ]
        await sendButtons(chatId, buttons, message, "e_sim");
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
}