import { useState , useCallback , useEffect , useRef } from 'react'


function App() {
  const [length, setLength] = useState(8) //default value
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setcharAllowed] = useState(false)
  const [password , setPassword] = useState("")

  // useref hook
  const passwordRef = useRef(null)
  

  //Password generator
  const passwordGenerator = useCallback(()=>{
    let pass= ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed){
      str = str + "0123456789"
    }
    if(charAllowed){
      str = str + "!@#$%^&*-_+=[]{}~"
    }

    for (let i = 1; i <= length ;i++){

      let char = Math.floor(Math.random() *str.length+1) //0th value nhi ayi isliye +1

      pass += str.charAt(char)

    }

    setPassword(pass)
 
  },[length , numberAllowed , charAllowed , setPassword])

  const copyPasswordClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0 , 99);  //optimizing
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(()=>{
    passwordGenerator()
  },[length,charAllowed,numberAllowed,passwordGenerator])


 
  return (
    <>
       <div className='w-full max-w-md mx-auto shadow-md
       rounded-lg px-4 my-8 text-orange-500 bg-gray-500'
      >
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadown-md rounded-lg overflow-hidden mb-4'>
         <input type="text"
         value={password}
         className='outline-none w-full py-1 px-3'
         placeholder='password'
         readOnly
         ref={passwordRef}
         />

         <button 
         onClick={copyPasswordClipboard}
         className='outline-none bg-blue-700 text-white
         px-3 py-0.5 shrink-0'>
          copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
            type="range"
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>{
              setNumberAllowed((prev)=>!prev)
            }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={()=>{
              setcharAllowed((prev)=>
                !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
