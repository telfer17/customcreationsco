'use client'

export const BackButton = () => {
  const goBack = () => {
    window.history.back()
  }

  return (
    <button className='flex max-w-2xl mb-4 text-sm underline text-primary font-montserrat' onClick={goBack}>
      Back
    </button>
  )
}
