import React, { useEffect, useRef } from 'react'
import * as $3Dmol from '3dmol'

interface ViewerProps {
  pdbId?: string
}

export const Viewer : React.FC<ViewerProps> = ({ pdbId }) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<$3Dmol.GLViewer>()

  useEffect(() => {
    viewerRef.current = $3Dmol.createViewer(elementRef.current, { backgroundAlpha: 0.25 })
  }, [])

  useEffect(() => {
    viewerRef.current?.clear()
    if (pdbId) {
      $3Dmol.download('pdb:' + pdbId, viewerRef.current, {})
    }
  }, [pdbId])

  return (
    <div ref={elementRef} className='viewer' />
  )
}
