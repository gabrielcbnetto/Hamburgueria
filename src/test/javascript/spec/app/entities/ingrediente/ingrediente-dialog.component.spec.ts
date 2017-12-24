/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { HamburgueriaTestModule } from '../../../test.module';
import { IngredienteDialogComponent } from '../../../../../../main/webapp/app/entities/ingrediente/ingrediente-dialog.component';
import { IngredienteService } from '../../../../../../main/webapp/app/entities/ingrediente/ingrediente.service';
import { Ingrediente } from '../../../../../../main/webapp/app/entities/ingrediente/ingrediente.model';
import { ItemService } from '../../../../../../main/webapp/app/entities/item';

describe('Component Tests', () => {

    describe('Ingrediente Management Dialog Component', () => {
        let comp: IngredienteDialogComponent;
        let fixture: ComponentFixture<IngredienteDialogComponent>;
        let service: IngredienteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HamburgueriaTestModule],
                declarations: [IngredienteDialogComponent],
                providers: [
                    ItemService,
                    IngredienteService
                ]
            })
            .overrideTemplate(IngredienteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IngredienteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IngredienteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ingrediente(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.ingrediente = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ingredienteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ingrediente();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.ingrediente = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ingredienteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
