import {parse as parse_path, dirname, basename, resolve} from "path";

if(!require.main?.filename) throw new Error("No main file");

export const main_dir = dirname(basename(parse_path(require.main?.filename).dir));