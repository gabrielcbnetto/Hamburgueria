import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Lanche e2e test', () => {

    let navBarPage: NavBarPage;
    let lancheDialogPage: LancheDialogPage;
    let lancheComponentsPage: LancheComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Lanches', () => {
        navBarPage.goToEntity('lanche');
        lancheComponentsPage = new LancheComponentsPage();
        expect(lancheComponentsPage.getTitle()).toMatch(/hamburgueriaApp.lanche.home.title/);

    });

    it('should load create Lanche dialog', () => {
        lancheComponentsPage.clickOnCreateButton();
        lancheDialogPage = new LancheDialogPage();
        expect(lancheDialogPage.getModalTitle()).toMatch(/hamburgueriaApp.lanche.home.createOrEditLabel/);
        lancheDialogPage.close();
    });

    it('should create and save Lanches', () => {
        lancheComponentsPage.clickOnCreateButton();
        lancheDialogPage.setNomeInput('nome');
        expect(lancheDialogPage.getNomeInput()).toMatch('nome');
        lancheDialogPage.save();
        expect(lancheDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LancheComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-lanche div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LancheDialogPage {
    modalTitle = element(by.css('h4#myLancheLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nomeInput = element(by.css('input#field_nome'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNomeInput = function(nome) {
        this.nomeInput.sendKeys(nome);
    }

    getNomeInput = function() {
        return this.nomeInput.getAttribute('value');
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
