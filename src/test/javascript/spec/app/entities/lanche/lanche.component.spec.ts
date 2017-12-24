/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { HamburgueriaTestModule } from '../../../test.module';
import { LancheComponent } from '../../../../../../main/webapp/app/entities/lanche/lanche.component';
import { LancheService } from '../../../../../../main/webapp/app/entities/lanche/lanche.service';
import { Lanche } from '../../../../../../main/webapp/app/entities/lanche/lanche.model';

describe('Component Tests', () => {

    describe('Lanche Management Component', () => {
        let comp: LancheComponent;
        let fixture: ComponentFixture<LancheComponent>;
        let service: LancheService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HamburgueriaTestModule],
                declarations: [LancheComponent],
                providers: [
                    LancheService
                ]
            })
            .overrideTemplate(LancheComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LancheComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LancheService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Lanche(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.lanches[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
