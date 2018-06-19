/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MyAppTestModule } from '../../../test.module';
import { DirectorDetailComponent } from '../../../../../../main/webapp/app/entities/director/director-detail.component';
import { DirectorService } from '../../../../../../main/webapp/app/entities/director/director.service';
import { Director } from '../../../../../../main/webapp/app/entities/director/director.model';

describe('Component Tests', () => {

    describe('Director Management Detail Component', () => {
        let comp: DirectorDetailComponent;
        let fixture: ComponentFixture<DirectorDetailComponent>;
        let service: DirectorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [DirectorDetailComponent],
                providers: [
                    DirectorService
                ]
            })
            .overrideTemplate(DirectorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DirectorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DirectorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Director(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.director).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
