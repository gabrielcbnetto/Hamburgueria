/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { HamburgueriaTestModule } from '../../../test.module';
import { IngredienteDetailComponent } from '../../../../../../main/webapp/app/entities/ingrediente/ingrediente-detail.component';
import { IngredienteService } from '../../../../../../main/webapp/app/entities/ingrediente/ingrediente.service';
import { Ingrediente } from '../../../../../../main/webapp/app/entities/ingrediente/ingrediente.model';

describe('Component Tests', () => {

    describe('Ingrediente Management Detail Component', () => {
        let comp: IngredienteDetailComponent;
        let fixture: ComponentFixture<IngredienteDetailComponent>;
        let service: IngredienteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HamburgueriaTestModule],
                declarations: [IngredienteDetailComponent],
                providers: [
                    IngredienteService
                ]
            })
            .overrideTemplate(IngredienteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IngredienteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IngredienteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Ingrediente(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ingrediente).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
