import {async, ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
import {HeroDetailComponent} from './hero-detail.component';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../hero.service';
import {Location} from '@angular/common';
import { of } from 'rxjs/internal/observable/of';
import {FormsModule} from '@angular/forms';

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute, mockHeroService, mockLocation;
    beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '3'}}
    };
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: Location, useValue: mockLocation},
        {provide: HeroService, useValue: mockHeroService}
      ]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'Superman', strength: 55}));
  });

  it('should render hero name in a h2 tag', function () {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERMAN');
  });

  // it('should call updateHero when save is called ',  (done) => {
  //   mockHeroService.updateHero.and.returnValue(of({}));
  //   fixture.detectChanges();
  //
  //   fixture.componentInstance.save();
  //  // Async code requires 3sec per test
  //   setTimeout(() => {
  //     expect(mockHeroService.updateHero).toHaveBeenCalled();
  //     done();
  //   }, 300);
  // });

  it('should call updateHero when save is called ',  fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save(); // debounced save with setTimeout or promise
    // tick(250); // Fastforwards 250ms in zone.js
    flush(); // Checks if there are any tasks waiting and fastforwards the clock
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));

  // Handles well Promises but not SetTimeouts
  // it('should call updateHero when save is called', async(() => {
  //     mockHeroService.updateHero.and.returnValue(of({}));
  //     fixture.detectChanges();
  //   fixture.componentInstance.save();
  //   // When all the pending promises are resolved
  //   fixture.whenStable().then(() => {
  //     expect(mockHeroService.updateHero).toHaveBeenCalled();
  //   });
  // }));
});
