import { fetchAddress, getLocation } from "./locationAPI.js";

document.addEventListener('DOMContentLoaded', () => {

  //Getting data from the local storage
  const bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];

  // If the shopping bag is empty, return to the home page
  if (bagItems.length === 0) {
    alert('Your bag is empty, please add a product');
    window.location.href = './index.html';
  }

  const totalPrice = localStorage.getItem("totalPrice") || "0";
  const totalGrand = document.querySelector(".price");
  const actionArea = document.querySelector(".actionArea");
  const zipForm = document.querySelector("#zipForm");

  if (!zipForm) renderZipCodeSection();

  let itiLibrary;

  // Updating the total grand
  if (totalGrand) {
    totalGrand.textContent = `$${totalPrice}.00`;
  }

  // Removes any char that is not a number
  function removeLetters(event) {
    const input = event.target;
    input.value = input.value.replace(/\D/g, '');
  }

  // Start - Manipulation of the action area

  // Delivery area
  zipForm.addEventListener("submit", handleZipCodeSubmit);

  function handleZipCodeSubmit(event) {
    event.preventDefault();
    const zipCode = document.getElementById('zipCode');
    const zipCodeValue = zipCode.value.trim();

    zipCode.setCustomValidity("");
    zipCode.reportValidity();

    if (!validateZipCode(zipCodeValue)) {
      showZipCodeError(zipCode);
      return;
    }

    processZipCode(zipCode, zipCodeValue);
  }

  function validateZipCode(zipCodeValue) {
    return zipCodeValue !== "";
  }

  async function processZipCode(zipCode, zipCodeValue) {
    try {
      // Wait for the API response
      const success = await fetchAddress(zipCodeValue);

      if (!success) {
        showZipCodeError(zipCode);
        return;
      }

      const location = getLocation();

      if (!location || !(location.city || location.town || location._normalized_city || location.normalized_city || location.county || location.municipality || location.village || location.suburb)) {
        showZipCodeError(zipCode);
        return;
      }

      renderDeliveryArea(location);
    } catch (error) {
      console.error("Error in processZipCode:", error);
    }
  }

  function showZipCodeError(zipCode) {
    zipCode.setCustomValidity("Please, provide a valid ZIP code");
    zipCode.reportValidity();
    zipCode.value = "";

    setTimeout(() => {
      zipCode.setCustomValidity("");
    }, 100);
  }

  function renderZipCodeSection() {
    const existingZipCodeSection = document.querySelector('.zipCodeSection');
    if (existingZipCodeSection) {
      existingZipCodeSection?.remove();
    }

    // Create the main container for the ZIP code section
    const zipCodeSection = document.createElement('div');
    zipCodeSection.classList.add('zipCodeSection');

    // Create the container inside the ZIP code section
    const zipCodeContainer = document.createElement('div');
    zipCodeContainer.classList.add('zipCodeContainer');

    // Create and add the heading
    const heading = document.createElement('h1');
    heading.textContent = 'Here are your delivery details.';
    zipCodeContainer.appendChild(heading);

    // Create the form element
    const form = document.createElement('form');
    form.id = 'zipForm';
    form.addEventListener("submit", handleZipCodeSubmit);

    // Create and add the label for ZIP code input
    const label = document.createElement('label');
    label.setAttribute('for', 'zipCode');
    label.textContent = 'Enter a ZIP code to see delivery options.';
    form.appendChild(label);

    // Create the ZIP code input area
    const zipCodeArea = document.createElement('div');
    zipCodeArea.classList.add('zipCodeArea');

    // Create the input wrapper
    const inputWrapper = document.createElement('div');
    inputWrapper.classList.add('inputWrapper');

    // Create the ZIP code input field
    const zipCodeInput = document.createElement('input');
    zipCodeInput.classList.add('zipCodeInput');
    zipCodeInput.type = 'text';
    zipCodeInput.id = 'zipCode';
    zipCodeInput.name = 'zipCode';
    zipCodeInput.placeholder = 'ZIP Code';
    zipCodeInput.maxLength = 10;
    zipCodeInput.required = true;

    // Create the apply button
    const applyButton = document.createElement('button');
    applyButton.type = 'submit';
    applyButton.classList.add('applyButton');
    applyButton.textContent = 'Apply';

    // Append input and button to inputWrapper
    inputWrapper.appendChild(zipCodeInput);
    inputWrapper.appendChild(applyButton);

    // Append inputWrapper to zipCodeArea
    zipCodeArea.appendChild(inputWrapper);

    // Append zipCodeArea to form
    form.appendChild(zipCodeArea);

    // Append form to zipCodeContainer
    zipCodeContainer.appendChild(form);

    // Append zipCodeContainer to zipCodeSection
    zipCodeSection.appendChild(zipCodeContainer);

    // Append the entire ZIP code section to the body or a specific container
    actionArea.appendChild(zipCodeSection);
  }

  const renderDeliveryArea = (location) => {

    const existingDeliverArea = document.querySelector(".deliverArea");
    const existingReviewArea = document.querySelector('.review');
    const existingZipCodeSection = document.querySelector('.zipCodeSection');

    if (existingDeliverArea || existingReviewArea) {
      existingDeliverArea?.remove();
      existingReviewArea?.remove();
    }

    if (!existingZipCodeSection) renderZipCodeSection();

    // Creating the delivery area container
    const deliverAreaDiv = document.createElement("div");
    deliverAreaDiv.setAttribute("class", "deliverArea");

    const stockH2 = document.createElement("h2");
    stockH2.setAttribute("class", "stock");
    stockH2.textContent = "In stock and ready to ship.";

    // User city 
    const userCity = location.city || location.town || location._normalized_city || location.normalized_city || location.municipality || location.village || location.suburb || location.county;
    const deliverLocation = document.createElement("span");
    deliverLocation.textContent = `Delivers to: ${userCity}`;

    // Creating the product list
    const productsContainerUl = document.createElement("ul");
    productsContainerUl.setAttribute("class", "productsContainer");

    bagItems.forEach((item) => {
      const productElement = createProductElement(item);
      productsContainerUl.appendChild(productElement);
    });

    // Creating delivery method section
    const deliverMethodDiv = document.createElement("div");
    deliverMethodDiv.setAttribute("class", "deliverMethod");

    const deliverH3One = document.createElement("h3");
    deliverH3One.textContent = "Select your delivery method:";

    const deliveryInfoDiv = document.createElement("div");
    deliveryInfoDiv.setAttribute("class", "deliveryInfo");

    const methodDiv = document.createElement("div");
    methodDiv.setAttribute("class", "method");
    methodDiv.setAttribute("tabindex", "0");

    const dateDiv = document.createElement("div");
    dateDiv.setAttribute("class", "date");

    // Creating a dynamic delivery date (2 days from today)
    const date = new Date();
    date.setDate(date.getDate() + 2);
    const deliverH3Two = document.createElement("h3");
    deliverH3Two.textContent = `Delivers ${date.toDateString()}`;

    const deliverH6 = document.createElement("h6");
    deliverH6.textContent = "Express Delivery";

    const priceSpan = document.createElement("span");
    priceSpan.textContent = "FREE";

    dateDiv.appendChild(deliverH3Two);
    dateDiv.appendChild(deliverH6);

    methodDiv.appendChild(dateDiv);
    methodDiv.appendChild(priceSpan);

    // Additional delivery information
    const infoDiv = document.createElement("div");
    infoDiv.setAttribute("class", "info");

    const infoSpan = document.createElement("span");
    infoSpan.textContent = "Keep this in mind about your selection:";

    const infoUl = document.createElement("ul");
    const infoLiOne = document.createElement("li");
    infoLiOne.textContent = "The carrier may require a signature upon delivery.";

    const infoLiTwo = document.createElement("li");
    infoLiTwo.textContent =
      "In-Transit Options: Once your order has been shipped, you can use your tracking link to redirect your shipment to a pickup point, hold it at a secure location, or fill out a signature waiver or shipment release.";

    infoUl.appendChild(infoLiOne);
    infoUl.appendChild(infoLiTwo);

    const infoA = document.createElement("a");
    infoA.setAttribute("href", "https://www.apple.com/shop/help/shipping_delivery");
    infoA.setAttribute("target", "_blank");
    infoA.setAttribute("rel", "noopener noreferrer");
    infoA.textContent = "View Apple Shipping Policy";

    infoDiv.appendChild(infoSpan);
    infoDiv.appendChild(infoUl);
    infoDiv.appendChild(infoA);

    deliveryInfoDiv.appendChild(methodDiv);
    deliveryInfoDiv.appendChild(infoDiv);

    deliverMethodDiv.appendChild(deliverH3One);
    deliverMethodDiv.appendChild(deliveryInfoDiv);

    // Button to proceed to shipping address
    const deliverButton = document.createElement("button");
    deliverButton.setAttribute("class", "deliveryBtn");
    deliverButton.textContent = "Continue to Shipping Address";
    deliverButton.addEventListener('click', () => handleDeliverClick(location, date));

    deliverMethodDiv.appendChild(deliverButton);

    // Assembling the structure
    deliverAreaDiv.appendChild(stockH2);
    deliverAreaDiv.appendChild(deliverLocation);
    deliverAreaDiv.appendChild(productsContainerUl);
    deliverAreaDiv.appendChild(deliverMethodDiv);

    actionArea.appendChild(deliverAreaDiv);
  };

  // Function to create a product list item
  function createProductElement(item) {
    const productLi = document.createElement("li");
    productLi.setAttribute("class", "product");

    const productImg = document.createElement("img");
    productImg.setAttribute("class", "img");
    productImg.src = `./assets/${item.image2}`;
    productImg.alt = item.name;

    const productInfoDiv = document.createElement("div");
    productInfoDiv.setAttribute("class", "productInfo");

    const productName = document.createElement("h6");
    productName.setAttribute("class", "productName");
    productName.textContent = item.name;

    const span = document.createElement("span");
    span.textContent = `Quantity: ${item.quantity}`;

    productInfoDiv.appendChild(productName);
    productInfoDiv.appendChild(span);
    productLi.appendChild(productImg);
    productLi.appendChild(productInfoDiv);

    return productLi;
  }

  function handleDeliverClick(location, date) {
    localStorage.setItem('date', date.toDateString());
    renderAddressSection(location)
  }

  function renderAddressSection(location) {
    const existingDeliverArea = document.querySelector(".deliverArea");
    const existingAddressArea = document.querySelector('.address');
    const existingZipCodeSection = document.querySelector('.zipCodeSection');
    const existingContactArea = document.querySelector('.contact');
    const existingReviewArea = document.querySelector('.review');
    const addressData = JSON.parse(localStorage.getItem('addressData')) || {};
    const contactData = JSON.parse(localStorage.getItem('contactData')) || {};

    if (existingZipCodeSection || existingDeliverArea || existingAddressArea || existingContactArea) {
      existingZipCodeSection?.remove();
      existingReviewArea?.remove();
      existingDeliverArea?.remove();
      existingContactArea?.remove();
      existingAddressArea?.remove();
    }

    // Creating the address and contact containers
    const addressDiv = document.createElement('div');
    const contactDiv = document.createElement('div');
    addressDiv.className = 'address';
    contactDiv.className = 'contact';

    // Creating headers
    const addressH2 = document.createElement('h2');
    addressH2.textContent = "Where should we send your order?";
    const contactH2 = document.createElement('h2');
    contactH2.textContent = "What’s your contact information?";

    // Creating address form
    const addressForm = document.createElement('form');
    addressForm.id = 'adressForm';

    const addressLabel = document.createElement('label');
    addressLabel.setAttribute('for', 'address');
    addressLabel.textContent = "Enter your name and address:";

    const formInputs = document.createElement('div');
    formInputs.className = 'formInputs';

    // Creating input fields for the address form
    const inputsData = [
      { id: 'firstName', placeholder: 'First Name', required: true, value: addressData.firstName || '' },
      { id: 'lastName', placeholder: 'Last Name', required: true, value: addressData.lastName || '' },
      { id: 'street', placeholder: 'Street Address', required: true, value: addressData.street || '' },
      { id: 'addrComplement', placeholder: 'Apt, Suite, Building (Optional)', value: addressData.addrComplement || '' },
      { id: 'country', placeholder: 'Country/Region', value: addressData.country || location.country || location.country_code || '', required: true, readonly: true },
    ];

    inputsData.forEach(data => {
      const input = document.createElement('input');
      input.className = 'width inputs';
      input.type = 'text';
      input.id = data.id;
      input.name = data.id;
      input.placeholder = data.placeholder;
      if (data.required) input.required = true;
      input.value = data.value;
      if (data.readonly) input.readOnly = true;  // Make it readonly
      formInputs.appendChild(input);
    });

    // Creating minor inputs container
    const minorInputsContainer = document.createElement('div');
    minorInputsContainer.className = 'width minorInputsContainer';

    const minorInputsData = [
      { id: 'zipCode', placeholder: 'ZIP Code', maxlength: '8', required: true, value: addressData.zipCode || location.postcode || location.postal_code || location.country_code || '', readonly: true, onChange: handleZipCodeChange },
      { id: 'city', placeholder: 'City', value: addressData.city || location.city || location.town || location._normalized_city || location.normalized_city || location.municipality || location.village || location.suburb || '', readonly: true, required: true },
      { id: 'state', placeholder: 'State/Province', value: addressData.state || location.state || location.county || location.region || location.province || location.territory || location.state_code || '', required: true, readonly: true }
    ];

    minorInputsData.forEach(data => {
      const input = document.createElement('input');
      input.className = 'inputs minorInputs';
      input.type = 'text';
      input.id = data.id;
      input.name = data.id;
      input.placeholder = data.placeholder;
      if (data.maxlength) input.maxLength = data.maxlength;
      if (data.required) input.required = true;
      input.value = data.value || '';

      // Check if the input should be readonly
      if (data.readonly) {
        input.readOnly = true;

        // If the value is empty, make it editable
        if (data.value === '') {
          input.readOnly = false;
        }
      }

      if (data.onChange) input.addEventListener('change', data.onChange);

      minorInputsContainer.appendChild(input);
    });

    formInputs.appendChild(minorInputsContainer);
    addressForm.append(addressLabel, formInputs);
    addressDiv.append(addressH2, addressForm);

    // Creating contact form
    const contactForm = document.createElement('form');
    contactForm.id = 'contactForm';

    const contactInputsData = [
      { id: 'email', type: 'email', placeholder: 'Email Address', required: true, explanation: "We’ll email you a receipt and send order updates to your mobile phone via SMS or iMessage.", value: contactData.email || '' },
      { id: 'phone', type: 'text', placeholder: 'Phone Number', required: true, explanation: "The phone number you enter can’t be changed after you place your order, so please make sure it’s correct.", value: contactData.phone || '' }
    ];

    contactInputsData.forEach((data, index) => {
      const contactInputDiv = document.createElement('div');
      contactInputDiv.className = 'contactInput' + (index === 1 ? ' marginTop' : '');

      const input = document.createElement('input');
      input.className = 'width inputs';
      input.type = data.type;
      input.id = data.id;
      input.name = data.id;
      input.placeholder = data.placeholder;
      input.value = data.value;
      if (data.required) input.required = true;

      // Email validation
      if (data.id === 'email') {
        input.addEventListener('input', () => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            input.setAttribute('data-validation', false);
            return;
          } else {
            input.setCustomValidity('');
            input.reportValidity();
            input.setAttribute('data-validation', true);
          }
        });
      }

      // Phone validation and country phone code using intl-tel-input library
      if (data.id === 'phone') {
        try {
          setTimeout(() => { // Timeout to prevent the library from being applied before the input is created in the DOM
            itiLibrary = window.intlTelInput(document.getElementById('phone'), {
              initialCountry: 'auto',
              geoIpLookup: async (callback) => {
                try {
                  const response = await fetch("https://ipapi.co/json/");
                  const geoData = await response.json();
                  callback(geoData.country_code);
                } catch {
                  callback("US");
                }
              },
              utilsScript: "./libraries/intlTelInputWithUtils.min.js"
            });
          }, 100);

          input.addEventListener('input', (event) => removeLetters(event));

        } catch (error) {
          console.error('Error in load intlTelInput: ', error);
        }
      }

      const explanationDiv = document.createElement('div');
      explanationDiv.className = 'contactExplanation';
      explanationDiv.textContent = data.explanation;

      contactInputDiv.append(input, explanationDiv);
      contactForm.appendChild(contactInputDiv);

    });

    const contactBtn = document.createElement('button');
    contactBtn.className = 'contactBtn';
    contactBtn.textContent = 'Continue to Payment';
    contactBtn.addEventListener('click', (event) => handleContactClick(event, location))

    contactDiv.append(contactH2, contactForm, contactBtn);

    actionArea.append(addressDiv, contactDiv);
  }

  // Handle the ZIP Code change to enable zipcode, country, and state
  function handleZipCodeChange(event) {
    const zipCodeValue = event.target.value.trim();

    if (zipCodeValue) {
      // If ZIP code is entered, enable the zipcode, country, and state fields
      document.getElementById('country').readOnly = false;
      document.getElementById('state').readOnly = false;
      document.getElementById('city').readOnly = false;
      document.getElementById('zipCode').readOnly = false;
    }
  }

  function handleContactClick(event, location) {

    event.preventDefault();

    const requiredFields = [
      'firstName', 'lastName', 'street', 'zipCode', 'city', 'state', 'email', 'country', 'phone'
    ];

    let allFilled = true; // Flag to check if all fields are filled in

    requiredFields.forEach(field => {
      const input = document.getElementById(field);
      if (!input.value.trim()) {
        input.classList.add('input-error');
        allFilled = false;
      } else if (input.id === 'email' && input.getAttribute('data-validation') === "false") { // Email verification
        input.classList.add('input-error');
        input.setCustomValidity('Please enter a valid email address');
        input.reportValidity();
        allFilled = false;
      } else if (input.id === 'phone' && !itiLibrary.isValidNumber()) { // Phone verification
        input.classList.add('input-error');
        input.setCustomValidity('Please enter a valid phone number.');
        input.reportValidity();
        allFilled = false;
      } else {
        input.setCustomValidity('');
        input.reportValidity();
        input.classList.remove('input-error');
      }
    });

    if (!allFilled) {
      return;
    }

    // Getting the country code and formatting the phone
    const phoneInput = document.getElementById('phone');
    const countryData = itiLibrary.getSelectedCountryData();
    const countryCode = `+${countryData.dialCode}`;
    const formattedPhone = `${countryCode} ${phoneInput.value.trim()}`;

    const addressData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      street: document.getElementById('street').value,
      addrComplement: document.getElementById('addrComplement').value,
      country: document.getElementById('country').value,
      zipCode: document.getElementById('zipCode').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
    };

    const contactData = {
      email: document.getElementById('email').value,
      phone: formattedPhone
    };

    localStorage.setItem('addressData', JSON.stringify(addressData));
    localStorage.setItem('contactData', JSON.stringify(contactData));
    renderPaymentArea(location);

  }

  // Render the paymente area
  function renderPaymentArea(location) {
    const existingAddressArea = document.querySelector('.address');
    const existingContactArea = document.querySelector('.contact');
    const existingPaymentArea = document.querySelector(".payment");
    const existingReviewArea = document.querySelector('.review');
    const addressData = JSON.parse(localStorage.getItem('addressData')) || {};
    const billingData = JSON.parse(localStorage.getItem('billingData')) || {};

    if (existingAddressArea || existingContactArea || existingPaymentArea || existingReviewArea) {
      existingAddressArea?.remove();
      existingReviewArea?.remove();
      existingContactArea?.remove();
      existingPaymentArea?.remove();
    }

    // Creating the payment container
    const paymentDiv = document.createElement('div');
    paymentDiv.className = 'payment';

    // Creating the header
    const paymentH2 = document.createElement('h2');
    paymentH2.textContent = "How do you want to pay?";

    // Creating the card selection container
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.setAttribute('tabindex', '0');

    const cardH3 = document.createElement('h3');
    cardH3.textContent = "Credit or Debit Card";

    const cardH6 = document.createElement('h6');
    cardH6.textContent = "Apple Card, Visa, Mastercard, AMEX, Discover, UnionPay";

    cardDiv.append(cardH3, cardH6);

    // Creating the card information form
    const cardForm = document.createElement('form');
    cardForm.className = 'cardInfo';

    const cardLabel = document.createElement('label');
    cardLabel.setAttribute('for', 'card');
    cardLabel.textContent = "Enter your card information:";

    const formInputs = document.createElement('div');
    formInputs.className = 'formInputs';

    const cardInput = document.createElement('input');
    cardInput.className = 'width inputs';
    cardInput.type = 'text';
    cardInput.id = 'card';
    cardInput.name = 'card';
    cardInput.placeholder = 'Credit/Debit Card Number';
    cardInput.maxLength = '19'; // UnionPay (China) and JCB can have 19 digits
    cardInput.required = true;
    cardInput.addEventListener('input', (event) => handleCardInput(event));

    const minorInputsContainer = document.createElement('div');
    minorInputsContainer.className = 'width minorInputsContainer';

    const expirationInput = document.createElement('input');
    expirationInput.className = 'inputs minorInputs';
    expirationInput.type = 'text';
    expirationInput.id = 'expiration';
    expirationInput.name = 'expiration';
    expirationInput.placeholder = 'Expiration MM/YY';
    expirationInput.maxLength = '5';
    expirationInput.required = true;
    expirationInput.addEventListener('input', (event) => handleExpInput(event));

    // Creating CVV container
    const cvvContainer = document.createElement('div');
    cvvContainer.className = 'cvv-container';

    // Creating CVV input
    const cvvInput = document.createElement('input');
    cvvInput.className = 'inputs minorInputs';
    cvvInput.type = 'text';
    cvvInput.id = 'cvv';
    cvvInput.name = 'cvv';
    cvvInput.placeholder = 'CVV';
    cvvInput.maxLength = '4';
    cvvInput.required = true;
    cvvInput.addEventListener('input', (event) => removeLetters(event));

    // Creating help icon
    const helpIcon = document.createElement('span');
    helpIcon.className = 'help-icon';
    helpIcon.textContent = '?';

    // Creating tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';

    const tolltipImg = document.createElement('img');
    tolltipImg.src = './assets/cvv.png';
    tolltipImg.alt = 'CVV illustration';

    const tooltipP = document.createElement('p');
    tooltipP.textContent = 'The CVV is a 3 or 4 digit code located on the back of your card.';

    tooltip.append(tolltipImg, tooltipP);

    // Adding event to display tooltip on mouseover
    helpIcon.addEventListener('mouseover', () => {
      tooltip.style.display = 'block';
    });
    helpIcon.addEventListener('mouseout', () => {
      tooltip.style.display = 'none';
    });

    cvvContainer.append(cvvInput, helpIcon, tooltip);
    minorInputsContainer.append(expirationInput, cvvContainer);
    formInputs.append(cardInput, minorInputsContainer);
    cardForm.append(cardLabel, formInputs);

    // Creating the billing address form
    const billingForm = document.createElement('form');
    billingForm.className = 'bilAddress';

    const billingLabel = document.createElement('label');
    billingLabel.setAttribute('for', 'billAddress');
    billingLabel.textContent = "Billing Address";

    // Checkbox to use shipping address as billing address
    const checkboxDiv = document.createElement('div');
    checkboxDiv.className = 'checkbox';

    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.name = 'shipAddress';
    checkboxInput.id = 'shipAddress';
    checkboxInput.addEventListener('change', () => handleCheckBoxChange(addressData, location));

    const checkboxSpan = document.createElement('span');
    checkboxSpan.textContent = "Use my shipping address.";

    checkboxDiv.append(checkboxInput, checkboxSpan);

    // Shipping address preview
    const shipAddressDiv = document.createElement('div');
    shipAddressDiv.className = 'shipAddress';

    const nameDiv = document.createElement('div');
    nameDiv.className = 'name';

    const firstNameSpan = document.createElement('span');
    firstNameSpan.className = 'fName';
    firstNameSpan.textContent = addressData?.firstName || '';

    const lastNameSpan = document.createElement('span');
    lastNameSpan.className = 'lName';
    lastNameSpan.textContent = addressData?.lastName || '';

    nameDiv.append(firstNameSpan, lastNameSpan);

    const streetSpan = document.createElement('span');
    streetSpan.className = 'street';
    streetSpan.textContent = addressData?.street || '';

    const cityStateDiv = document.createElement('div');

    const citySpan = document.createElement('span');
    citySpan.className = 'city';
    citySpan.textContent = addressData?.city || location?.city || '';

    const stateSpan = document.createElement('span');
    stateSpan.className = 'state';
    stateSpan.textContent = addressData?.state || location?.state || '';

    const zipCodeSpan = document.createElement('span');
    zipCodeSpan.className = 'zipCodeShip';
    zipCodeSpan.textContent = addressData?.zipCode || location?.postcode || '';

    cityStateDiv.append(citySpan, stateSpan, zipCodeSpan);

    const countrySpan = document.createElement('span');
    countrySpan.className = 'country';
    countrySpan.textContent = location?.country || '';

    shipAddressDiv.append(nameDiv, streetSpan, cityStateDiv, countrySpan);

    // Billing address form inputs
    const billingInputsDiv = document.createElement('div');
    billingInputsDiv.className = 'bilAddressForm';

    const billingInputsData = [
      { id: 'country', placeholder: 'Country/Region', value: billingData.country || '', required: true },
      { id: 'firstName', placeholder: 'First Name', value: billingData.firstName || '', required: true },
      { id: 'lastName', placeholder: 'Last Name', value: billingData.lastName || '', required: true },
      { id: 'street', placeholder: 'Street Address', value: billingData.street || '', required: true },
      { id: 'addrComplement', placeholder: 'Apt, Suite, Building (Optional)', value: billingData.addrComplement || '' }
    ];

    billingInputsData.forEach(data => {
      const input = document.createElement('input');
      input.className = 'width inputs';
      input.type = 'text';
      input.id = data.id;
      input.name = data.id;
      input.placeholder = data.placeholder;
      input.value = data.value;
      billingInputsDiv.appendChild(input);
    });

    const minorBillingInputsContainer = document.createElement('div');
    minorBillingInputsContainer.className = 'width minorInputsContainer';

    const minorBillingInputsData = [
      { id: 'zipCode', placeholder: 'ZIP Code', maxlength: '8', required: true, value: billingData.zipCode || '' },
      { id: 'city', placeholder: 'City', value: billingData.city || '', required: true },
      { id: 'state', placeholder: 'State/Province', value: billingData.state || '', required: true }
    ];

    minorBillingInputsData.forEach(data => {
      const input = document.createElement('input');
      input.className = 'inputs minorInputs';
      input.type = 'text';
      input.id = data.id;
      input.name = data.id;
      input.placeholder = data.placeholder;
      if (data.maxlength) input.maxLength = data.maxlength;
      if (data.required) input.required = true;
      input.value = data.value;
      minorBillingInputsContainer.appendChild(input);
    });

    billingInputsDiv.appendChild(minorBillingInputsContainer);
    billingForm.append(billingLabel, checkboxDiv, shipAddressDiv, billingInputsDiv);

    // Creating the payment button
    const paymentBtn = document.createElement('button');
    paymentBtn.className = 'paymentBtn';
    paymentBtn.textContent = 'Continue to Review';
    paymentBtn.addEventListener('click', (event) => handlePaymentClick(event, location, addressData))

    // Appending everything to the payment container
    paymentDiv.append(paymentH2, cardDiv, cardForm, billingForm, paymentBtn);

    // Appending the payment container to the document
    actionArea.appendChild(paymentDiv);
  }

  function handleCardInput(event) {
    formatCardNumber(event);
    updateCardLogo(event);
  }

  // Format the card number with spaces every 4 digits
  function formatCardNumber(event) {
    removeLetters(event);
    let value = event.target.value.replace(/\s/g, ''); // Remove old spaces
    value = value.replace(/(\d{4})/g, '$1 ').trim(); // Add space after every 4 numbers
    event.target.value = value;
  }

  let fetchController = null; // To control requests in progress

  async function updateCardLogo(event) {
    const cardNumber = event.target.value.replace(/\s/g, '').slice(0, 6);
    if (!cardNumber) return;

    if (fetchController) {
      fetchController.abort();
      fetchController = null;
    }

    fetchController = new AbortController();
    const signal = fetchController.signal;

    // Backend URL
    const isDevelopment = window.location.hostname === 'localhost';
    const baseUrl = isDevelopment 
        ? 'http://localhost:3000'  // Local
        : 'https://airpodsmax-five.vercel.app';  // Production

    try {
      const response = await fetch(`${baseUrl}/api/cardLookup?cardNumber=${cardNumber}`, {
        method: 'GET',
        signal,
      });

      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

      const data = await response.json();
      console.log("Data received: ", data);
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
      document.querySelector('#card').style.backgroundImage = `url(./assets/${logo})`;

    } catch (error) {
      if (error.name === 'AbortError') {
        console.warn("Request canceled.");
      } else {
        console.error("Request error: ", error);
      }
    }
  }


  function handleExpInput(event) {
    const input = event.target;
    let value = input.value;

    // Remove all non-numeric characters except "/"
    value = value.replace(/\D/g, '');

    // Format: MM/YY
    if (value.length > 2 && value.length <= 4) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }

    // Update the input value with the formatted one
    input.value = value;

    // Validate if month is valid
    if (value.length === 5) {
      const month = parseInt(value.slice(0, 2), 10);
      const year = parseInt(value.slice(3), 10);

      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      // Validate month
      if (month < 1 || month > 12) {
        input.setCustomValidity('Invalid month. Please enter a valid month (01-12).');
      } else if (year < currentYear % 100) { // Validate if the year is not in the past
        input.setCustomValidity('The expiration year cannot be in the past.');
      } else if (year === currentYear % 100 && month < currentMonth) { // If the year is current, validate if month is past
        input.setCustomValidity('The expiration month cannot be in the past.');
      } else {
        input.setCustomValidity('');
      }

      input.reportValidity();
    }
  }

  function handleCheckBoxChange(addressData, location) {

    const checkboxInput = document.getElementById('shipAddress');

    const billingInputs = {
      country: document.getElementById('country'),
      firstName: document.getElementById('firstName'),
      lastName: document.getElementById('lastName'),
      street: document.getElementById('street'),
      addrComplement: document.getElementById('addrComplement'),
      zipCode: document.getElementById('zipCode'),
      city: document.getElementById('city'),
      state: document.getElementById('state')
    };

    if (checkboxInput.checked) {
      billingInputs.firstName.value = addressData.firstName || '';
      billingInputs.lastName.value = addressData.lastName || '';
      billingInputs.street.value = addressData.street || '';
      billingInputs.zipCode.value = addressData.zipCode || location.postcode || '';
      billingInputs.addrComplement.value = addressData.addrComplement || '';
      billingInputs.city.value = addressData.city || location.city || '';
      billingInputs.state.value = addressData.state || location.state || '';
      billingInputs.country.value = addressData.country || location.country || '';
    } else {
      Object.values(billingInputs).forEach(input => input.value = '');
    }
  }

  function handlePaymentClick(event, location, addressData) {

    event.preventDefault();

    const requiredFields = [
      'card', 'expiration', 'cvv', 'country', 'firstName', 'lastName', 'street', 'zipCode', 'city', 'state'
    ];

    let allFilled = true; // Flag to check if all fields are filled in

    requiredFields.forEach(field => {
      const input = document.getElementById(field);
      if (!input.value.trim()) {
        input.classList.add('input-error');
        allFilled = false;
      } else {
        input.classList.remove('input-error');
      }
    });

    if (!allFilled) {
      return;
    }

    const billingData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      street: document.getElementById('street').value,
      addrComplement: document.getElementById('addrComplement').value,
      country: document.getElementById('country').value,
      zipCode: document.getElementById('zipCode').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
    };

    localStorage.setItem('billingData', JSON.stringify(billingData));
    renderReviewSection(location, addressData);
  }

  function renderReviewSection(location, addressData) {
    const existingReviewArea = document.querySelector('.review');
    const existingPaymentArea = document.querySelector('.payment');
    const contactData = JSON.parse(localStorage.getItem('contactData')) || {};
    const date = localStorage.getItem('date') || 'in 2 days';
    const billingData = JSON.parse(localStorage.getItem('billingData'));

    if (existingReviewArea || existingPaymentArea) {
      existingReviewArea?.remove();
      existingPaymentArea?.remove();
    }

    // Create main review container
    const reviewContainer = document.createElement('div');
    reviewContainer.classList.add('review');

    // Create title
    const title = document.createElement('h2');
    title.innerHTML = "Ready to place your order? <br> Let’s make sure everything’s right.";
    reviewContainer.appendChild(title);

    // Delivery section
    const reviewDeliv = document.createElement('div');
    reviewDeliv.classList.add('reviewDeliv');

    const deliveryDate = document.createElement('h3');
    deliveryDate.textContent = `Delivers ${date}`;

    const deliveryType = document.createElement('span');
    deliveryType.textContent = "Express Delivery";

    const changeShipping = document.createElement('button');
    changeShipping.textContent = "Change shipping method";
    changeShipping.classList.add('reviewBtns');
    changeShipping.addEventListener('click', () => renderDeliveryArea(location));

    reviewDeliv.append(deliveryDate, deliveryType, changeShipping);
    reviewContainer.appendChild(reviewDeliv);

    // Product review section
    const reviewProducts = document.createElement('div');
    reviewProducts.classList.add('reviewProdcts');

    bagItems.forEach(item => {
      const reviewProduct = document.createElement('div');
      reviewProduct.classList.add('reviewProdct');

      const productImg = document.createElement('img');
      productImg.src = `./assets/${item.image2}`;
      productImg.alt = `${item.name}`;

      const productInfo = document.createElement('div');
      productInfo.classList.add('reviewProdctInfo');

      const productName = document.createElement('span');
      productName.textContent = `${item.name}`;

      const productQuantity = document.createElement('span');
      productQuantity.textContent = `${item.quantity}`;

      const productPrice = document.createElement('span');
      productPrice.textContent = `$${item.price}.00`;

      productInfo.append(productName, productQuantity, productPrice);
      reviewProduct.append(productImg, productInfo);
      reviewProducts.appendChild(reviewProduct);
    });

    reviewContainer.appendChild(reviewProducts);

    // Shipping details
    const reviewShip = document.createElement('div');
    reviewShip.classList.add('reviewShip');

    const reviewShip1 = document.createElement('div');
    reviewShip1.classList.add('reviewShip1');

    const shippingTitle = document.createElement('h3');
    shippingTitle.textContent = "Shipping Details";

    const changeShippingLink = document.createElement('button');
    changeShippingLink.textContent = "Change >";
    changeShippingLink.classList.add('reviewBtns');
    changeShippingLink.addEventListener('click', () => renderAddressSection(location));

    reviewShip1.append(shippingTitle, changeShippingLink);

    const reviewShip2 = document.createElement('div');
    reviewShip2.classList.add('reviewShip2');

    const deliversTo = document.createElement('h5');
    deliversTo.textContent = "Delivers to:";

    const shipInfo = document.createElement('div');
    shipInfo.classList.add('shipInfo');

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');

    const fName = document.createElement('span');
    fName.classList.add('fName');
    fName.textContent = addressData?.firstName || "";

    const lName = document.createElement('span');
    lName.classList.add('lName');
    lName.textContent = addressData?.lastName || "";

    nameDiv.append(fName, lName);

    const street = document.createElement('span');
    street.classList.add('street');
    street.textContent = addressData?.street || "";

    const complement = document.createElement('span');
    complement.classList.add('complement');
    complement.textContent = addressData?.complement || "";

    const cityStateZipDiv = document.createElement('div');

    const city = document.createElement('span');
    city.classList.add('city');
    city.textContent = addressData?.city || location.city || location.town || location._normalized_city || location.county;

    const state = document.createElement('span');
    state.classList.add('state');
    state.textContent = addressData?.state || location?.state;

    const zipCodeShip = document.createElement('span');
    zipCodeShip.classList.add('zipCodeShip');
    zipCodeShip.textContent = addressData?.zip || location?.postcode;

    cityStateZipDiv.append(city, state, zipCodeShip);

    const country = document.createElement('span');
    country.classList.add('country');
    country.textContent = addressData?.country || location?.country;

    shipInfo.append(nameDiv, street, complement, cityStateZipDiv, country);
    reviewShip2.append(deliversTo, shipInfo);

    const reviewShip3 = document.createElement('div');
    reviewShip3.classList.add('reviewShip3');

    const contactTitle = document.createElement('h5');
    contactTitle.textContent = "Contact information:";

    const contactInfo = document.createElement('div');
    contactInfo.classList.add('contactInfo');

    const email = document.createElement('span');
    const emailFormatted = () => {
      const email = contactData.email;
      const [localPart, domain] = email.split("@");

      if (!localPart || !domain) return '';

      const maskedPart = localPart.slice(1, -1).replace(/./g, "•");
      const formattedEmail = `${localPart[0]}${maskedPart}${localPart.slice(-1)}@${domain}`;

      return formattedEmail || '';
    }
    email.textContent = emailFormatted();

    const phone = document.createElement('span');
    const phoneFormatted = () => {
      const phone = contactData.phone;

      if (!phone) return '';

      const maskedPart = phone.slice(0, -2).replace(/./g, "•");
      const lastTwoDigits = phone.slice(-2);
      const formattedPhone = `${maskedPart}${lastTwoDigits}`;

      return formattedPhone || '';
    }
    phone.textContent = phoneFormatted();

    contactInfo.append(email, phone);
    reviewShip3.append(contactTitle, contactInfo);

    reviewShip.append(reviewShip1, reviewShip2, reviewShip3);
    reviewContainer.appendChild(reviewShip);

    // Payment details
    const reviewPay = document.createElement('div');
    reviewPay.classList.add('reviewPay');

    const reviewPay1 = document.createElement('div');
    reviewPay1.classList.add('reviewPay1');

    const paymentTitle = document.createElement('h3');
    paymentTitle.textContent = "Payment Details";

    const changePaymentLink = document.createElement('button');
    changePaymentLink.textContent = "Change >";
    changePaymentLink.classList.add('reviewBtns');
    changePaymentLink.addEventListener('click', () => renderPaymentArea(location));

    reviewPay1.append(paymentTitle, changePaymentLink);

    const reviewPay2 = document.createElement('div');
    reviewPay2.classList.add('reviewPay2');

    const billingTitle = document.createElement('h5');
    billingTitle.textContent = "Billing address:";

    const billingInfo = document.createElement('div');
    billingInfo.classList.add('bilInfo');

    const nameDiv2 = document.createElement('div');
    nameDiv2.classList.add('name');

    const fName2 = document.createElement('span');
    fName2.classList.add('fName');
    fName2.textContent = billingData?.firstName || "";

    const lName2 = document.createElement('span');
    lName2.classList.add('lName');
    lName2.textContent = billingData?.lastName || "";

    nameDiv2.append(fName2, lName2);

    const street2 = document.createElement('span');
    street2.classList.add('street');
    street2.textContent = billingData?.street || "";

    const complement2 = document.createElement('span');
    complement2.classList.add('complement');
    complement2.textContent = billingData?.complement || "";

    const cityStateZipDiv2 = document.createElement('div');

    const city2 = document.createElement('span');
    city2.classList.add('city');
    city2.textContent = billingData?.city || '';

    const state2 = document.createElement('span');
    state2.classList.add('state');
    state2.textContent = billingData?.state || '';

    const zipCodeBil = document.createElement('span');
    zipCodeBil.classList.add('zipCodeShip');
    zipCodeBil.textContent = billingData?.zipCode || '';

    cityStateZipDiv2.append(city2, state2, zipCodeBil);

    const country2 = document.createElement('span');
    country2.classList.add('country');
    country2.textContent = billingData?.country || '';

    billingInfo.append(nameDiv2, street2, complement2, cityStateZipDiv2, country2);

    reviewPay2.append(billingTitle, billingInfo);

    const reviewPay3 = document.createElement('div');
    reviewPay3.classList.add('reviewPay3');

    const paymentMethodTitle = document.createElement('h5');
    paymentMethodTitle.textContent = "Pay in full with:";

    const paymentMethod = document.createElement('span');
    paymentMethod.textContent = "Credit/Debit card";

    reviewPay3.append(paymentMethodTitle, paymentMethod);
    reviewPay.append(reviewPay1, reviewPay2, reviewPay3);
    reviewContainer.appendChild(reviewPay);

    // Total section
    const reviewTotal = document.createElement('div');
    reviewTotal.classList.add('reviewTotal');

    const totalTitle = document.createElement('h5');
    totalTitle.textContent = "Your Total";

    const totalInfo = document.createElement('div');
    totalInfo.classList.add('totalInfo');

    const subtotals = document.createElement('div');
    subtotals.classList.add('subtotals');

    const subtotal = document.createElement('div');
    subtotal.classList.add('subtotal');
    subtotal.innerHTML = `<span>Subtotal</span><span>$${totalPrice}.00</span>`;

    const shipping = document.createElement('div');
    shipping.classList.add('subtotal');
    shipping.innerHTML = "<span>Shipping</span><span>FREE</span>";

    subtotals.append(subtotal, shipping);

    const total = document.createElement('div');
    total.classList.add('total');
    total.innerHTML = `<span>Total</span><span>$${totalPrice}.00</span>`;

    totalInfo.append(subtotals, total);
    reviewTotal.append(totalTitle, totalInfo);

    reviewContainer.appendChild(reviewTotal);

    // Pay button
    const payButton = document.createElement('button');
    payButton.classList.add('payBtn');
    payButton.textContent = "Pay";
    payButton.addEventListener('click', (event) => handlePayClick(event));

    reviewContainer.appendChild(payButton);

    actionArea.appendChild(reviewContainer);
  }

  function handlePayClick(event) {
    event.preventDefault();
    renderPopup();

    // Disable all buttons and links
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.disabled = true);
    const links = document.querySelectorAll('a');
    links.forEach(link => link.style.pointerEvents = 'none');

    // Enable the close button
    const closeBtn = document.querySelector('.close');
    closeBtn.disabled = false;

    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");

    popup.style.display = "block";
    overlay.style.display = "block";
  }

  function renderPopup() {

    const existingPopup = document.querySelector('#popup');
    const existingOverlay = document.querySelector('#overlay');
    if (existingPopup) {
      existingPopup.remove();
    }
    if (existingOverlay) {
      existingOverlay.remove();
    }

    // Create the overlay div
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.classList.add('overlay');

    // Create the popup div
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.classList.add('popup');

    // Create the checkmark SVG
    const checkmark = document.createElement('div');
    checkmark.classList.add('checkmark');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 50 50');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12 25 L20 35 L38 15');
    svg.appendChild(path);

    checkmark.appendChild(svg);

    // Create the h3 element for success message
    const h3 = document.createElement('h3');
    h3.textContent = 'Payment successful!';

    // Create the paragraph for the order number
    const orderPara = document.createElement('p');
    orderPara.textContent = 'Order: ';
    const orderStrong = document.createElement('strong');
    orderStrong.textContent = `#${Math.round(Math.random() * 1000000)}`;
    orderPara.classList.add('margin-popup');
    orderPara.appendChild(orderStrong);

    // Create the paragraph for the total amount
    const totalPara = document.createElement('p');
    totalPara.textContent = 'Total: ';
    const totalStrong = document.createElement('strong');
    totalStrong.textContent = `$${totalPrice}.00`;
    totalPara.appendChild(totalStrong);

    // Create the close button
    const closeButton = document.createElement('button');
    closeButton.classList.add('close');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', handleCloseClick);

    popup.appendChild(checkmark);
    popup.appendChild(h3);
    popup.appendChild(orderPara);
    popup.appendChild(totalPara);
    popup.appendChild(closeButton);

    document.body.appendChild(overlay);
    document.body.appendChild(popup);
  }

  function handleCloseClick(event) {
    event.preventDefault();

    const existingPopup = document.querySelector('#popup');
    const existingOverlay = document.querySelector('#overlay');
    if (existingPopup) {
      existingPopup.remove();
    }
    if (existingOverlay) {
      existingOverlay.remove();
    }

    // Clear the local storage
    localStorage.clear();

    // Enable all buttons and links 
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.disabled = false);
    const links = document.querySelectorAll('a');
    links.forEach(link => link.style.pointerEvents = 'auto');

    // Manual redirection after executing all actions
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 100); // Delay to ensure that the removal and reset occurs before the redirect
  }

});

