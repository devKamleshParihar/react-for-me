import { useState,useCallback ,useEffect,useRef} from 'react'

function App() {
  const [length ,setLength] = useState(8)
  const [includeNum ,setNum] = useState(false)
  const [includeChar ,setChar] = useState(false)
  const [Password ,setPassword] = useState('')
  //useRef hook
  const passwordRef = useRef(null)
  const copyPasswordToClipboard = useCallback(()=>{
   passwordRef.current?.select()
  //  passwordRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(Password)
  },[Password])

  const passwordGenerator = useCallback(()=>{
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(includeNum) str+= '0123456789'
    if(includeChar) str+= '~!@#$%^&*(){}_+'
    for(let i = 1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  } ,[length,includeNum,includeChar ,setPassword])
//useCallback use for method optimized , hold on cache 
//if any change on these  propertise so use  useEffect hook
useEffect(()=>{
  passwordGenerator()
},[length,includeNum,includeChar,passwordGenerator])
  

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700  '>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" 
          value={Password}
          className='outline-none w-full py-1 px-3 '
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex test-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            min={8}
            max={100}
            value={length}
            type="range"
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
             />
             <label htmlFor="">Lenght : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={includeNum}
            id='numberInput'
            onChange={()=>{
              setNum((prev)=> !prev);
            }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={includeChar}
            id='CharInput'
            onChange={()=>{
              setChar((prev)=> !prev);
            }}
            />
            <label htmlFor="CharInput">Charactors</label>
          </div>


        </div>
      </div>
    </>
  )
}

export default App
