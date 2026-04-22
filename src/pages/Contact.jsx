import React from "react";

const Contact = () => {
    return (
        <div className="pt-18 pb-30 min-h-screen bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl font-bold mb-10 text-center text-white p-4 rounded-lg shadow-md">
                    Contact Library Management
                </h2>

                <p className="text-lg text-white text-center mb-12 p-6 rounded-lg shadow-md">
                    Need help with book availability, memberships, or returns? 
                    Our library team is here to assist you. Feel free to contact us 
                    or visit the library during working hours.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Library Address */}
                    <div className="p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4 text-white">
                            Library Location
                        </h3>
                        <p>Central Library</p>
                        <p>Sector 12, Knowledge Park</p>
                        <p>Haridwar, Uttarakhand - 249401</p>
                    </div>

                    {/* Contact Details */}
                    <div className="p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4 text-white">
                            Contact Information
                        </h3>
                        <p>
                            Email:{" "}
                            <a
                                className="text-blue-400 hover:underline"
                                href="mailto:support@librarymanagement.com"
                            >
                                support@librarymanagement.com
                            </a>
                        </p>
                        <p>
                            Phone:{" "}
                            <a
                                className="text-blue-400 hover:underline"
                                href="tel:+919876543210"
                            >
                                +91-9876543210
                            </a>
                        </p>
                    </div>
                </div>

                {/* Library Hours */}
                <div className="p-6 rounded-lg shadow-lg mt-12 text-center">
                    <h3 className="text-2xl font-semibold mb-4 text-white">
                        Working Hours
                    </h3>
                    <p>Monday – Saturday: 9:00 AM – 7:00 PM</p>
                    <p>Sunday: Closed</p>
                </div>

                {/* Frequently Asked Questions */}
                <section className="mt-12">
                    <h3 className="text-3xl font-bold mb-6 text-center text-white">
                        Frequently Asked Questions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                question: "How can I register as a member?",
                                answer:
                                    "You can register online through our portal or visit the library with a valid ID to create your membership.",
                            },
                            {
                                question: "How many books can I borrow at once?",
                                answer:
                                    "Members can borrow up to 3–5 books at a time depending on their membership type.",
                            },
                            {
                                question: "What is the return policy?",
                                answer:
                                    "Books should be returned within 14 days. Late returns may incur a small fine.",
                            },
                            {
                                question: "Can I reserve a book?",
                                answer:
                                    "Yes, you can reserve books online and collect them from the library when available.",
                            },
                        ].map((faq, index) => (
                            <div key={index} className="p-6 rounded-lg shadow-md">
                                <h4 className="font-semibold text-xl mb-3 text-white">
                                    {faq.question}
                                </h4>
                                <p className="text-white">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Social Media Links */}
                <div className="p-6 rounded-lg shadow-lg mt-12 text-center">
                    <h3 className="text-2xl font-semibold mb-4 text-white">Connect With Us</h3>
                    <p>Stay updated with new arrivals, announcements, and events.</p>
                    <p className="text-blue-400 mt-4">
                        <span className="hover:underline"> Facebook </span> |
                        <span className="hover:underline"> Instagram </span> |
                        <span className="hover:underline"> Twitter </span>
                        <br />
                        @CentralLibrary
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;