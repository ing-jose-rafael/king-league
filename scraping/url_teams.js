import { TEAMS } from '../db/index.js'

/*
	Las url de la informacion de cada equipo tiene siempre
	el patron de la url base 'https://kingsleague.pro/team/'
	añadiendole el id del equipo.
	Se generan siguiendo este patron de las url de la pagina
	oficial.
*/
export function getURLTeams() {
	return TEAMS.map(({ id, ...restOfTeam }) => ({
		...restOfTeam,
		url: `https://kingsleague.pro/team/${id}`
	}))
}

const urkTeam = getURLTeams()
console.log(urkTeam)
