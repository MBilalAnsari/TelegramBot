import { sendPhoto, sendMessage, sendButtons, sendReplyKeyboard } from "../../messageHelper.js"

export async function sendQuote(chatId, callback_query, chat, text_message) {
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
    if ((text_message && chat.last_message?.startsWith("5")) || (callback_query?.startsWith("5")) || (callback_query === "5")) {
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
    if (  text_message && text_message === "dec_qoute" || chat.last_message?.startsWith("dec_qoute ") || callback_query === "dec_qoute") {
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

}