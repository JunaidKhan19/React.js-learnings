import { useState , useCallback , useEffect, useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState()

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!$&#"

    for (let i = 1; i <= length; i++) {
      const randomValueFromString = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(randomValueFromString)
    }
    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  } , [password])

  useEffect( () => { passwordGenerator() }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto my-8 px-4 py-3 shadow-md rounded-lg text-orange-500 bg-gray-700 text-center'>
      <h1 className='text-white text-center my-3'>password generator</h1>
      <div className='flex-shadow rounded-lg owerflow-hidden mb-4'>
        <input type="text" value={password} className='outline-none rounded-lg w-full py-1 px-3' placeholder='password' readOnly 
        ref={passwordRef}/>
        <button className='outline-none px-3 py-0.5 bg-blue-500 text-white shrink-0 'onClick={copyPasswordToClipboard}>
          copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>

        <div className='flex items-center gap-x-1'>
          <input 
          type="range" min={6} max={20} value={length} className='cursor-pointer' 
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length : {length} </label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" defaultChecked={numAllowed} id='numberInput'
          onChange={() => {setNumAllowed((prev) => (!prev))}}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" defaultChecked={charAllowed} id='charInput'
          onChange={() => {setCharAllowed((prev) => (!prev))}}
          />
          <label htmlFor='charInput'>Characters</label>
        </div>

      </div>
    </div>
    </>
  )
}

export default App
