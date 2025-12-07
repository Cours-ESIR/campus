import * as ZIP from "zip"

type dataType = { [key: string]: { name: string, buffer: Buffer } }

export class Cours {

    static update = new Date(0)
    static dataFiles: dataType = {}

    static async getCours() {
        let date = new Date()

        if (date.getTime() - Cours.update.getTime() > 1000 * 60 * 60 * 3) {
            let dataFiles2: dataType = {}
            try {
                let zip = await fetch("https://github.com/Cours-ESIR/Cours/archive/refs/heads/main.zip")
                let buffer = await zip.arrayBuffer()
                const nodeBuffer = Buffer.from(buffer)
                var reader = ZIP.Reader(nodeBuffer);

                reader.forEach(function (entry) {
                    if (entry.isFile() && entry.getName().endsWith(".md")) {
                        let id = btoa(entry.getName())
                        dataFiles2[id] = {
                            name:entry.getName(),
                            buffer:entry.getData()
                        }
                    }
                });
                Cours.update = date
                Cours.dataFiles = dataFiles2
            } catch (error) {
                console.log("could not update")
            }
        }
        return Cours.dataFiles
    }
    static async getByKey(key: string) {
        return (await Cours.getCours())[key]
    }
}