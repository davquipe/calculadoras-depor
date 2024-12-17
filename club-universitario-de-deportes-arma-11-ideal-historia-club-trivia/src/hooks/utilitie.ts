import { Row } from "../types/types"

export const formattedData = (data: Row[], id?: string) => {
    const teams: any[] = []
    let team = {}
    let searchId = ''
    let arquero = ''
    let centralIzquierdo = ''
    let centralDerecho = ''
    let lateralIzquierdo = ''
    let lateralDerecho = ''
    let contencionIzquierdo = ''
    let contencionDerecho = ''
    let volanteIzquierdo = ''
    let volanteDerecho = ''
    let delanteroIzquierdo = ''
    let delanteroDerecho = ''

    data.forEach(player => {
            const getValue = (index: number) => player.c[index]?.v ?? '';
            searchId = getValue(12)
            arquero = getValue(1)
            centralIzquierdo = getValue(2)
            centralDerecho = getValue(3)
            lateralIzquierdo = getValue(4)
            lateralDerecho = getValue(5)
            contencionIzquierdo = getValue(6)
            contencionDerecho = getValue(7)
            volanteIzquierdo = getValue(8)
            volanteDerecho = getValue(9)
            delanteroDerecho = getValue(10)
            delanteroIzquierdo = getValue(11)
            team = {
                searchId,
                arquero,
                centralIzquierdo,
                centralDerecho,
                lateralIzquierdo,
                lateralDerecho,
                contencionIzquierdo,
                contencionDerecho,
                volanteIzquierdo,
                volanteDerecho,
                delanteroIzquierdo,
                delanteroDerecho
            }
            teams.push(team)
        })
    if(id){
        const newId = `${id}, `
        return teams.filter(el => el.searchId === newId)
    }

    return teams
}