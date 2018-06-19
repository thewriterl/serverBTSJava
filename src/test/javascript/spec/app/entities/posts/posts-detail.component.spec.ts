/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { MyAppTestModule } from '../../../test.module';
import { PostsDetailComponent } from '../../../../../../main/webapp/app/entities/posts/posts-detail.component';
import { PostsService } from '../../../../../../main/webapp/app/entities/posts/posts.service';
import { Posts } from '../../../../../../main/webapp/app/entities/posts/posts.model';

describe('Component Tests', () => {

    describe('Posts Management Detail Component', () => {
        let comp: PostsDetailComponent;
        let fixture: ComponentFixture<PostsDetailComponent>;
        let service: PostsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [PostsDetailComponent],
                providers: [
                    PostsService
                ]
            })
            .overrideTemplate(PostsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PostsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PostsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Posts(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.posts).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
