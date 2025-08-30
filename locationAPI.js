export const fetchAddress = async (zipCodeValue) => {
    try {
        const response = await fetch(`/api/geocode?zipCode=${zipCodeValue}`);

        // Check for network errors and non-200 HTTP status codes
        if (!response.ok) {
            const errorData = await response.json();

            // Return a specific error message based on the status code
            if (response.status === 404) {
                return errorData.error || "Address not found";
            } else if (response.status === 400) {
                return errorData.error || "Invalid zip code format";
            } else {
                return errorData.error || "An API error occurred. Please try again";
            }
        }

        const address = await response.json();
        updateLocation(address);
        return true;
    } catch (error) {
        // Catch network failures
        console.error("Fetch error:", error);
        return "Network error. Please check your connection and try again";
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
