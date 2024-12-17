export type Jugador = {
    jugador: string;
    slug: string;
  };

  export const playersNames: { [key: number]: string } = {
    1: "Humberto Horacio Ballesteros",
    2: "Ruben Correa",
    3: "Juan Honores",
    4: "Oscar Ibañez",
    5: "Dimas Zegarra",
    6: "Juan Carlos Zubzuck",
    7: "Pedro Gonzalez",
    8: "Luis La Fuente",
    9: "Leo Rojas",
    10: "Eleazar Soria",
    11: "Ismael Soria",
    12: "Carlos Tovar",
    13: "Humberto Arguedas",
    14: "Mario De Las Casas",
    15: "Jose Fernandez",
    16: "John Galliquio",
    17: "Pedro Requena",
    18: "Juan Reynoso",
    19: "Marcelo Asteggiano",
    20: "Hector Chumpitaz",
    21: "Fernando Cuellar",
    22: "Ruben Diaz",
    23: "Carlos Galvan",
    24: "Freddy Ternero",
    25: "Nicolas Fuentes",
    26: "Hugo Gastulo",
    27: "Giuliano Portilla",
    28: "Victor Salas",
    29: "Miguel Trauco",
    30: "Juan Manuel Vargas",
    31: "Juan Carlos Bazalar",
    32: "Jose Luis Carranza",
    33: "Hernan Castaneda",
    34: "Javier Chirinos",
    35: "Samuel Eugenio",
    36: "Luis Reyna",
    37: "Luis Cruzado",
    38: "Roberto Chale",
    39: "Jose Del Solar",
    40: "Alberto Denegri",
    41: "Ruben Techera",
    42: "Rainer Torres",
    43: "Edison Flores",
    44: "Gustavo Grondona",
    45: "Jorge Amado Nunes",
    46: "Orestes Jordan",
    47: "Cesar Socarraz",
    48: "Toto Terry",
    49: "Jaime Drago",
    50: "German Leguia",
    51: "Paolo Maldonado",
    52: "Roberto Martinez",
    53: "Fidel Suarez",
    54: "Percy Vilchez",
    55: "Juan Carlos Oblitas",
    56: "Juan Jose Ore",
    57: "Oswaldo Ramírez",
    58: "Percy Rojas",
    59: "Daniel Ruiz",
    60: "Angel Uribe",
    61: "Piero Alva",
    62: "Enrique Casareto",
    63: "Eduardo Esidio",
    64: "Lolo Fernandez",
    65: "Juan José Muñante",
    66: "Raúl Ruidíaz"
  };
  
  
  export const jugadoresPorPosicion: { [posicion: string]: string[] } = {
    "arquero": [
      '01-humberto-horacio-ballesteros',
      '02-ruben-correa',
      '03-juan-honores',
      '04-oscar-ibañez',
      '05-dimas-zegarra',
      '06-juan-carlos-zubzuck'
    ],
    "lateral-derecho": [
      '07-pedro-gonzalez',
      '08-luis-la-fuente',
      '09-leo-rojas',
      '10-eleazar-soria',
      '11-ismael-soria',
      '12-carlos-tovar'
    ],
    "central-derecho": [
      '13-humberto-arguedas',
      '14-mario-de-las-casas',
      '15-jose-fernandez',
      '16-john-galliquio',
      '17-pedro-requena',
      '18-juan-reynoso'
    ],
    "central-izquierdo": [
      '19-marcelo-asteggiano',
      '20-hector-chumpitaz',
      '21-fernando-cuellar',
      '22-ruben-diaz',
      '23-carlos-galvan',
      '24-freddy-ternero'
    ],
    "lateral-izquierdo": [
      '25-nicolas-fuentes',
      '26-hugo-gastulo',
      '27-giuliano-portilla',
      '28-victor-salas',
      '29-miguel-trauco',
      '30-juan-manuel-vargas'
    ],
    "contencion-derecho": [
      '31-juan-carlos-bazalar',
      '32-jose-luis-carranza',
      '33-hernan-castaneda',
      '34-javier-chirinos',
      '35-samuel-eugenio',
      '36-luis-reyna'
    ],
    "contencion-izquierdo": [
      '37-luis-cruzado',
      '38-roberto-chale',
      '39-jose-del-solar',
      '40-alberto-denegri',
      '41-ruben-techera',
      '42-rainer-torres'
    ],
    "volante-derecho": [
      '43-edison-flores',
      '44-gustavo-grondona',
      '45-jorge-amado-nunes',
      '46-orestes-jordan',
      '47-cesar-socarraz',
      '48-toto-terry'
    ],
    "volante-izquierdo": [
      '49-jaime-drago',
      '50-german-leguia',
      '51-paolo-maldonado',
      '52-roberto-martinez',
      '53-fidel-suarez',
      '54-percy-vilchez'
    ],
    "delantero-derecho": [
      '55-juan-carlos-oblitas',
      '56-juan-jose-ore',
      '57-oswaldo-ramírez',
      '58-percy-rojas',
      '59-daniel-ruiz',
      '60-angel-uribe'
    ],
    "delantero-izquierdo": [
      '61-piero-alva',
      '62-enrique-casareto',
      '63-eduardo-esidio',
      '64-lolo-fernandez',
      '65-juan-josé-muñante',
      '66-raúl-ruidíaz'
    ]
  };
  
  export const playersPosition = (posicion: string): Jugador[] => {
    const jugadores = jugadoresPorPosicion[posicion];
    if (!jugadores) {
      return [];
    }
  
    return jugadores.map(jugadorSlug => {
      const [numero, ...nombreParts] = jugadorSlug.split('-');
      const nombre = nombreParts.join(' ');
      return {
        jugador: nombre.charAt(0).toUpperCase() + nombre.slice(1).replace(/-/g, ' '),
        slug: jugadorSlug
      };
    });
  };
  