const ObjectTeams = {
    "universitario": "Universitario",
    "alianza-lima": "Alianza Lima",
    "sporting-cristal": "Sporting Cristal",
    "cusco-fc": "Cusco FC",
    "melgar": "Melgar",
    "cienciano": "Cienciano",
    "atletico-grau": "Atlético Grau",
    "garcilaso": "Garcilaso",
    "alianza-atletico": "Alianza Atlético",
    "adt": "ADT",
    "sport-huancayo": "Sport Huancayo",
    "chankas": "Los Chankas",
    "comerciantes-unidos": "Comerciantes U.",
    "sport-boys": "Sport Boys",
    "utc": "UTC",
    "mannucci": "Mannucci",
    "ucv": "Vallejo",
    "union-comercio": "Unión Comercio",
}

export const teamsConvertedName = (name) => {
    const nameTeam = ObjectTeams?.[name] || ''
    return nameTeam
}