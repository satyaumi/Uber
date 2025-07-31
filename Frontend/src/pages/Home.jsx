import React from 'react'

const Home = () => {
  return (
    <div>
        <div className="bg-cover bg-bottom bg-[url(https://plus.unsplash.com/premium_photo-1669366206339-f94346ea35c6?q=80&w=701&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]h-screen pt-5 pl-5 flex  justify-between flex-col w-full bg-red-400">
            <img className="w-16 ml-8" src="https://plus.unsplash.com/premium_photo-1669366206339-f94346ea35c6?q=80&w=701&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <div className="bg-white py-5 pb-7 px-4">
            <h2 className="text-3xl font-bold">Get Started with Uber</h2>
        <button className="w-full bg-black text-white py-3 rounded mt-5">Continue</button>
        </div>
        </div>   
    </div>
  )
}

export default Home
