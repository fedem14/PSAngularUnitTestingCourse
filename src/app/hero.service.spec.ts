
import {inject, TestBed} from '@angular/core/testing';
import {HeroService} from './hero.service';
import {MessageService} from './message.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('HeroService', () => {
  let mockMessageService;
  // let httpTestingController: HttpClientTestingModule;
  // let heroService: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [
        HeroService,
        {provide: MessageService, useValue: mockMessageService}
      ]
    });
    // httpTestingController = TestBed.get(HttpTestingController); // Access the dependency injection instance
    // heroService = TestBed.get(HeroService);
  });

  describe('getHero', () => {
    // First parameter of inject: Array of dependencies types that we want to handle
    // Second parameter of inject: Callback function that recieves those dependencies
    it('should call get with the correct URL',
      inject([HeroService, HttpTestingController], (heroService: HeroService, httpTestingController: HttpTestingController)  => {
        heroService.getHero(4).subscribe();
        // heroService.getHero(3).subscribe();
        const request = httpTestingController.expectOne('api/heroes/4');
        request.flush({id: 4, name: 'Superman', strength: 100});
        httpTestingController.verify(); // Verifies that only the correct call is being made
    }));
  });
});
