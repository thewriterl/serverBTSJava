/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MyAppTestModule } from '../../../test.module';
import { ProductionCountriesDetailComponent } from '../../../../../../main/webapp/app/entities/production-countries/production-countries-detail.component';
import { ProductionCountriesService } from '../../../../../../main/webapp/app/entities/production-countries/production-countries.service';
import { ProductionCountries } from '../../../../../../main/webapp/app/entities/production-countries/production-countries.model';

describe('Component Tests', () => {

    describe('ProductionCountries Management Detail Component', () => {
        let comp: ProductionCountriesDetailComponent;
        let fixture: ComponentFixture<ProductionCountriesDetailComponent>;
        let service: ProductionCountriesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [ProductionCountriesDetailComponent],
                providers: [
                    ProductionCountriesService
                ]
            })
            .overrideTemplate(ProductionCountriesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductionCountriesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductionCountriesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProductionCountries(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.productionCountries).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
