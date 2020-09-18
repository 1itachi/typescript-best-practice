/* eslint-disable no-mixed-spaces-and-tabs */


//Martian class
export class Martian {
    private _name : string;
    constructor(name:string){
    	this._name = name;
    }
    get name() : string {
    	return this._name;
    }
}

//Spaceship
export interface Spaceship {
    name ?: string;
    crew ?: Array<Martian>;
    daughterShips?: Array<Spaceship>;
}

class Drone implements Spaceship  {}


class MotherShip implements Spaceship {
    name : string;
    _crew : Array<Martian>;
    _daughterShips?: Array<Spaceship>;
    constructor (name: string, crew: Array<Martian>, daughterShips?: Array<Spaceship>){
    	this.name = name;
    	this._crew = crew;
    	this._daughterShips = daughterShips||[];
    }
    get daughterShips(): Array<Spaceship>{
    	return this._daughterShips;
    }
    set daughterShips (arr: Array<Spaceship>) {
    	this._daughterShips = arr;
    } 

    get crew(): Array<Martian>{
    	return this._crew;
    } 

}

//utility functions::::::::::::::::::n
export function droneFactory(): Spaceship {
	return new Drone();
}

export function mothershipFactory(name: string, crew: Martian[], daughterShips?: Spaceship[]): Spaceship{
	return new MotherShip(name, crew, daughterShips);
}

export function martianFactory(name: string): Martian {
	return new Martian(name);
}

export function getDaughterShips(ship: Spaceship): Array<Spaceship> {
	if (JSON.stringify(ship)=='{}') return [];
	return ship.daughterShips;
}

//***********End of Utility functions*********** */

//returns true is the space ship has crew called Mork
export function hasMork(ship: Spaceship): boolean {
	if (JSON.stringify(ship)=='{}') return false;
	const morks: Array<Martian> = ship.crew;
	return morks.some((ele)=> ele.name==='Mork');
}


//returns the count of total Mork
export function totalMorks(ship: Spaceship): number {
	if (JSON.stringify(ship)=='{}') return 0;
	const crew: Array<Martian> = ship.crew;
	const count = countOccurrences(crew, 'Mork');
	if(getDaughterShips.length==0) return count;
	const ships = getDaughterShips(ship);
	return count + (ships).reduce(reducer, 0);
}

const reducer = (accumulator: number, currentValue:Spaceship): number => accumulator + totalMorks(currentValue);
//Count occurances of a particular Martian
const countOccurrences = (arr: Array<Martian>, val:string) : number => arr.reduce((a, v) => (v.name == val ? a + 1 : a), 0);

//Ship without drones
export function shipWithoutDrones (ship: Spaceship):Spaceship {
	if (JSON.stringify(ship)=='{}') return undefined;
	const daughterShips: Array<Spaceship> = ship.daughterShips.filter((ele)=> JSON.stringify(ele)!='{}');
	return mothershipFactory(ship.name, ship.crew, daughterShips);
}


//Ship without deep drones
export function shipWithoutDeepDrones (ship: Spaceship): Spaceship {
	if (JSON.stringify(ship)=='{}') return undefined;
	const daughterShips: Array<Spaceship> = ship.daughterShips.filter((ele)=> JSON.stringify(ele)!='{}');
	return mothershipFactory(ship.name, ship.crew, daughterShips.map(ele=>removeDrones(ele)));
}

function removeDrones (ship: Spaceship): Spaceship {
	const daughterShips: Array<Spaceship> = ship.daughterShips.filter((ele)=> JSON.stringify(ele)!='{}');
	return mothershipFactory(ship.name, ship.crew, daughterShips.map(ele=>removeDrones(ele)));
}


//Eliminate all ships with mork as a crew member
export function shipWithoutDeepMorks (ship: Spaceship): Spaceship {
	if (ship.crew.some(ele=> ele.name==='Mork')) return undefined;
	const daughterShips: Array<Spaceship> = ship.daughterShips.filter((daughterShip)=> !hasMork(daughterShip));
	return mothershipFactory(ship.name, ship.crew, daughterShips.map(ele=>removeMork(ele)));
}

function removeMork (ship: Spaceship): Spaceship {
	if (JSON.stringify(ship)=='{}') return ship;
	const daughterShips: Array<Spaceship> = ship.daughterShips.filter((daughterShip)=> !hasMork(daughterShip));
	ship.daughterShips = daughterShips.map(ele=> removeMork(ele));
	return ship;
}

//Ship without morks but promoter their Daughters
export function shipWithoutMorksButPromoteTheirDaughters(ship: Spaceship): Spaceship {
	if(hasMork(ship)) return undefined;
	const removedDaughters: Array<Spaceship> = ship.daughterShips.filter(ele=>hasMork(ele));
	const validDaughters: Array<Spaceship> = ship.daughterShips.filter(ele=> !hasMork(ele));
	removedDaughters.forEach(ele=>{
		ele.daughterShips.forEach(grandDaughters=>{
			validDaughters.push(grandDaughters);
		});
	});

	return mothershipFactory(ship.name, ship.crew, validDaughters);
}





