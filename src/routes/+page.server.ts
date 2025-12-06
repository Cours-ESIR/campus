import { salleLibres, data, sallesEvents } from "@cours-esir/salles_module"

export const load = async () => {

    let retour: { [university: string]: { [building: string]: { [room: string]: any } } } = {}

    for (let university of data) {
        retour[university.name] = {}
        for (let building of university.buildings) {
            retour[university.name][building.name] = {}
            for (let room of building.rooms) {

                let dateS = new Date()
                let dateE = new Date()
                dateE.setDate(dateS.getDate() + 7);
                let events = await sallesEvents(university.rootURL, [room.resourceId], "1", dateS, dateE)
                let status = salleLibres(events, dateS)
                retour[university.name][building.name][room.name] = status
            }
        }
    }

    return {retour}
}