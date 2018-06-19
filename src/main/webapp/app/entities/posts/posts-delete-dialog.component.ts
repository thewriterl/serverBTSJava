import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Posts } from './posts.model';
import { PostsPopupService } from './posts-popup.service';
import { PostsService } from './posts.service';

@Component({
    selector: 'jhi-posts-delete-dialog',
    templateUrl: './posts-delete-dialog.component.html'
})
export class PostsDeleteDialogComponent {

    posts: Posts;

    constructor(
        private postsService: PostsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.postsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'postsListModification',
                content: 'Deleted an posts'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-posts-delete-popup',
    template: ''
})
export class PostsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private postsPopupService: PostsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.postsPopupService
                .open(PostsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
