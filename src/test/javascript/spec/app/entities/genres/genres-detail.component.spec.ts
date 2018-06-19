/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MyAppTestModule } from '../../../test.module';
import { GenresDetailComponent } from '../../../../../../main/webapp/app/entities/genres/genres-detail.component';
import { GenresService } from '../../../../../../main/webapp/app/entities/genres/genres.service';
import { Genres } from '../../../../../../main/webapp/app/entities/genres/genres.model';

describe('Component Tests', () => {

    describe('Genres Management Detail Component', () => {
        let comp: GenresDetailComponent;
        let fixture: ComponentFixture<GenresDetailComponent>;
        let service: GenresService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [GenresDetailComponent],
                providers: [
                    GenresService
                ]
            })
            .overrideTemplate(GenresDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GenresDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GenresService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Genres(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.genres).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
