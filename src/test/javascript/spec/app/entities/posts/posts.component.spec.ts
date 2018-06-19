/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MyAppTestModule } from '../../../test.module';
import { PostsComponent } from '../../../../../../main/webapp/app/entities/posts/posts.component';
import { PostsService } from '../../../../../../main/webapp/app/entities/posts/posts.service';
import { Posts } from '../../../../../../main/webapp/app/entities/posts/posts.model';

describe('Component Tests', () => {

    describe('Posts Management Component', () => {
        let comp: PostsComponent;
        let fixture: ComponentFixture<PostsComponent>;
        let service: PostsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MyAppTestModule],
                declarations: [PostsComponent],
                providers: [
                    PostsService
                ]
            })
            .overrideTemplate(PostsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PostsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PostsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Posts(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.posts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
