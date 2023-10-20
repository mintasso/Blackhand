import {get} from "https";
import { createWriteStream, WriteStream} from "fs";
import {resolve, parse as parse_path, basename, dirname} from "path";
import {v4 as uuid4} from "uuid";
import { image_types } from "./variables";
import { main_dir } from "../constants";

// const extension = /.[A-Za-z]+$/;

async function write_file(url: string, stream: WriteStream) {
    const request = get(url, (response) => {
        response.pipe(stream);

        stream.on("finish", () => {
            console.log("write complited")
        })
    })
}


export class FileOrganizer {
    path: string;
    constructor() {
        if(!require.main?.filename) throw new Error("No main file");
        this.path = resolve(main_dir, "files");
    }
    add_file(url: string, contentType: string) {

        const extension = image_types[contentType];
        console.log(url)
        console.log("extension: ", extension);
        const filename = uuid4({}) + extension;

        const path = resolve(this.path, filename)

        const stream = createWriteStream(path, {flags: "w"});

        write_file(url, stream);

        return filename
    }
}

