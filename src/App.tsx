import './App.css'

import { FormEventHandler, useEffect, useState } from 'react'
import { Viewer } from './Viewer'

import { usePdbId } from './usePdbId'

function App() {
  const [geneName, setGeneName] = useState<string | undefined>(undefined)
  const { pdbId, isLoading, setPdbId } = usePdbId(geneName)

  useEffect(() => {
    setGeneName('')
  }, [pdbId])

  const handleGeneName : FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const gene = fd.get('geneName')
    if (gene) {
      setGeneName(gene as string)
    }
  }

  const handleProteinCode : FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const code = fd.get('proteinCode')
    if (code) {
      setPdbId(code as string)
    }
  }

  return (
    <>
      <h1>PDB viewer</h1>
      <form onSubmit={handleGeneName}>
        <label>
          <span>Search by gene name:</span>
          <input type='text' name='geneName' placeholder='e.g. epha2' />
        </label>
        <button type='submit' disabled={isLoading}>Go</button>
      </form>
      <form onSubmit={handleProteinCode}>
        <label>
          <span>Search by protein structure code:</span>
          <input type='text' name='proteinCode' placeholder='e.g. 4P2K' />
        </label>
        <button type='submit' disabled={isLoading}>Go</button>
      </form>
      <Viewer pdbId={pdbId} />
    </>
  )
}

export default App
