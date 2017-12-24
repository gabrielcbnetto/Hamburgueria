import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Ingrediente e2e test', () => {

    let navBarPage: NavBarPage;
    let ingredienteDialogPage: IngredienteDialogPage;
    let ingredienteComponentsPage: IngredienteComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Ingredientes', () => {
        navBarPage.goToEntity('ingrediente');
        ingredienteComponentsPage = new IngredienteComponentsPage();
        expect(ingredienteComponentsPage.getTitle()).toMatch(/hamburgueriaApp.ingrediente.home.title/);

    });

    it('should load create Ingrediente dialog', () => {
        ingredienteComponentsPage.clickOnCreateButton();
        ingredienteDialogPage = new IngredienteDialogPage();
        expect(ingredienteDialogPage.getModalTitle()).toMatch(/hamburgueriaApp.ingrediente.home.createOrEditLabel/);
        ingredienteDialogPage.close();
    });

    it('should create and save Ingredientes', () => {
        ingredienteComponentsPage.clickOnCreateButton();
        ingredienteDialogPage.setNomeInput('nome');
        expect(ingredienteDialogPage.getNomeInput()).toMatch('nome');
        ingredienteDialogPage.setValorInput('5');
        expect(ingredienteDialogPage.getValorInput()).toMatch('5');
        ingredienteDialogPage.itemSelectLastOption();
        ingredienteDialogPage.save();
        expect(ingredienteDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class IngredienteComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-ingrediente div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class IngredienteDialogPage {
    modalTitle = element(by.css('h4#myIngredienteLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));
    valorInput = element(by.css('input#field_valor'));
    itemSelect = element(by.css('select#field_item'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNomeInput = function(nome) {
        this.nomeInput.sendKeys(nome);
    }

    getNomeInput = function() {
        return this.nomeInput.getAttribute('value');
    }

    setValorInput = function(valor) {
        this.valorInput.sendKeys(valor);
    }

    getValorInput = function() {
        return this.valorInput.getAttribute('value');
    }

    itemSelectLastOption = function() {
        this.itemSelect.all(by.tagName('option')).last().click();
    }

    itemSelectOption = function(option) {
        this.itemSelect.sendKeys(option);
    }

    getItemSelect = function() {
        return this.itemSelect;
    }

    getItemSelectedOption = function() {
        return this.itemSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
