/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { HamburgueriaTestModule } from '../../../test.module';
import { IngredienteComponent } from '../../../../../../main/webapp/app/entities/ingrediente/ingrediente.component';
import { IngredienteService } from '../../../../../../main/webapp/app/entities/ingrediente/ingrediente.service';
import { Ingrediente } from '../../../../../../main/webapp/app/entities/ingrediente/ingrediente.model';

describe('Component Tests', () => {

    describe('Ingrediente Management Component', () => {
        let comp: IngredienteComponent;
        let fixture: ComponentFixture<IngredienteComponent>;
        let service: IngredienteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HamburgueriaTestModule],
                declarations: [IngredienteComponent],
                providers: [
                    IngredienteService
                ]
            })
            .overrideTemplate(IngredienteComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IngredienteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IngredienteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Ingrediente(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ingredientes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
