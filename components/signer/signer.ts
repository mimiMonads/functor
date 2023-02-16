import short from "./short.ts"
import validChar from "../util/validChar.ts"

export default async (seed?: string) => (
    arp => (
        v => (s:string) =>(
            p => s + "."+ v[arp[0](p)]+ v[arp[1](p)]+ v[arp[2](p)]+ v[arp[3](p)]+
            v[arp[4](p)]+ v[arp[5](p)]+v[arp[6](p)]+v[arp[7](p)]
        )(
            [s.charCodeAt(0),s.charCodeAt(1),s.charCodeAt(2),s.charCodeAt(3)
                ,s.charCodeAt(4),s.charCodeAt(5),s.charCodeAt(6),s.charCodeAt(7)]
        )
    )(
        [...validChar]
    )
)(
    await short(seed)
)