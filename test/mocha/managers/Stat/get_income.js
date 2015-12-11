/**
 * Created by nickjaremek on 11/12/15.
 */
'use strict';
require('./../../global_conf');

const expect = require('expect.js');
const statManager = require('./../../../../lib/managers/Stat');
const massive = require('./../../../../database/setup_massive');
const populate = require('./../../populate');

describe('Stat Manager::get income', function() {

  beforeEach(function(done) {
    let room = {
      name: 'Grand Room',
      status: 'available',
      room_size: 4
    };

    let reservations = [{
      name: 'Mr. Jones',
      status: 'completed',
      paid: 100.00,
      start_time: '2015-12-01T09:00:18.622Z',
      end_time: '2015-12-07T09:00:18.622Z',
      room_id: 1
    }, {
      name: 'Mrs. Thompson',
      status: 'completed',
      paid: 50.70,
      start_time: '2015-12-08T09:00:18.622Z',
      end_time: '2015-12-12T09:00:18.622Z',
      room_id: 1
    }];

    populate({rooms: [room], reservations: reservations}, done);
  });

  it('returns the total income for existing Reservations', function(done) {
    statManager.getIncome(massive, '2015-12-01', '2015-12-13', function(error, totalIncome) {
      expect(error).to.be(null);
      expect(totalIncome).to.not.be(undefined);
      expect(totalIncome).to.have.property('sum');
      expect(totalIncome.sum).to.equal('150.70');
      return done();
    });
  });

  it('returns less income for a narrower date interval', function(done) {
    statManager.getIncome(massive, '2015-12-01', '2015-12-08', function(error, totalIncome) {
      expect(error).to.be(null);
      expect(totalIncome).to.not.be(undefined);
      expect(totalIncome).to.have.property('sum');
      expect(totalIncome.sum).to.equal('100.00');
      return done();
    });
  });

  it('returns 0 income for an date interval with no Reservations', function(done) {
    statManager.getIncome(massive, '2015-01-01', '2015-02-08', function(error, totalIncome) {
      expect(error).to.be(null);
      expect(totalIncome).to.not.be(undefined);
      expect(totalIncome).to.have.property('sum');
      expect(totalIncome.sum).to.equal('0.00');
      return done();
    });
  });
});