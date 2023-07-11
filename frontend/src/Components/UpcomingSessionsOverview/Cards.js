import React from 'react'

const cards = () => {
  return (
    <div class="flex flex-wrap justify-center mt-5">

            <div class="p-4 max-w-sm">
                <div class="flex rounded-lg h-full bg-[#f7f0e6] p-8 flex-col">
                    <div class="flex items-center mb-3">
                        <div
                            class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[#4a4d4a] text-white flex-shrink-0">
                            <PersonalVideoIcon/>
                        </div>
                        <h2 class="text-black text-lg font-medium">Session Id - </h2>
                    </div>
                    <div class="flex flex-col justify-between flex-grow">
                        <p class="leading-relaxed text-base text-black">Blue bottle crucifix vinyl post-ironic four dollar
                            toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
                        <a href="#" class="mt-3 text-black hover:text-blue-600 inline-flex items-center">Learn More
                            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
    </div>

  )
}

export default cards