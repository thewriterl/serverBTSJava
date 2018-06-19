/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MyAppTestModule } from '../../../test.module';
import { SpokenLanguagesDetailComponent } from '../../../../../../main/webapp/app/entities/spoken-languages/spoken-languages-detail.component';
import { SpokenLanguagesService } from '../../../../../../main/webapp/app/entities/spoken-languages/spoken-languages.service';
import { SpokenLanguages } from '../../../../../../main/webapp/app/entities/spoken-languages/spoken-languages.model';

describe('Component Tests', () => {

    describe('SpokenLanguages Management Detail Component', () => {
        let comp: SpokenLanguagesDetailComponent;
        let fixture: ComponentFixture<SpokenLanguagesDetailComponent>;
        let service: SpokenLanguagesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [SpokenLanguagesDetailComponent],
                providers: [
                    SpokenLanguagesService
                ]
            })
            .overrideTemplate(SpokenLanguagesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SpokenLanguagesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpokenLanguagesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SpokenLanguages(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.spokenLanguages).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
