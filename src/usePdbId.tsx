import { useState, useEffect } from 'react'

const getPdbQuery = (geneName: string) => {
  return JSON.stringify({
    "query": {
      "type": "terminal",
      "service": "text",
      "parameters": {
        "attribute": "rcsb_entity_source_organism.rcsb_gene_name.value",
        "operator": "exact_match",
        "value": geneName,
        "case_sensitive": false
      }
    },
    "return_type": "entry"
  })
}

export const usePdbId = (geneName?: string) => {
  const [pdbId, setPdbId] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (geneName) {
      setIsLoading(true)
      const query = encodeURIComponent(getPdbQuery(geneName))
      fetch("https://search.rcsb.org/rcsbsearch/v2/query?json=" + query)
      .then((r) => r.json())
      .then(json => {
        setPdbId(json.result_set[0].identifier)
        setIsLoading(false)
      })
    }

  }, [geneName])

  return { pdbId, isLoading, setPdbId }
}
