let debounceTimeout; // Debounce to avoid multiple requests in a row

export const fetchCard = async (cardNumberValue) => {
    clearTimeout(debounceTimeout);

    // Only calls the API if the card number has 6 characters
    if (cardNumberValue.length !== 6) {
        // Return a consistent structure for "no-op" cases
        return { success: false, data: null, error: 'Incomplete card number.' };
    }

    return new Promise((resolve) => {
        debounceTimeout = setTimeout(async () => {
            try {
                const response = await fetch(`/api/cardLookup?cardNumber=${cardNumberValue}`);
                const data = await response.json();

                if (!response.ok) {
                    const errorMessage = data.error || (response.status === 429
                        ? "The API limit has been exceeded"
                        : "An API error occurred. Please try again. (You can ignore it)");
                    resolve({ success: false, data: null, error: errorMessage });
                    return;
                }

                const brand = data.scheme;
                const logos = {
                    visa: 'Visa-logo.png',
                    mastercard: 'Mastercard-logo.png',
                    amex: 'American_Express-logo.png',
                    discover: 'Discover-logo.png',
                    jcb: 'JCB-logo.png',
                    diners: 'Diners_Club-logo.png',
                    unionpay: 'UnionPay-logo.png',
                    elo: 'Elo-logo.png',
                    rupay: 'Rupay-logo.png',
                    hipercard: 'Hipercard-logo.png'
                };

                const logo = logos[brand.toLowerCase()] || 'credit_card_logos.png';
                resolve({ success: true, data: { logo: logo }, error: null });

            } catch (error) {
                console.error("Req error: ", error);
                resolve({ success: false, data: null, error: "Network error. Check your connection and try again." });
            }
        }, 500);
    });
};