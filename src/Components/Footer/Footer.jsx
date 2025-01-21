import React, { useEffect, useState } from "react";
import "./Footer.css";

function Footer() {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 950); // Adjust the breakpoint

    useEffect(() => { // useEffect to handle window resize
        const handleResize = () => setIsMobile(window.innerWidth <= 950);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const sections = [
        {
            title: "Shop and Learn",
            links: [
                { name: "Store", href: "https://www.apple.com/us/shop/goto/store" },
                { name: "Mac", href: "https://www.apple.com/mac/" },
                { name: "iPad", href: "https://www.apple.com/ipad/" },
                { name: "iPhone", href: "https://www.apple.com/iphone/" },
                { name: "Watch", href: "https://www.apple.com/watch/" },
                { name: "Vision", href: "https://www.apple.com/apple-vision-pro/" },
                { name: "AirPods", href: "https://www.apple.com/airpods/" },
                { name: "Tv & Home", href: "https://www.apple.com/tv-home/" },
                { name: "AirTag", href: "https://www.apple.com/airtag/" },
                { name: "Accessories", href: "https://www.apple.com/us/shop/goto/buy_accessories" },
                { name: "Gift Cards", href: "https://www.apple.com/us/shop/goto/giftcards" },
            ]
        },
        {
            title: "Apple Wallet",
            links: [
                { name: "Wallet", href: "https://www.apple.com/wallet/" },
                { name: "Apple Card", href: "https://www.apple.com/apple-card/" },
                { name: "Apple Pay", href: "https://www.apple.com/apple-pay/" },
                { name: "Apple Cash", href: "https://www.apple.com/apple-cash/" },
            ]
        },
        {
            title: "Account",
            links: [
                { name: "Manage Your Apple Account", href: "https://account.apple.com/" },
                { name: "Apple Store Account", href: "https://www.apple.com/us/shop/goto/account" },
                { name: "iCloud.com", href: "https://www.icloud.com/" },
            ]
        },
        {
            title: "Entertainment",
            links: [
                { name: "Apple One", href: "https://www.apple.com/apple-one/" },
                { name: "Apple Tv+", href: "https://www.apple.com/apple-tv-plus/" },
                { name: "Apple Music", href: "https://www.apple.com/apple-music/" },
                { name: "Apple Arcade", href: "https://www.apple.com/apple-arcade/" },
                { name: "Apple Fitness+", href: "https://www.apple.com/apple-fitness-plus/" },
                { name: "Apple News+", href: "https://www.apple.com/apple-news/" },
                { name: "Apple Podcasts", href: "https://www.apple.com/apple-podcasts/" },
                { name: "Apple Books", href: "https://www.apple.com/apple-books/" },
                { name: "Apple Store", href: "https://www.apple.com/app-store/" },
            ]
        },
        {
            title: "Apple Store",
            links: [
                { name: "Find a Store", href: "https://www.apple.com/retail/" },
                { name: "Genius Bar", href: "https://www.apple.com/retail/geniusbar/" },
                { name: "Today at Apple", href: "https://www.apple.com/today/" },
                { name: "Group Reservations", href: "https://www.apple.com/today/groups/" },
                { name: "Apple Camp", href: "https://www.apple.com/today/camp/" },
                { name: "Apple Store App", href: "https://apps.apple.com/us/app/apple-store/id375380948" },
                { name: "Certified Refurbished", href: "https://www.apple.com/us/shop/goto/special_deals" },
                { name: "Apple Trad In", href: "https://www.apple.com/us/shop/goto/trade_in" },
                { name: "Financing", href: "https://www.apple.com/us/shop/goto/payment_plan" },
                { name: "Carrier Deals at Apple", href: "https://www.apple.com/us/shop/goto/buy_iphone/carrier_offers" },
                { name: "Order Status", href: "https://www.apple.com/us/shop/goto/order/list" },
                { name: "Shopping Help", href: "https://www.apple.com/us/shop/goto/help" },
            ]
        },
        {
            title: "For Business",
            links: [
                { name: "Apple and Business", href: "https://www.apple.com/business/" },
                { name: "Shop for Business", href: "https://www.apple.com/retail/business/" },
            ]
        },
        {
            title: "For Education",
            links: [
                { name: "Apple and Education", href: "https://www.apple.com/education/" },
                { name: "Shop for K-12", href: "https://www.apple.com/education/k12/how-to-buy/" },
                { name: "Shop for College", href: "https://www.apple.com/us/shop/goto/educationrouting" },
            ]
        },
        {
            title: "For Healthcare",
            links: [
                { name: "Apple in Healthcare", href: "https://www.apple.com/healthcare/" },
                { name: "Mac in Healthcare", href: "https://www.apple.com/healthcare/mac/" },
                { name: "Health on Apple Watch", href: "https://www.apple.com/healthcare/apple-watch/" },
                { name: "Health Records on iPhone and iPad", href: "https://www.apple.com/healthcare/health-records/" },
            ]
        },
        {
            title: "For Government",
            links: [
                { name: "Shop for Government", href: "https://www.apple.com/r/store/government/" },
                { name: "Shop for Veterans and Military", href: "https://www.apple.com/us/shop/goto/eppstore/veteransandmilitary" },
            ]
        },
        {
            title: "Apple Values",
            links: [
                { name: "Accessibility", href: "https://www.apple.com/accessibility/" },
                { name: "Education", href: "https://www.apple.com/education-initiative/" },
                { name: "Environment", href: "https://www.apple.com/environment/" },
                { name: "Inclusion and Diversity", href: "https://www.apple.com/diversity/" },
                { name: "Privacy", href: "https://www.apple.com/privacy/" },
                { name: "Racial Equity and Justice", href: "https://www.apple.com/racial-equity-justice-initiative/" },
                { name: "Supply Chain", href: "https://www.apple.com/supply-chain/" },
            ]
        },
        {
            title: "About Apple",
            links: [
                { name: "Newsroom", href: "https://www.apple.com/newsroom/" },
                { name: "Apple Leadership", href: "https://www.apple.com/leadership/" },
                { name: "Career Opportunities", href: "https://www.apple.com/careers/us/" },
                { name: "Investors", href: "https://investor.apple.com/" },
                { name: "Ethics & Compliance", href: "https://www.apple.com/compliance/" },
                { name: "Events", href: "https://www.apple.com/apple-events/" },
                { name: "Contact Apple", href: "https://www.apple.com/contact/" },
            ]
        },
    ];

    const handleFooterClick = (event) => {
        if (isMobile) {
            event.target.parentElemen.classList.toggle('footer-link-active');
            const isExpanded = event.currentTarget.getAttribute("aria-expanded") === "true";
            event.currentTarget.setAttribute("aria-expanded", !isExpanded);
        }
    };

    return (
        <footer className="footer" id="footer" data-aos="fade-up" data-aos-duration="1200">
            <div className="links">
                {sections.map((section, index) => (
                    <div className="linkSection" key={index}>
                        <h6
                            onClick={handleFooterClick}
                            tabIndex={isMobile ? 0 : undefined}
                            role={isMobile ? "button" : undefined}
                            aria-expanded={isMobile ? "false" : undefined}
                        >
                            {section.title}
                        </h6>
                        {section.links.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                ))}
            </div>
            <div className="rights">
                <p>&copy; 2024 Apple Inc. All rights reserved.</p>
                <div>
                    <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a> |
                    <a href="https://www.apple.com/legal/internet-services/terms/site.html" target="_blank" rel="noopener noreferrer">Terms of Use</a> |
                    <a href="https://www.apple.com/us/shop/goto/help/sales_refunds" target="_blank" rel="noopener noreferrer">Sales and Refunds</a> |
                    <a href="https://www.apple.com/legal/" target="_blank" rel="noopener noreferrer">Legal</a> |
                    <a href="https://www.apple.com/sitemap/" target="_blank" rel="noopener noreferrer">Site Map</a>
                </div>
                <p className="location">
                    One Apple Park Way, Cupertino, CA 95014, (408) 996–1010
                </p>
            </div>
            <div className="credits">
                <p>
                    "Airpods Max Clone" (https://skfb.ly/oXOoG) by vanshmaheshwari2602 is licensed under CC
                    Attribution-NonCommercial-ShareAlike (http://creativecommons.org/licenses/by-nc-sa/4.0/).
                </p>
            </div>
        </footer>
    )
}

export default Footer;