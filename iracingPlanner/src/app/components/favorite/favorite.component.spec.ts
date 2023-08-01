import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FavoriteComponent} from './favorite.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteComponent],
      imports: [FontAwesomeModule]
    });
    fixture = TestBed.createComponent(FavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
