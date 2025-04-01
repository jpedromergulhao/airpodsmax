export const fetchAddress = async (zipCodeValue) => {
    // Base URL based on environment (development or production)
    const isDevelopment = window.location.hostname === 'localhost';
    const baseUrl = isDevelopment
        ? 'http://localhost:3000'  // Local URL for development
        : 'https://airpodsmax-five.vercel.app';  // Vercel production URL

    const url = `${baseUrl}/api/geocode?zipCode=${zipCodeValue}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            const address = data; 
            updateLocation(address);
            return true;
        } else {
            console.error("Error:", data.error || "Address not found in the database");
            return false;
        }
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
};

export const updateLocation = (address) => {
    const location = {
        //zip code formats
        postcode: address.postcode,
        postal_code: address.postal_code,
        country_code: address.country_code,
        //city formats 
        city: address.city,
        normalized_city: address._normalized_city,
        town: address.town,
        normalized_city: address.normalized_city,
        municipality: address.municipality,
        village: address.village,
        suburb: address.suburb,
        // state formats 
        state: address.state,
        region: address.region,
        state_code: address.state_code,
        county: address.county,
        province: address.province,
        territory: address.territory,
        //country formats
        country: address.country,
        country_code: address.country_code
    };

    // Salve in localStorage after state update
    localStorage.setItem("location", JSON.stringify(location));
};

export const getLocation = () => {
    return JSON.parse(localStorage.getItem("location"));
};
