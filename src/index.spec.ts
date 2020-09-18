import {assert} from 'chai';
import { Spaceship, droneFactory, getDaughterShips, Martian, hasMork, totalMorks, mothershipFactory, 
	shipWithoutDrones, shipWithoutDeepDrones, shipWithoutDeepMorks, shipWithoutMorksButPromoteTheirDaughters} from './index';


describe('illustrations of equality', function () {

	it('Should print empty array for drone', ()=>{
		const drone: Spaceship = droneFactory();
		assert.deepEqual([],getDaughterShips(drone));
	});

	it('Should return true if the Spaceship has a Martian called Mork', ()=>{
		const motherShip: Spaceship = mothershipFactory('Enterprise', [new Martian('Mark'), new Martian('fake'), new Martian('Mork')]);
		assert.equal(hasMork(motherShip), true);
	});

	it('Should return occurances of Mork in crew and crews of daughterships', ()=>{
		const daughter1: Spaceship = mothershipFactory('Daughter1', [new Martian('Mark'), new Martian('fake'), new Martian('Mork'), new Martian('Mork')]);
		const drone: Spaceship = droneFactory();
		const motherShip: Spaceship = mothershipFactory('Enterprise', [new Martian('Mark'), new Martian('fake'), new Martian('Mork'), new Martian('Mork')], [daughter1, drone]);  
		assert.equal(totalMorks(motherShip), 4);
	});
    
	it('Should return new mothership with no drones as daughter', ()=>{
		const daughter1: Spaceship = mothershipFactory('Daughter1', [new Martian('Mark'), new Martian('fake'), new Martian('Mork'), new Martian('Mork')]);
		const drone: Spaceship = droneFactory();
		const motherShip: Spaceship = mothershipFactory('Enterprise', [new Martian('Mark'), new Martian('fake'), new Martian('Mork'), new Martian('Mork')], [daughter1,drone, drone]);
		const motherShipRes: Spaceship = mothershipFactory('Enterprise', [new Martian('Mark'), new Martian('fake'), new Martian('Mork'), new Martian('Mork')], [daughter1]);
		assert.deepEqual(shipWithoutDrones(motherShip), motherShipRes);
	});

	it('Should return undefined when a non mothership passed through shipWithoutDrones', ()=>{
		const drone: Spaceship = droneFactory();
		assert.equal( shipWithoutDrones(drone), undefined);
	});

	it('Should return undefined when a non mothership passed through shipWithoutDeepDrones', ()=>{
		const drone: Spaceship = droneFactory();
		assert.equal( shipWithoutDeepDrones(drone),undefined);
	});

	it('Should return no drones in shipWithoutDeepDrones', ()=>{
		const drone: Spaceship = droneFactory();
		const daughter1: Spaceship = mothershipFactory('Daughter1', [new Martian('Mark'), new Martian('fake'), new Martian('Mork'), new Martian('Mork')], [drone, drone]);
		const daughter2: Spaceship = mothershipFactory('Daughter1', [new Martian('Mark'), new Martian('fake'), new Martian('Mork'), new Martian('Mork')], []);
		const motherShip: Spaceship = mothershipFactory('Enterprise', [new Martian('Mark'), new Martian('fake'), new Martian('Mork'), new Martian('Mork')], [daughter1,drone, drone]);
		const motherShipRes: Spaceship = mothershipFactory('Enterprise', [new Martian('Mark'), new Martian('fake'), new Martian('Mork'), new Martian('Mork')], [daughter2]);
		assert.deepEqual(shipWithoutDeepDrones(motherShip),motherShipRes);
	});

	it('Should return undefined when a mothership passed contains Mork as a crew member through shipWithoutDeepMorks', ()=>{
		const motherShip: Spaceship = mothershipFactory('Enterprise', [new Martian('Mark'), new Martian('fake'), new Martian('Mork'), new Martian('Mork')]);
		assert.equal(shipWithoutDeepMorks(motherShip), undefined);
	});

	it('Should return daughter ships without Mork as a crew member through shipWithoutDeepMorks', ()=>{
		const drone: Spaceship = droneFactory();
		const daughter1: Spaceship = mothershipFactory('Daughter1', [new Martian('Mark'), new Martian('fake'), new Martian('Mork'), new Martian('Mork')], [drone, drone]);
		const daughter2: Spaceship = mothershipFactory('Daughter2', [new Martian('Mark'), new Martian('fake')], [daughter1, drone]);
		const motherShip: Spaceship = mothershipFactory('Enterprise', [new Martian('Mark'), new Martian('fake')], [daughter1, daughter2]);
		const resDaughter: Spaceship = mothershipFactory('Daughter2', [new Martian('Mark'), new Martian('fake')], [drone]);
		const resShip: Spaceship = mothershipFactory('Enterprise', [new Martian('Mark'), new Martian('fake')], [resDaughter]);
		assert.deepEqual(shipWithoutDeepMorks(motherShip), resShip);
	});

	it('Should return undefined if ship has crew called Mork through shipWithoutMorksButPromoteTheirDaughters', ()=>{
		const motherShip: Spaceship = mothershipFactory('Enterprise', [new Martian('Mark'), new Martian('fake'), new Martian('Mork')]);
		assert.equal(shipWithoutMorksButPromoteTheirDaughters(motherShip), undefined);
	});
    
	it('Should promote the granddaughters as daughters through shipWithoutMorksButPromoteTheirDaughters', ()=>{
		const drone: Spaceship = droneFactory();
		const daughter1: Spaceship = mothershipFactory('Daughter1', [new Martian('Mark'), new Martian('fake'), new Martian('Mork'), new Martian('Mork')], [drone, drone]);
		const daughter2: Spaceship = mothershipFactory('Daughter2', [new Martian('Mark'), new Martian('fake')], [daughter1, drone]);
		const motherShip: Spaceship = mothershipFactory('Enterprise', [new Martian('Mark'), new Martian('fake')], [daughter1, daughter2]);
		const resShip: Spaceship = mothershipFactory('Enterprise', [new Martian('Mark'), new Martian('fake')], [daughter2,drone, drone]);
		assert.deepEqual(shipWithoutMorksButPromoteTheirDaughters(motherShip), resShip);
	});


});



