import { expect } from 'chai';
import Manager from '../src/Manager';

describe.only('Manager', function() {
  let manager;
  let users;
  let bookings;
  let rooms;

  beforeEach(function() {
    users = [
      {
        "id": 1,
        "name": "Leatha Ullrich"
      },
      {
        "id": 2,
        "name": "Rocio Schuster"
      },
      {
        "id": 3,
        "name": "Kelvin Schiller"
      },
      {
        "id": 4,
        "name": "Kennedi Emard"
      }
    ];

    bookings = [
      {
        "id": "5fwrgu4i7k55hl6sz",
        "userID": 1,
        "date": "2020/04/22",
        "roomNumber": 1,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t5",
        "userID": 2,
        "date": "2020/01/10",
        "roomNumber": 2,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t6",
        "userID": 3,
        "date": "2020/01/10",
        "roomNumber": 3,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t7",
        "userID": 4,
        "date": "2020/02/16",
        "roomNumber": 4,
        "roomServiceCharges": []
      }
    ];

    rooms = [
      {
        "number": 1,
        "roomType": "residential suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 358.4
      },
      {
        "number": 2,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "full",
        "numBeds": 2,
        "costPerNight": 477.38
      },
      {
        "number": 3,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "king",
        "numBeds": 1,
        "costPerNight": 491.14
      },
      {
        "number": 4,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 429.44
      }
    ];

    manager = new Manager(users, bookings, rooms);
  });

  it('should be a function', function() {
    expect(Manager).to.be.a('function');
  });

  it('should be an instance of User', function() {

    expect(manager).to.be.an.instanceof(Manager);
  });

  it('should only take in arrays as arguments', function() {
    expect(users, bookings, rooms).to.be.instanceof(Array);
  });

  it('should be able to search for a user by name', function() {
    let searchGuest = manager.searchForGuest("Leatha Ullrich");

    expect(searchGuest).to.deep.equal({
      guest: users[0].name,
      bookings: [bookings[0]],
      spent: 358.4
    })
  })
});