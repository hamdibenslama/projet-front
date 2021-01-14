import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMedecinComponent } from './liste-medecin.component';

describe('ListeMedecinComponent', () => {
  let component: ListeMedecinComponent;
  let fixture: ComponentFixture<ListeMedecinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeMedecinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
