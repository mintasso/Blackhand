
export const reasons:  {[key: number]: string} = { 
    1: "uses vulgar words",
    2: "spams", 
    3:"sends_nudes",
    4: "uses_swastika", 
    5: "scams", 
    6: "sends_ads", 
    7:"racist", 
    8: "pedophile", 
    9: "offer_drugs",
    10:"unformal", 
    11: "supports_terrorism",
    12: "inmoral", 
    13: "anti-lgbt", 
    14: "antisemitism"
}

export const ids: {[key: string]: string} = {}

for(const id_ in reasons) {
    ids[reasons[id_]] = id_;
}


export function get_reason_by_id(id_: number) {
    return reasons[id_];
}

export function get_id_by_reason(reason: string) {
    return ids[reason]
}
