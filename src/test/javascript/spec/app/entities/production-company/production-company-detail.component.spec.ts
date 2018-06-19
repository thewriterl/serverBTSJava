/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MyAppTestModule } from '../../../test.module';
import { ProductionCompanyDetailComponent } from '../../../../../../main/webapp/app/entities/production-company/production-company-detail.component';
import { ProductionCompanyService } from '../../../../../../main/webapp/app/entities/production-company/production-company.service';
import { ProductionCompany } from '../../../../../../main/webapp/app/entities/production-company/production-company.model';

describe('Component Tests', () => {

    describe('ProductionCompany Management Detail Component', () => {
        let comp: ProductionCompanyDetailComponent;
        let fixture: ComponentFixture<ProductionCompanyDetailComponent>;
        let service: ProductionCompanyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [ProductionCompanyDetailComponent],
                providers: [
                    ProductionCompanyService
                ]
            })
            .overrideTemplate(ProductionCompanyDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductionCompanyDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductionCompanyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProductionCompany(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.productionCompany).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
