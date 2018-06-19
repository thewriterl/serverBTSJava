/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyAppTestModule } from '../../../test.module';
import { SpokenLanguagesComponent } from '../../../../../../main/webapp/app/entities/spoken-languages/spoken-languages.component';
import { SpokenLanguagesService } from '../../../../../../main/webapp/app/entities/spoken-languages/spoken-languages.service';
import { SpokenLanguages } from '../../../../../../main/webapp/app/entities/spoken-languages/spoken-languages.model';

describe('Component Tests', () => {

    describe('SpokenLanguages Management Component', () => {
        let comp: SpokenLanguagesComponent;
        let fixture: ComponentFixture<SpokenLanguagesComponent>;
        let service: SpokenLanguagesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [SpokenLanguagesComponent],
                providers: [
                    SpokenLanguagesService
                ]
            })
            .overrideTemplate(SpokenLanguagesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SpokenLanguagesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpokenLanguagesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SpokenLanguages(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.spokenLanguages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
