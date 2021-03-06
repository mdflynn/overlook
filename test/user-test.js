import { expect } from 'chai';
import User from '../src/User';

describe('User', () => {
  let user;
  let users;
  let bookings;
  let rooms;

  beforeEach(() => {
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
        "id": 1,
        "userID": 1,
        "date": "2020/04/22",
        "roomNumber": 1,
      },
      {
        "id": 2,
        "userID": 2,
        "date": "2020/01/10",
        "roomNumber": 2,
      },
      {
        "id": 3,
        "userID": 3,
        "date": "2020/01/10",
        "roomNumber": 3,
      },
      {
        "id": 4,
        "userID": 4,
        "date": "2020/02/16",
        "roomNumber": 4,
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

    user = new User(users, bookings, rooms);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should only take in arrays as arguments', () => {
    expect(users, bookings, rooms).to.be.instanceof(Array);
  });

  it('should contain data for all users', () => {
    expect(user.users).to.deep.equal(users);
  });

  it('should contain data for all bookings', () => {
    expect(user.bookings).to.deep.equal(bookings);
  });

  it('should contain data for all rooms', () => {
    expect(user.rooms).to.deep.equal(rooms);
  });

  it('should find booked rooms by date', () => {
    expect(user.findBookedRooms("2020/01/10")).to.deep.equal([2, 3]);
  });

  it('should filter out booked rooms on a date', () => {
    const bookedRooms = user.findBookedRooms("2020/01/10");
    const filteredRooms = user.filterBookedRooms(bookedRooms);
    expect(filteredRooms).to.deep.equal([rooms[0], rooms[3]])
  });

  it('should be able to search availability by date', () => {
    expect(user.searchAvailability("2020/01/10")).to.deep.equal([rooms[0], rooms[3]]);
  });

  it('should be able to search availability by a different date', () => {
    expect(user.searchAvailability("2020/02/16")).to.deep.equal([rooms[0], rooms[1], rooms[2]]);
  });

  it('should be able to remove a booking', () => {
    user.cancelBooking(bookings[3]);
    let bookedRooms = [bookings[0], bookings[1], bookings[2]];

    expect(user.bookings).to.deep.equal(bookedRooms);
  });

  it('should be able to remove another booking', () => {
    user.cancelBooking(bookings[3]);
    user.cancelBooking(bookings[2]);
    let bookedRooms = [bookings[0], bookings[1]];

    expect(user.bookings).to.deep.equal(bookedRooms);
  });

  it('should find a guest by name', () => {
    expect(user.findGuestByName("Leatha Ullrich")).to.deep.equal(users[0]);
  });

  it('should find a guest\s bookings', () => {
    const findGuest = user.findGuestByName("Leatha Ullrich");
    expect(user.findGuestsBooking(findGuest)).to.deep.equal([bookings[0]]);
  });

  it('should find a another guest\s bookings', () => {
    const findGuest = user.findGuestByName("Rocio Schuster");
    expect(user.findGuestsBooking(findGuest)).to.deep.equal([bookings[1]]);
  });

  it('should be able to find a guest\s bookings and total spent by their name', () => {
    const searchGuest = user.searchForGuest("Leatha Ullrich");

    expect(searchGuest).to.deep.equal({
      guest: users[0].name,
      bookings: [bookings[0]],
      spent: 358.4
    })
  })

  it('should be able to find another guest\s bookings and total spent by their name', () => {
    const searchGuest = user.searchForGuest("Rocio Schuster");

    expect(searchGuest).to.deep.equal({
      guest: users[1].name,
      bookings: [bookings[1]],
      spent: 477.38
    })
  })

  it('should be able to return removed booking', () => {
    const bookedRoom = bookings[3];
    const cancelReservation = user.cancelBooking(bookedRoom);

    expect(cancelReservation).to.deep.equal(bookedRoom);
  });

  it('should be able to return another removed booking', () => {
    user.cancelBooking(bookings[3]);
    const bookedRoom = bookings[2];
    const cancelReservation = user.cancelBooking(bookedRoom);

    expect(cancelReservation).to.deep.equal(bookedRoom);
  });

  it('should calculate total spent', () => {
    expect(user.calculateTotalSpent(bookings)).to.equal(1756.36);
  });

  it('should find a guest\s bookings', () => {
    expect(user.findGuestsBooking(users[0])).to.deep.equal([bookings[0]])
  });

  it('should find a another guest\s bookings', () => {
    expect(user.findGuestsBooking(users[1])).to.deep.equal([bookings[1]])
  });

  it('should find a guest by their name', () => {
    expect(user.findGuestByName("Leatha Ullrich")).to.deep.equal(users[0])
  });

  it('should find a guest by their name', () => {
    expect(user.findGuestByName("Rocio Schuster")).to.deep.equal(users[1])
  });

  it('should find a booking to delete', () => {
    expect(user.findBookingToDelete(1)).to.deep.equal(bookings[0])
  });

  it('should find another booking to delete', () => {
    expect(user.findBookingToDelete(2)).to.deep.equal(bookings[1])
  });
});