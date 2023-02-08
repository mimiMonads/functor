import {JsonStringType} from "../types.ts"

export default 
    (x:JsonStringType) =>
    "const" in x
        ? `'"${x.name}":"${x.const}"'`
        : x.required && !("default" in x)
            ? `'"${x.name}":' + str(o.${x.name})`
            : `'"${x.name}":' + (typeof o.${x.name} === "string"?str(o.${x.name}):'${"default" in x ? '"' + x.default + '"': null}')`