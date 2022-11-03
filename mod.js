export const jevkoToDot = (jevko, name = "G") => {
  return `digraph ${name} {\n${jevkoToDotContent(jevko)}}`
}

const jevkoToDotContent = (jevko, nodeId = "_") => {
  const {subjevkos, suffix} = jevko

  if (subjevkos.length === 0) {
    return `node [label=${JSON.stringify(suffix.trim())}] ${nodeId}\n`
  }

  let rootLabel 
  {
    const {prefix, jevko} = subjevkos[0]

    if (prefix.trim() !== "") throw Error("invalid header")
  
    rootLabel = jevko.suffix.trim()
  }

  let ret = `node [label=${JSON.stringify(rootLabel)}] ${nodeId}\n`
  
  for (let i = 1; i < subjevkos.length; ++i) {
    const {prefix, jevko} = subjevkos[i]
    const subNodeId = nodeId + i + '_'
    // edgeLabels[subNodeId] = prefix
    ret += jevkoToDotContent(jevko, subNodeId)
    ret += `edge [label=${JSON.stringify(prefix.trim())}] ${nodeId} -> ${subNodeId}\n`
  }

  return ret
}
