import React from "react";
import LibraryLogo from "/library-logo.png";
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="pt-12 pb-30 min-h-screen bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl text-white text-center font-bold mb-8 p-4 rounded-lg shadow-md">
                    About Central Library
                </h2>

                <p className="text-lg text-center mb-12 p-6 rounded-lg shadow-md">
                    Welcome to <b>Central Library</b>, a place where knowledge meets curiosity.
                    Our library provides access to a wide collection of books, study resources,
                    and a peaceful environment for learning and research.
                </p>

                {/* Library History */}
                <section className="p-6 rounded-lg shadow-lg mb-12">
                    <h3 className="text-3xl font-semibold mb-6 text-white text-center">
                        Our Story
                    </h3>
                    <p>
                        Central Library was established with the goal of creating a space
                        where students, readers, and researchers can access quality resources.
                        What started as a small collection of academic books has grown into
                        a well-organized library system with a diverse range of genres.
                    </p>
                    <p className="mt-4">
                        Today, we combine traditional library services with modern technology,
                        allowing users to search books online, manage borrowings, and access
                        library services efficiently through our system.
                    </p>
                </section>

                {/* Mission & Vision */}
                <section className="p-6 rounded-lg shadow-lg mb-12">
                    <h3 className="text-3xl font-semibold mb-6 text-white text-center">
                        Our Mission & Vision
                    </h3>
                    <p>
                        <b>Mission:</b> To provide accessible knowledge resources, promote
                        reading habits, and support academic and personal growth through
                        efficient library services.
                    </p>
                    <p className="mt-4">
                        <b>Vision:</b> To become a modern, user-friendly library system that
                        connects readers with the right resources at the right time.
                    </p>
                </section>

                {/* Library Services */}
                <div className="grid md:grid-cols-2 gap-10 items-center p-2">
                    <div className="px-0 pt-5">
                        <h3 className="text-3xl font-semibold text-white mb-6 p-4 rounded-lg shadow-md">
                            What We Offer
                        </h3>
                        <ul className="list-disc pl-6 text-lg p-6 rounded-lg shadow-lg">
                            <li>Wide collection of books across multiple genres</li>
                            <li>Book issuing and return management system</li>
                            <li>Online catalog to search and reserve books</li>
                            <li>Quiet reading and study environment</li>
                            <li>Reading programs and community events</li>
                            <li>Support from experienced librarians</li>
                        </ul>
                    </div>
                    <div className="flex justify-center items-center">
                        <img
                            src={LibraryLogo}
                            className="w-1/2 rounded-lg shadow-xl"
                            alt="Central Library"
                        />
                    </div>
                </div>

                {/* Membership Benefits */}
                <section className="p-6 rounded-lg shadow-lg mt-12">
                    <h3 className="text-3xl font-semibold mb-6 text-white text-center">
                        Membership Benefits
                    </h3>
                    <p className="text-center mb-4">
                        Join Central Library and enjoy these benefits:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 rounded-lg shadow-md">
                            <h4 className="font-semibold text-xl mb-3 text-white">
                                Borrow Books Easily
                            </h4>
                            <p>
                                Issue and return books smoothly using our library system.
                            </p>
                        </div>
                        <div className="p-6 rounded-lg shadow-md">
                            <h4 className="font-semibold text-xl mb-3 text-white">
                                Access to Study Resources
                            </h4>
                            <p>
                                Find academic materials, references, and helpful study content.
                            </p>
                        </div>
                        <div className="p-6 rounded-lg shadow-md">
                            <h4 className="font-semibold text-xl mb-3 text-white">
                                Book Reservation
                            </h4>
                            <p>
                                Reserve books online and collect them from the library.
                            </p>
                        </div>
                        <div className="p-6 rounded-lg shadow-md">
                            <h4 className="font-semibold text-xl mb-3 text-white">
                                Priority for New Arrivals
                            </h4>
                            <p>
                                Get early access to newly added books in the library.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="p-6 rounded-lg shadow-lg mt-12 text-center">
                    <h3 className="text-3xl font-semibold mb-6 text-white">
                        Become a Member
                    </h3>
                    <p className="mb-6">
                        Register now and start exploring our library resources.
                    </p>
                    <Link
                        to="/LibraryManagement/register"
                        className="bg-fuchsia-500 text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-violet-500 transition shadow-md"
                    >
                        Register Now
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default About;