import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import DMTool from './component/DmTool.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-black example'>
        <DMTool />
      </div>      
    </>
  )
}

export default App
