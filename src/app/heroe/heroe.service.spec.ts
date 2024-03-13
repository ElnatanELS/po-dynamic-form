/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeroeService } from './heroe.service';

describe('Service: Heroe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroeService]
    });
  });

  it('should ...', inject([HeroeService], (service: HeroeService) => {
    expect(service).toBeTruthy();
  }));
});
