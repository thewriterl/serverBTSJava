/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MyAppTestModule } from '../../../test.module';
import { ActorsDetailComponent } from '../../../../../../main/webapp/app/entities/actors/actors-detail.component';
import { ActorsService } from '../../../../../../main/webapp/app/entities/actors/actors.service';
import { Actors } from '../../../../../../main/webapp/app/entities/actors/actors.model';

describe('Component Tests', () => {

    describe('Actors Management Detail Component', () => {
        let comp: ActorsDetailComponent;
        let fixture: ComponentFixture<ActorsDetailComponent>;
        let service: ActorsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [ActorsDetailComponent],
                providers: [
                    ActorsService
                ]
            })
            .overrideTemplate(ActorsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ActorsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActorsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Actors(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.actors).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
