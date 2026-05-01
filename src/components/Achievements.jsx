import React from 'react'
import { FaUsersLine } from "react-icons/fa6";
import { RiSoundModuleLine } from "react-icons/ri";
import { RiSecurePaymentLine } from "react-icons/ri";
import Title from './Title.jsx';

const Achievements = () => {

    const statistics = [
        { label: "Happy Clients", value: 15 },
        { label: "Books Stocks", value: 22 },
        { label: "Total Sales", value: 29 }
    ]

    return (
        <section className='mt-4'>
    <div className='flex flex-col xl:flex-row'>

        {/* LEFT SIDE */}
        <div className='flex-[3] flex justify-center flex-col bg-gradient-to-l from-tertiary to-white px-6 lg:px-12 py-16'>
            <h2 className='text-xl h2'>Our Journey so far</h2>
            <p className='py-5 max-w-[48rem] text-lg font-bold'>
                From a small idea to a growing library, our journey has been fueled by a love for stories, knowledge, and the joy of sharing books with readers from all walks of life
            </p>

            {/* STATISTICS CONTAINER */}
            <div className='flex flex-wrap gap-12'>
                {statistics.map((statistic, index) => (
                    <div key={index} className='p-4 rounded-lg'>
                        <div className='flex items-center gap-1'>
                            <h3 className='text-5xl font-sans'>{statistic.value}</h3>
                            <h4 className='regular-32'>k+</h4>
                        </div>
                        <p className='capitalize pt-2'>{statistic.label}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* RIGHT SIDE */}
        <div className='flex-1 relative max-sm:pl-4 flex items-center xl:justify-center pt-5'>
            <div className='flex flex-col'>
                <Title
                    title1={"New"}
                    title2={"Arrivals"}
                    titleStyles={"pb-10"}
                    paraStyles={"hidden"}
                />

                <div className='flex flex-col items-start'>
                    <div className='flex-center gap-3 mb-3'>
                        <RiSecurePaymentLine className="text-xl" />
                        <div>
                            <h5 className='h5'>Fast & secure</h5>
                            <p>Optimized performance</p>
                        </div>
                    </div>

                    <div className='flex-center gap-3 mb-3'>
                        <RiSoundModuleLine className="text-xl" />
                        <div>
                            <h5 className='h5'>Advance filtering</h5>
                            <p>Find items quickly</p>
                        </div>
                    </div>

                    <div className='flex-center gap-3 mb-3'>
                        <FaUsersLine className="text-xl" />
                        <div>
                            <h5 className='h5'>Users Reviews</h5>
                            <p>Ratings and feedback</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>
    )
}

export default Achievements
