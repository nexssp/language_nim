# Nexss PROGRAMMER 2.x - Nim
# Default template for JSON Data

import json

var f : File;
discard f.open(0, fmRead)
let s = f.readLine()

let nexssStdout = parseJson(s)

nexssStdout["HelloFromNim"] = newJString(NimVersion)

echo nexssStdout