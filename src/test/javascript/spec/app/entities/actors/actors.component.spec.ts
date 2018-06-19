/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyAppTestModule } from '../../../test.module';
import { ActorsComponent } from '../../../../../../main/webapp/app/entities/actors/actors.component';
import { ActorsService } from '../../../../../../main/webapp/app/entities/actors/actors.service';
import { Actors } from '../../../../../../main/webapp/app/entities/actors/actors.model';

describe('Component Tests', () => {

    describe('Actors Management Component', () => {
        let comp: ActorsComponent;
        let fixture: ComponentFixture<ActorsComponent>;
        let service: ActorsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [ActorsComponent],
                providers: [
                    ActorsService
                ]
            })
            .overrideTemplate(ActorsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ActorsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActorsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Actors(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.actors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
