import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { Http, BaseRequestOptions, ResponseOptions, Response } from '@angular/http';

import { CourseListComponent } from './course-list.component';
import { CranDataService } from '../cran-data.service';


describe('CourseListComponent', () => {

  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ CourseListComponent ],
      providers: [
        CranDataService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => {
            return new Http(backend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get value',
    async(inject([CranDataService, MockBackend], (service: CranDataService, backend: MockBackend) => {
      backend.connections.subscribe((conn: MockConnection) => {
        const options: ResponseOptions = new ResponseOptions({body: '{}'});
        conn.mockRespond(new Response(options));
        debugger;
      });
      debugger;
      fixture.detectChanges();
      fixture.whenStable().then(() => { // wait for async getQuote
        fixture.detectChanges();  
        debugger;      // update view with quote
        expect(true).toBe(true);
    });

    }))
  );

});
