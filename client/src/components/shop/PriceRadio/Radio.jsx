import React, { useState } from 'react'

function PriceRadio({prices, handleFilters}) {
    // const [selectedPriceId, setSelectedPriceId] = useState("")
    const handleSelected = priceId => () =>{
        // setSelectedPriceId(priceId)
        handleFilters(prices[priceId].value);
    }
    return (
    <>
      {prices.map((price) => (
        <li key={price.id} className="list-group-item px-2 list-unstyled">
          <input
            type="radio"
            id={price.id}
            className="form-radio-input mr-2"
            name="price"
            onChange={handleSelected(price.id)}
          />
          <label htmlFor={price.id}>{price.name}</label>
        </li>
      ))}
    </>
    )
}

export default PriceRadio
