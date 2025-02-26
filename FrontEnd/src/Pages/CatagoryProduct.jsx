import React from 'react'
import { useParams } from 'react-router-dom'

const CatagoryProduct = () => {
    const param = useParams();

  return (
    <div>{param?.catagoryName}</div>
  )
}

export default CatagoryProduct