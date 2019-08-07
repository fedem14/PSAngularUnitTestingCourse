import {HeroesComponent} from './heroes.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroService} from '../hero.service';
import {of} from 'rxjs/internal/observable/of';
import {By} from '@angular/platform-browser';
import {HeroComponent} from '../hero/hero.component';
import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[routerLink]',
  host: {'(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('HeroesComponent Deep', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  const mockHeroesService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
  let HEROES;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'Spiderman', strength: 8},
      {id: 2, name: 'Wonderwoman', strength: 24},
      {id: 3, name: 'Superman', strength: 55},
    ];
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [{provide: HeroService, useValue: mockHeroesService}],
      // schemas: [NO_ERRORS_SCHEMA] //Avoiding routerLink error
    });
    fixture = TestBed.createComponent(HeroesComponent);

  });

  it('should be render each hero as HeroComponent', function () {
    mockHeroesService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges(); // Will run on child components as well
    const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentsDEs.length).toBe(3);
    heroComponentsDEs.forEach((de, index) => {
      expect(heroComponentsDEs[index].componentInstance.hero).toEqual(HEROES[index]);
    });
  });

  it('should call heroService.deleteHero when delete method is called in child click button', function () {
    spyOn(fixture.componentInstance, 'delete'); // Watches and sees if the method delete is called
    mockHeroesService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    // heroComponentsDEs[0].query(By.css('button')).triggerEventHandler('click', {stopPropagation: () => {}});
    // heroComponentsDEs[0].componentInstance.delete.emit(undefined);
    heroComponentsDEs[0].triggerEventHandler('delete', null); // Easier but less coverage
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it('should add a new hero to the hero list when add button is clicked', function () {
    mockHeroesService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const name = 'Ironman';
    mockHeroesService.addHero.and.returnValue(of({id: 5, name: name, strength: 50}));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];
    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);
  });

  it('should have the correct route for the first hero', function () {
    mockHeroesService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const route = '/detail/1';
    const heroComponentsDE = fixture.debugElement.queryAll((By.directive(HeroComponent)));
    const routerLink = heroComponentsDE[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);
    // Gets the instance of the routerLink

    heroComponentsDE[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigatedTo).toBe(route);
  });
});
