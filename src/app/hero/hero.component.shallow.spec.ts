import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroComponent} from './hero.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeroComponent shallow', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
       declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct hero', () => {
    fixture.componentInstance.hero = {id: 1, name: 'Superman', strength: 3};
    expect(fixture.componentInstance.hero.name).toBe('Superman');
  });

  it('should render the name in an anchor tag', () => {
    fixture.componentInstance.hero = {id: 1, name: 'Superman', strength: 3};
    fixture.detectChanges(); // run changes detection and update bindings
    const deA = fixture.debugElement.query(By.css('a')); // Wrapper around the DOM element, has more options (routerLink, etc)
    // expect(deA.nativeElement.textContent).toContain('1 Superman');
    expect(fixture.nativeElement.querySelector('a').textContent).toContain('1 Superman');
  });
});
