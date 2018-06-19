/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyAppTestModule } from '../../../test.module';
import { DirectorComponent } from '../../../../../../main/webapp/app/entities/director/director.component';
import { DirectorService } from '../../../../../../main/webapp/app/entities/director/director.service';
import { Director } from '../../../../../../main/webapp/app/entities/director/director.model';

describe('Component Tests', () => {

    describe('Director Management Component', () => {
        let comp: DirectorComponent;
        let fixture: ComponentFixture<DirectorComponent>;
        let service: DirectorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [DirectorComponent],
                providers: [
                    DirectorService
                ]
            })
            .overrideTemplate(DirectorComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DirectorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DirectorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Director(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.directors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
