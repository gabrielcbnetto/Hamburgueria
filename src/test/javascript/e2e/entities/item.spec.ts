import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Item e2e test', () => {

    let navBarPage: NavBarPage;
    let itemDialogPage: ItemDialogPage;
    let itemComponentsPage: ItemComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Items', () => {
        navBarPage.goToEntity('item');
        itemComponentsPage = new ItemComponentsPage();
        expect(itemComponentsPage.getTitle()).toMatch(/hamburgueriaApp.item.home.title/);

    });

    it('should load create Item dialog', () => {
        itemComponentsPage.clickOnCreateButton();
        itemDialogPage = new ItemDialogPage();
        expect(itemDialogPage.getModalTitle()).toMatch(/hamburgueriaApp.item.home.createOrEditLabel/);
        itemDialogPage.close();
    });

    it('should create and save Items', () => {
        itemComponentsPage.clickOnCreateButton();
        itemDialogPage.setQuantidadeInput('5');
        expect(itemDialogPage.getQuantidadeInput()).toMatch('5');
        itemDialogPage.lancheSelectLastOption();
        itemDialogPage.save();
        expect(itemDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ItemComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-item div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ItemDialogPage {
    modalTitle = element(by.css('h4#myItemLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    quantidadeInput = element(by.css('input#field_quantidade'));
    lancheSelect = element(by.css('select#field_lanche'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setQuantidadeInput = function(quantidade) {
        this.quantidadeInput.sendKeys(quantidade);
    }

    getQuantidadeInput = function() {
        return this.quantidadeInput.getAttribute('value');
    }

    lancheSelectLastOption = function() {
        this.lancheSelect.all(by.tagName('option')).last().click();
    }

    lancheSelectOption = function(option) {
        this.lancheSelect.sendKeys(option);
    }

    getLancheSelect = function() {
        return this.lancheSelect;
    }

    getLancheSelectedOption = function() {
        return this.lancheSelect.element(by.css('option:checked')).getText();
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
