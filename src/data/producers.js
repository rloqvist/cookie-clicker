
import cursor from '../icons/arrow-cursor.svg';
import farm from '../icons/farm-tractor.svg';
import factory from '../icons/factory.svg';
import bank from '../icons/piggy-bank.svg';
import temple from '../icons/byzantin-temple.svg';
import wizard from '../icons/spell-book.svg';
import portal from '../icons/star-gate.svg';

export const producers = [
  {
    name: 'cursor',
    cost: 10,
    src: cursor,
    cps: 0.1,
  },
  {
    name: 'farm',
    cost: 100,
    src: farm,
    cps: 1,
  },
  {
    name: 'factory',
    cost: 1000,
    src: factory,
    cps: 10,
  },
  {
    name: 'bank',
    cost: 2500,
    src: bank,
    cps: 25,
  },
  {
    name: 'temple',
    cost: 10000,
    src: temple,
    cps: 100,
  },
  {
    name: 'wizard',
    cost: 70000,
    src: wizard,
    cps: 750,
  },
  {
    name: 'portal',
    cost: 150000,
    src: portal,
    cps: 2000,
  },
]
