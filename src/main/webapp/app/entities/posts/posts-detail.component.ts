import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Posts } from './posts.model';
import { PostsService } from './posts.service';

@Component({
    selector: 'jhi-posts-detail',
    templateUrl: './posts-detail.component.html'
})
export class PostsDetailComponent implements OnInit, OnDestroy {

    posts: Posts;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private postsService: PostsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPosts();
    }

    load(id) {
        this.postsService.find(id)
            .subscribe((postsResponse: HttpResponse<Posts>) => {
                this.posts = postsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPosts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'postsListModification',
            (response) => this.load(this.posts.id)
        );
    }
}
