/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyAppTestModule } from '../../../test.module';
import { ProductionCountriesComponent } from '../../../../../../main/webapp/app/entities/production-countries/production-countries.component';
import { ProductionCountriesService } from '../../../../../../main/webapp/app/entities/production-countries/production-countries.service';
import { ProductionCountries } from '../../../../../../main/webapp/app/entities/production-countries/production-countries.model';

describe('Component Tests', () => {

    describe('ProductionCountries Management Component', () => {
        let comp: ProductionCountriesComponent;
        let fixture: ComponentFixture<ProductionCountriesComponent>;
        let service: ProductionCountriesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [ProductionCountriesComponent],
                providers: [
                    ProductionCountriesService
                ]
            })
            .overrideTemplate(ProductionCountriesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductionCountriesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductionCountriesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProductionCountries(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.productionCountries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
