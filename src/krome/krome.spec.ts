import { expect } from 'chai';
import { Krome } from './krome';

describe('Krome', () => {
  let krome: Krome;

  beforeEach(() => {
    krome = new Krome();
  });

  it('should create instance ok', () => {
    expect(krome).to.be.ok;
  });

  it('should have mock chrome instance', () => {
    expect(chrome).to.be.ok;
  });

  it('krome.tabs.query() should return Promise', () => {
    const result = krome.tabs.query(null);
    expect(result).to.instanceof(Promise);
  });
});
