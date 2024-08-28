import { useEffect, useState } from 'react'

function App() {

  let [ value , setValue ] = useState(0);
  let [ Amount , setAmount ] = useState(0);
  const [ options , setOptions ] = useState({})

  let [ selectFromCurrency , setSelectFromCurrency ] = useState('usd');
  let [ selectToCurrency , setSelectToCurrency ] = useState('inr');

  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${selectFromCurrency}.json`)
    .then((res) => res.json())
    .then((res) => setOptions(res[selectFromCurrency]))
  } , [selectFromCurrency])

  const changeFromCurrency = (e) => {
    setSelectFromCurrency(e.target.value);
  }

  const changeToCurrency = (e) => {
    setSelectToCurrency(e.target.value);
  }


    const changeInput = (e) => {
        const newValue = parseInt(e.target.value);
        if (!isNaN(newValue)) {
            setValue(newValue);
        }
        else {
            setValue(0);
        }
    }

    const convertAmount = (e) => {
      e.preventDefault();
      let ans = value * options[selectToCurrency];
      let finAns = Number(parseFloat(ans.toFixed(2)));
      setAmount(finAns);
    }

    const swapCurrency = () => {
      let val = Amount;
      setAmount(value);
      setValue(val);
      let curr = selectFromCurrency;
      setSelectFromCurrency(selectToCurrency);
      setSelectToCurrency(curr);
    };

  return (
    <form onSubmit={convertAmount}>
    <div className=' bg-black h-screen w-full text-center '>
      <h1 className=' text-white uppercase font-bold text-xl text-center'>Currency Converter</h1>
      <div className=' bg-slate-300 h-1/3 w-1/3 absolute top-1/3 bottom-1/3 left-1/3 right-1/3 pt-10 flex flex-col justify-between max-lg:w-1/2 max-lg:left-1/4 max-lg:right-1/4 max-sm:w-full max-sm:left-0'>
        <div className=' flex justify-between px-10'>
            <div>
                <p>From</p>
                <input
                    type = "number"
                    value= {value}
                    onChange={changeInput}
                    className=' w-10 text-center bg-transparent border-none'
                />
            </div>
            <div>
                <div>Currency</div>
                <select value = {selectFromCurrency} onChange={changeFromCurrency}>
                  {Object.keys(options).map((currency) => (
                    <option key = {currency} value = {currency} >
                      {currency}
                    </option>
                  ))}
                </select>
            </div>
        </div>
        <div>
          <div onClick={swapCurrency} className=' text-white bg-blue-800 inline py-1 px-1 cursor-pointer active:bg-blue-700 text-sm'>swap</div>
        </div>
        <div className=' flex justify-between px-10'>
            <div>
                <p>To</p>
                <p>{Amount}</p>
            </div>
            <div>
                <div>Currency</div>
                <select value = {selectToCurrency} onChange={changeToCurrency}>
                  {Object.keys(options).map((currency) => (
                    <option key = {currency} value = {currency}>
                      {currency}
                    </option>
                  ))}
                </select>
            </div>
        </div>
        <button type = "submit" className=' text-white bg-blue-800 uppercase py-2 active:bg-blue-700'>Convert {selectFromCurrency} To {selectToCurrency}</button>
        </div>
    </div>
    </form>
  )
}

export default App
