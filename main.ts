console.log("Hello world")

import * as fs from 'fs';
import * as path from 'path'
import * as download from 'image-downloader'

const data = fs.readFileSync(path.join(process.cwd(), 'fixtures', 'catbox.data'), 'utf8');

const lines = data.split("\n");
lines.forEach(console.log)

async function main() {

    for (const url of lines) {
        try {

            const {filename} = await download.image({
                url, dest: path.join(process.cwd(), 'dist')
            })
            
            const updatedFileName = path.join(path.dirname(filename), new Date().getTime().toString() + path.extname(filename))
            fs.renameSync(filename, updatedFileName)
            console.log("Saved as", updatedFileName)
        } catch (e) {
            console.error(e)
        }
    }

}

main();