import {HeroesComponent} from './heroes.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output} from '@angular/core';
import {HeroService} from '../hero.service';
import {of} from 'rxjs/internal/observable/of';
import {Hero} from '../hero';
import {By} from '@angular/platform-browser';
import {HeroComponent} from '../hero/hero.component';

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
      declarations: [HeroesComponent, HeroComponent],
      providers: [{provide: HeroService, useValue: mockHeroesService}],
      schemas: [NO_ERRORS_SCHEMA]
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
});
