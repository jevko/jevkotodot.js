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

  const subnodes = []
  const attrs = [["label=", JSON.stringify(rootLabel)]]
  for (let i = 1; i < subjevkos.length; ++i) {
    const {prefix, jevko} = subjevkos[i]
    const label = prefix.trim()
    if (label.endsWith('=')) {
      if (jevko.subjevkos.length > 0) throw Error("complex attribute")
      const value = jevko.suffix
      attrs.push([label, JSON.stringify(value)])
    }
    else subnodes.push([label, jevko])
  }
  const attrstr = attrs.map(([k, v]) => `${k}${v}`).join(',')

  let ret = `node [${attrstr}] ${nodeId}\n`
  
  for (let i = 0; i < subnodes.length; ++i) {
    const [label, jevko] = subnodes[i]
    const subNodeId = nodeId + i + '_'
    // edgeLabels[subNodeId] = prefix
    ret += jevkoToDotContent(jevko, subNodeId)
    ret += `edge [label=${JSON.stringify(label)}] ${nodeId} -> ${subNodeId}\n`
  }

  return ret
}
