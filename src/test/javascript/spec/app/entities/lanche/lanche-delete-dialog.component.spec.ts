/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { HamburgueriaTestModule } from '../../../test.module';
import { LancheDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/lanche/lanche-delete-dialog.component';
import { LancheService } from '../../../../../../main/webapp/app/entities/lanche/lanche.service';

describe('Component Tests', () => {

    describe('Lanche Management Delete Component', () => {
        let comp: LancheDeleteDialogComponent;
        let fixture: ComponentFixture<LancheDeleteDialogComponent>;
        let service: LancheService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HamburgueriaTestModule],
                declarations: [LancheDeleteDialogComponent],
                providers: [
                    LancheService
                ]
            })
            .overrideTemplate(LancheDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LancheDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LancheService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
