import React from 'react'
import { IoIosSend } from 'react-icons/io'

const Subscribe = () => {
  return (
    <section className="pb-10 px-4 sm:px-6">
      <div className="container bg-[url(/subscribe-bg.png)] bg-no-repeat bg-cover bg-center p-6 sm:p-10 md:p-16 lg:p-20 rounded-2xl sm:rounded-3xl">
        <h2 className="font-bold text-primary text-2xl sm:text-3xl md:text-4xl lg:text-[40px] max-w-full sm:max-w-xl">
          Stay home & get your daily needs from our shop
        </h2>
        <p className="font-normal text-secondary pt-3 sm:pt-4 md:pt-5 pb-6 sm:pb-8 md:pb-11 text-sm sm:text-base">
          Start You'r Daily Shopping with Nest Mart
        </p>
        <div className="bg-white rounded-full max-w-full sm:max-w-md flex flex-col sm:flex-row items-stretch sm:items-center gap-1 sm:gap-0 pl-2 pr-2 sm:pr-0">
          <IoIosSend className="text-2xl sm:text-3xl md:text-4xl text-secondary hidden sm:block" />
          <input
            type="email"
            placeholder="Your email address"
            className="w-full outline-0 text-sm sm:text-base py-2 sm:py-0"
          />
          <button className="py-2 sm:py-2 md:py-3 lg:py-6 px-4 sm:px-3 md:px-6 lg:px-10 bg-brand rounded-full sm:rounded-4xl text-white text-xs sm:text-sm md:text-base cursor-pointer whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  )
}

export default Subscribe