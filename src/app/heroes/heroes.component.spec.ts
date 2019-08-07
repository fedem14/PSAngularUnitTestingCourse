import {HeroesComponent} from './heroes.component';
import {of} from 'rxjs/internal/observable/of';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'Spiderman', strength: 8},
      {id: 2, name: 'Wonderwoman', strength: 24},
      {id: 3, name: 'Superman', strength: 55},
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    component = new HeroesComponent(mockHeroService);
    });

    it('should remove the indicated hero from the Hero list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true)); // Creates an observable that returns value true
      component.heroes = HEROES;
      component.delete(HEROES[2]);

      // expect(component.heroes.length).toBe(2);
      expect(component.heroes.includes(HEROES[2])).toBe(false);
    });

  it('should call delete Hero with the correct Hero', () => {
    mockHeroService.deleteHero.and.returnValue(of(true)); // Creates an observable that returns value true
    component.heroes = HEROES;
    component.delete(HEROES[2]);

    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
  });
});
