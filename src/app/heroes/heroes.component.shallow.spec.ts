import {HeroesComponent} from './heroes.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output} from '@angular/core';
import {HeroService} from '../hero.service';
import {of} from 'rxjs/internal/observable/of';
import {Hero} from '../hero';
import {By} from '@angular/platform-browser';

describe('HeroesComponent Shallow', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  const mockHeroesService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
  let HEROES;

  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
    // @Output() delete = new EventEmitter();
  }

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'Spiderman', strength: 8},
      {id: 2, name: 'Wonderwoman', strength: 24},
      {id: 3, name: 'Superman', strength: 55},
    ];
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [{provide: HeroService, useValue: mockHeroesService}],
      // schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heroes correctly from service', () => {
    mockHeroesService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges(); // Runs life cycle (ngOnInit)
    // fixture.componentInstance.getHeroes();
    expect(fixture.componentInstance.heroes).toBe(HEROES);
  });

  it('should create one li for each hero', () => {
    mockHeroesService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  });
});
