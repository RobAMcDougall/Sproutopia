import React from 'react'

const SideNav = () => {
  return (
    <div className='absolute top-0 left-0 bg-[#DEF3C3] w-[300px] py-7 px-5  min-h-screen'>
        <h3 className='text-lg font-medium'>Add ingredients</h3>
        <div className='mt-3'>
            <div className='flex flex-wrap gap-3'> 
        <button className='bg-white border border-gray-400 rounded-md py-1 px-8 text-sm'>Pasta</button>
        <button className='bg-white border border-gray-400 rounded-md py-1 px-8 text-sm'>Tomato</button>
        <button className='bg-white border border-gray-400 rounded-md py-1 px-8 text-sm'>Cheese</button>
        </div>
        <button className='font-medium text-sm mt-4'>+ Add More</button>
        </div>
        <div className='mt-9'>
            <h3 className='font-medium'>Recent harvest from your garden</h3>
            <div className='flex flex-wrap gap-3 mt-3'> 
        <button className='bg-white border border-gray-400 rounded-md py-1 px-8 text-sm'>Pasta</button>
        <button className='bg-white border border-gray-400 rounded-md py-1 px-8 text-sm'>Tomato</button>
        <button className='bg-white border border-gray-400 rounded-md py-1 px-8 text-sm'>Cheese</button>
        </div>
        </div>
        <div className='mt-10'>
            <h3 className='font-medium'>Dietary Requirements</h3>
        </div>
    </div>
  )
}

export default SideNav