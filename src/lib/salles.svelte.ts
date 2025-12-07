import { universities, sallesEvents, type Event } from "@cours-esir/salles_module"
import { PromisePool } from '@supercharge/promise-pool'

function getMonday(d: Date) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

type dataType = { [university: string]: { [building: string]: { [room: string]: { events: Event[], id: string } } } }

class Salles {

    static update = new Date(0)

    static dataEvents: dataType = {}

    static setDataFromPath(p1: string, p2: string, p3: string, n: { events: Event[], id: string }) {
        if (Salles.dataEvents[p1] === undefined) { Salles.dataEvents[p1] = {} }
        if (Salles.dataEvents[p1][p2] === undefined) { Salles.dataEvents[p1][p2] = {} }
        Salles.dataEvents[p1][p2][p3] = n
    }

    async getCal() {
        let date = new Date()

        if (date.getTime() - Salles.update.getTime() > 1000 * 60 * 60 * 3) {
            Salles.update = date
            let dateS = getMonday(new Date())
            let dateE = new Date()
            dateE.setDate(dateS.getDate() + 14)

            let promises: { id: string, rootUrl: string, resourceId: string, projectId: string }[] = []

            for (let university of universities) {
                for (let building of university.buildings) {
                    for (let room of building.rooms) {
                        let id = btoa(JSON.stringify([university.name, building.name, room.name]))
                        promises.push({ id, rootUrl: university.rootUrl, resourceId: room.resourceId, projectId: room.projectId })
                    }
                }
            }

            await PromisePool.withConcurrency(10).for(promises).process(async el => {
                for (let i = 0; i < 5; i++) {
                    try {
                        let events = await sallesEvents(el.rootUrl, [el.resourceId], el.projectId, dateS, dateE)
                        let path = JSON.parse(atob(el.id))
                        Salles.setDataFromPath(path[0], path[1], path[2], {
                            events, id: el.id
                        })
                        return
                    } catch (error) {
                        console.error("Could not load", atob(el.id), "try", i)
                    }
                }
                console.error("Could not load", atob(el.id))
            })
        }
        return Salles.dataEvents
    }

    async getByKey(key: string): Promise<{ events: Event[]; id: string; }> {
        let cal = await this.getCal()
        let path = JSON.parse(atob(key))
        return cal[path[0]][path[1]][path[2]]
    }
}

export let salles = new Salles()