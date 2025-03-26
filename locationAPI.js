export const fetchAddress = async (zipCodeValue) => {
    //API for generate the location usind the zip code
    const API_KEY = '';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${zipCodeValue}&key=${API_KEY}&language=en&limit=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length > 0) {
            const address = data.results[0].components;
            updateLocation(address);
            return true;
        } else {
            console.error("Address not found in the API data base");
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
