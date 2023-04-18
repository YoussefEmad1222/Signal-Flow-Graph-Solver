import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouthHerwitzComponent } from './routh-herwitz.component';

describe('RouthHerwitzComponent', () => {
  let component: RouthHerwitzComponent;
  let fixture: ComponentFixture<RouthHerwitzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouthHerwitzComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouthHerwitzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
