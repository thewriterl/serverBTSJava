import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Posts } from './posts.model';
import { PostsPopupService } from './posts-popup.service';
import { PostsService } from './posts.service';

@Component({
    selector: 'jhi-posts-dialog',
    templateUrl: './posts-dialog.component.html'
})
export class PostsDialogComponent implements OnInit {

    posts: Posts;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private postsService: PostsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.posts.id !== undefined) {
            this.subscribeToSaveResponse(
                this.postsService.update(this.posts));
        } else {
            this.subscribeToSaveResponse(
                this.postsService.create(this.posts));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Posts>>) {
        result.subscribe((res: HttpResponse<Posts>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Posts) {
        this.eventManager.broadcast({ name: 'postsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-posts-popup',
    template: ''
})
export class PostsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private postsPopupService: PostsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.postsPopupService
                    .open(PostsDialogComponent as Component, params['id']);
            } else {
                this.postsPopupService
                    .open(PostsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
