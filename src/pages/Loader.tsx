import React from 'react'

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className="flex items-center justify-center">
  <div className="w-12 h-12 border-t-4 border-b-4 border-white rounded-full animate-spin"></div>
</div>

  )
}

export default Loader