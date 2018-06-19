/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyAppTestModule } from '../../../test.module';
import { ProductionCompanyComponent } from '../../../../../../main/webapp/app/entities/production-company/production-company.component';
import { ProductionCompanyService } from '../../../../../../main/webapp/app/entities/production-company/production-company.service';
import { ProductionCompany } from '../../../../../../main/webapp/app/entities/production-company/production-company.model';

describe('Component Tests', () => {

    describe('ProductionCompany Management Component', () => {
        let comp: ProductionCompanyComponent;
        let fixture: ComponentFixture<ProductionCompanyComponent>;
        let service: ProductionCompanyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [ProductionCompanyComponent],
                providers: [
                    ProductionCompanyService
                ]
            })
            .overrideTemplate(ProductionCompanyComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductionCompanyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductionCompanyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProductionCompany(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.productionCompanies[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
