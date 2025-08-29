let debounceTimeout; // Debounce to avoid multiple requests in a row

export const fetchCard = async (cardNumberValue) => {
    clearTimeout(debounceTimeout);

    if (cardNumberValue.length < 6) return; //Only calls the API if the card number has 6 characters

    debounceTimeout = setTimeout(async () => {
        // Base URL based on environment (development or production)
        const isDevelopment = window.location.hostname === 'localhost';
        const baseUrl = isDevelopment
            ? 'http://localhost:3000'  // Local URL for development
            : 'https://airpodsmax-five.vercel.app';  // Vercel production URL

        const url = `${baseUrl}/api/cardLookup?cardNumber=${cardNumberValue}`

        try {
            const response = await fetch(url, {
                method: 'GET'
            });

            if (!response.ok){
                const errorData = await response.json();

                if (response.status === 429){
                    return errorData.error || "The limit for this API has been exceeded";
                } else {
                    return errorData.error || "An API error occurred. Please try again";
                }
            }

            const data = await response.json();
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

            const logo = logos[brand] || 'credit_card_logos.png';
            localStorage.setItem("logo", logo);
            return true;
        } catch (error) {
            if (error.name === 'AbortError') {
                console.warn("Request canceled.");
            } else {
                console.error("Request error: ", error);
                return "Network error. Please check your connection and try again";
            }

            return false;
        }
    }, 500); //Only makes the call 500ms after stopping typing
};