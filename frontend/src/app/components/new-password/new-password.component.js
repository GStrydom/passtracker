"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NewPasswordComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var image_dialog_component_1 = require("../image-dialog/image-dialog.component");
var NewPasswordComponent = /** @class */ (function () {
    function NewPasswordComponent(fb, dialog, router, firebaseService) {
        this.fb = fb;
        this.dialog = dialog;
        this.router = router;
        this.firebaseService = firebaseService;
        this.avatarLink = "";
        this.validation_messages = {
            'category': [
                { type: 'required', message: 'Category is required.' }
            ],
            'website': [
                { type: 'required', message: 'Website is required.' }
            ],
            'username': [
                { type: 'required', message: 'Username is required.' },
            ],
            'password': [
                { type: 'required', message: 'Password is required.' },
            ]
        };
    }
    NewPasswordComponent.prototype.ngOnInit = function () {
        this.createForm();
    };
    NewPasswordComponent.prototype.createForm = function () {
        this.exampleForm = this.fb.group({
            category: ['', forms_1.Validators.required],
            website: ['', forms_1.Validators.required],
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
    };
    NewPasswordComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(image_dialog_component_1.ImageDialogComponent, {
            height: '400px',
            width: '400px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.avatarLink = result.link;
            }
        });
    };
    NewPasswordComponent.prototype.resetFields = function () {
        this.avatarLink = "";
        this.exampleForm = this.fb.group({
            category: new forms_1.FormControl('', forms_1.Validators.required),
            website: new forms_1.FormControl('', forms_1.Validators.required),
            username: new forms_1.FormControl('', forms_1.Validators.required),
            password: new forms_1.FormControl('', forms_1.Validators.required)
        });
    };
    NewPasswordComponent.prototype.onSubmit = function (value) {
        var _this = this;
        this.firebaseService.createPassword(value, this.avatarLink)
            .then(function (res) {
            _this.resetFields();
            _this.router.navigate(['/home']);
        });
    };
    NewPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-new-user',
            templateUrl: './new-password.component.html',
            styleUrls: ['./new-password.component.scss']
        })
    ], NewPasswordComponent);
    return NewPasswordComponent;
}());
exports.NewPasswordComponent = NewPasswordComponent;
//# sourceMappingURL=new-password.component.js.map