/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { HamburgueriaTestModule } from '../../../test.module';
import { LancheDetailComponent } from '../../../../../../main/webapp/app/entities/lanche/lanche-detail.component';
import { LancheService } from '../../../../../../main/webapp/app/entities/lanche/lanche.service';
import { Lanche } from '../../../../../../main/webapp/app/entities/lanche/lanche.model';

describe('Component Tests', () => {

    describe('Lanche Management Detail Component', () => {
        let comp: LancheDetailComponent;
        let fixture: ComponentFixture<LancheDetailComponent>;
        let service: LancheService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HamburgueriaTestModule],
                declarations: [LancheDetailComponent],
                providers: [
                    LancheService
                ]
            })
            .overrideTemplate(LancheDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LancheDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LancheService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Lanche(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.lanche).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
