"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditPasswordComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var image_dialog_component_1 = require("../image-dialog/image-dialog.component");
var EditPasswordComponent = /** @class */ (function () {
    function EditPasswordComponent(firebaseService, route, fb, router, dialog) {
        this.firebaseService = firebaseService;
        this.route = route;
        this.fb = fb;
        this.router = router;
        this.dialog = dialog;
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
    EditPasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (routeData) {
            var data = routeData['data'];
            if (data) {
                _this.item = data.payload.data();
                _this.item.id = data.payload.id;
                _this.createForm();
            }
        });
    };
    EditPasswordComponent.prototype.createForm = function () {
        this.exampleForm = this.fb.group({
            category: [this.item.category, forms_1.Validators.required],
            website: [this.item.website, forms_1.Validators.required],
            username: [this.item.username, forms_1.Validators.required],
            password: [this.item.password, forms_1.Validators.required]
        });
    };
    EditPasswordComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(image_dialog_component_1.ImageDialogComponent, {
            height: '400px',
            width: '400px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.item.avatar = result.link;
            }
        });
    };
    EditPasswordComponent.prototype.onSubmit = function (value) {
        var _this = this;
        value.avatar = this.item.avatar;
        // value.age = Number(value.age);
        this.firebaseService.updatePassword(this.item.id, value)
            .then(function (res) {
            _this.router.navigate(['/home']);
        });
    };
    EditPasswordComponent.prototype["delete"] = function () {
        var _this = this;
        this.firebaseService.deletePassword(this.item.id)
            .then(function (res) {
            _this.router.navigate(['/home']);
        }, function (err) {
            console.log(err);
        });
    };
    EditPasswordComponent.prototype.cancel = function () {
        this.router.navigate(['/home']);
    };
    EditPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-password',
            templateUrl: './edit-password.component.html',
            styleUrls: ['./edit-password.component.scss']
        })
    ], EditPasswordComponent);
    return EditPasswordComponent;
}());
exports.EditPasswordComponent = EditPasswordComponent;
//# sourceMappingURL=edit-password.component.js.map