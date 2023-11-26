'use client'

export const BackButton = () => {
  const goBack = () => {
    window.history.back()
  }

  return (
    <button
      className='flex max-w-2xl pl-4 mb-6 mr-10 text-sm underline text-primary sm:px-6 lg:max-w-7xl lg:px-8 font-montserrat'
      onClick={goBack}
    >
      Back
    </button>
  )
}
