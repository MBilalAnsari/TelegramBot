async function createTransactionInfo(transaction, selectedLanguage) {
    console.log(transaction, "transactionin", selectedLanguage);
    const { sender, receiver, amount, total, fee, createdAt, transaction_type, payment_type, service_type, airtime_number, reference_id, currency, wallet_id, beneficiary } = transaction;
    const formattedDate = formatDate(createdAt);
    const formattedAmount = formatAmount(total, currency, transaction_type);
    const paymentTypeText = formatPaymentType(payment_type, selectedLanguage);
    const formattedFee = formatAmount(fee, currency, transaction_type);

    let partyName;

    if (service_type === "airtime") {
        partyName = airtime_number || "N/A";
    } else if (transaction_type === 'debit') {
        if (service_type === "withdraw_by_admin") {
            partyName = "Admin";
        } else if (service_type === "kyc_verification") {
            partyName = "InstaPay";
        } else if (service_type === "withdrawal") {
            partyName = `${sender?.first_name} ${sender?.last_name}`;
        } else if (receiver) {
            partyName = `${receiver?.first_name} ${receiver?.last_name}`;
        } else if (beneficiary) {
            console.log(beneficiary, "beneficiarycheck")
            const internationalReceiver = await Beneficiary.findById(beneficiary);
            if (internationalReceiver) {
                partyName = `${internationalReceiver.first_name} ${internationalReceiver.last_name}`;
            } else {
                partyName = "N/A";
            }
        } else {
            partyName = "N/A";
        }
    } else if (service_type === "topup") {
        if (receiver) {
            partyName = `${receiver?.first_name} ${receiver?.last_name}`;
        } else {
            partyName = "N/A";
        }
    } else {
        partyName = `${sender?.first_name} ${sender?.last_name}`;
    }

    const transactionType = transaction_type === 'debit' ? lang[selectedLanguage].Debit : lang[selectedLanguage].Credit

    let transactionInfoText = `${new Date(createdAt).toLocaleString()}\n${lang[selectedLanguage].AMOUNT}: ${formattedAmount}\n${transaction_type === 'debit' ? `${lang[selectedLanguage].FEE}: ${formattedFee}\n` : ""}${lang[selectedLanguage].TYPE}: ${transactionType}\n${paymentTypeText}\n`;

    if (transaction_type === 'debit') {
        transactionInfoText += `${lang[selectedLanguage].RECEIVER_NAME} ${partyName}\n${lang[selectedLanguage].TRANSACTION_ID} ${reference_id}\n`;
    } else {
        transactionInfoText += `${lang[selectedLanguage].SENDER_NAME} ${partyName}\n${lang[selectedLanguage].TRANSACTION_ID} ${reference_id}\n`;
    }

    return transactionInfoText;
}
//--- MY-TRANSACTIONS --- //
    if (quick_reply?.payload === "my_transactions" || messaging?.postback?.payload === "my_transactions") {
    const limit = 5;
    const transactions = await Transaction.find({ account: account._id, $or: [{ hidden: { $exists: false } }, { hidden: false }] }).sort({ createdAt: -1 }).limit(limit).populate([
        {
            path: 'account',
            select: 'user company',
            populate: [
                { path: 'user', select: 'first_name last_name' },
                { path: 'company', select: 'company_name' }
            ]
        },
        {
            path: 'sender',
            select: 'user company first_name last_name',
            populate: [
                { path: 'user', select: 'first_name last_name' },
                { path: 'company', select: 'company_name' }
            ]
        },
        {
            path: 'receiver',
            select: 'user company first_name last_name',
            populate: [
                { path: 'user', select: 'first_name last_name' },
                { path: 'company', select: 'company_name' }
            ]
        }
    ]);

    const totalTransactions = await Transaction.countDocuments({ account: account._id });

    const transactionsInfoPromises = transactions.map(transaction => createTransactionInfo(transaction, selectedLanguage));
    const transactionsInfo = await Promise.all(transactionsInfoPromises);
    console.log(transactionsInfo, "transactions");
    const message = `${lang[selectedLanguage].TRANSACTIONS_MESSAGE}${transactionsInfo.join('\n')}`;

    const quickReplies = [
        { content_type: "text", title: lang[selectedLanguage].MAIN_MENU, payload: "main_menu" }
    ];

    if (totalTransactions > limit) {
        quickReplies.unshift({ content_type: "text", title: lang[selectedLanguage].NEXT_BUTTON_TITLE, payload: `next_transactions-${limit}-${limit}` });
    }

    await quickReply(entry.messaging[0], message, quickReplies);

    // const templatePayload = {
    //     template_type: "generic",
    //     elements: [
    //         {
    //             title: "📊 Open Dashboard",
    //             buttons: [
    //                 {
    //                     type: "web_url",
    //                     title: 'Click here',
    //                     url: `https://my.insta-pay.ch/auth/login`,
    //                     webview_height_ratio: "full"
    //                 },

    //             ],
    //         },

    //     ]
    // };

    // await sendTemplate(entry.messaging[0], messaging?.sender?.id, templatePayload)

    instaChatbot.flowFlag = true;
    instaChatbot.flowId = "my_trans";
    await instaChatbot.save();

} else if (quick_reply?.payload.includes("next_transactions-") || quick_reply?.payload.includes("prev_transactions-")) {
    const payloadParts = quick_reply.payload.split('-');
    const skip = parseInt(payloadParts[1]);
    const limit = parseInt(payloadParts[2]);

    const transactions = await Transaction.find({ account: account._id, $or: [{ hidden: { $exists: false } }, { hidden: false }] }).sort({ createdAt: -1 }).limit(limit).populate([
        {
            path: 'account',
            select: 'user company first_name last_name',
            populate: [
                { path: 'user', select: 'first_name last_name' },
                { path: 'company', select: 'company_name' }
            ]
        },
        {
            path: 'sender',
            select: 'user company first_name last_name',
            populate: [
                { path: 'user', select: 'first_name last_name' },
                { path: 'company', select: 'company_name' }
            ]
        },
        {
            path: 'receiver',
            select: 'user company first_name last_name',
            populate: [
                { path: 'user', select: 'first_name last_name' },
                { path: 'company', select: 'company_name' }
            ]
        }
    ]);

    const totalTransactions = await Transaction.countDocuments({ account: account._id });

    const transactionsInfoPromises = transactions.map(transaction => createTransactionInfo(transaction, selectedLanguage));

    const transactionsInfo = await Promise.all(transactionsInfoPromises);
    const message = `${transactionsInfo.join('\n')}`;

    let nextQuickReplies = [
        { content_type: "text", title: lang[selectedLanguage].MAIN_MENU, payload: "main_menu" }
    ];

    if (skip > 0) {
        nextQuickReplies.unshift({ content_type: "text", title: lang[selectedLanguage].PREVIOUS_BUTTON_TITLE, payload: `prev_transactions-${skip - limit > 0 ? skip - limit : 0}-${limit}` });
    }

    if (totalTransactions > skip + limit) {
        nextQuickReplies.unshift({ content_type: "text", title: lang[selectedLanguage].NEXT_BUTTON_TITLE, payload: `next_transactions-${skip + limit}-${limit}` });
    }

    await quickReply(entry.messaging[0], message, nextQuickReplies);

    instaChatbot.flowFlag = true;
    instaChatbot.flowId = "my_trans";
    await instaChatbot.save();
}























function formatCurrency(currency) {
    return currency.symbol;
}

function formatDate(date) {
    return moment(date).format('M/D/YYYY h:mm:ss A');
}

function formatAmount(amount, currency, transactionType) {
    const sign = transactionType === 'credit' ? '+' : '-';

    return `${sign}${formatCurrency(currency)}${Math.abs(amount).toFixed(2)} `;
}
function formatPaymentType(payment_type, selectedLanguage) {
    let paymentTypeText = '';
    if (payment_type === 'payment_request') {
        paymentTypeText = 'Payment Request';
    } else if (payment_type === 'quotation') {
        paymentTypeText = 'Quotation';
    } else if (payment_type === 'payment_address') {
        paymentTypeText = 'Payment Address';
    } else if (payment_type === 'qr_pay') {
        paymentTypeText = 'QR Payment';
    } else if (payment_type.includes('bank')) {
        paymentTypeText = 'Bank Transfer';
    } else if (payment_type.includes('mobile')) {
        paymentTypeText = 'Mobile Money';
    } else if (payment_type === "airtime") {
        paymentTypeText = 'Airtime';
    }
    else {
        paymentTypeText = lang[selectedLanguage].WALLET_TO_WALLET_BUTTON_TITLE;
    }
    return paymentTypeText;
}