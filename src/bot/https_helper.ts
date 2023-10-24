import { get } from "https"

export interface DataObject {
    data: string;
}

export async function get_page_data(url: string, data_obj: DataObject): Promise<void> {

    return new Promise((resolve) => {

        get(url, res => {

            res.on('data', chunk => { data_obj.data += chunk }) 

            res.on('end', () => {

               resolve();
            })
        }) 
    })
}