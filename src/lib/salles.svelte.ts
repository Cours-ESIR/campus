import { data, sallesEvents, type Event } from "@cours-esir/salles_module"

function getMonday(d: Date) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

type dataType = { [university: string]: { [building: string]: { [room: string]: { events: Event[], id: string } } } }

class Salles {

    static update = new Date(0)

    static data: dataType = {}

    async getCal() {
        let date = new Date()

        if (date.getTime() - Salles.update.getTime() > 1000 * 60 * 60 * 3) {
            Salles.update = date
            let dateS = getMonday(new Date())
            let dateE = new Date()
            dateE.setDate(dateS.getDate() + 14)

            try {
                let ndata: dataType = {}
                for (let university of data) {
                    ndata[university.name] = {}
                    for (let building of university.buildings) {
                        ndata[university.name][building.name] = {}
                        for (let room of building.rooms) {
                            let events = await sallesEvents(university.rootURL, [room.resourceId], "1", dateS, dateE)
                            let id = btoa(JSON.stringify([university.name, building.name, room.name]))
                            ndata[university.name][building.name][room.name] = {
                                events, id
                            }
                        }
                    }
                }
                Salles.data = ndata
            }


        }
        return Salles.data
    }

    async getByKey(key: string): Promise<{ cal: Event[]; id: string; }> {
        let cal = await this.getCal()
        let path = JSON.parse(atob(key))
        return cal[path[0]][path[1]][path[2]]
    }
}

export let salles = new Salles()