"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategorytemplateComponent = void 0;
var core_1 = require("@angular/core");
var showpassword_component_1 = require("../showpassword/showpassword.component");
var animations_1 = require("@angular/animations");
var CategorytemplateComponent = /** @class */ (function () {
    function CategorytemplateComponent(firebaseService, router, dialog, transferService) {
        this.firebaseService = firebaseService;
        this.router = router;
        this.dialog = dialog;
        this.transferService = transferService;
        this.searchValue = "";
        this.totalPasswords = 0;
        this.duplicates = 0;
        this.weakpasswords = 0;
    }
    CategorytemplateComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    CategorytemplateComponent.prototype.getData = function () {
    };
    CategorytemplateComponent.prototype.containsDuplicates = function (a) {
        for (var i = 0; i < a.length; i++) {
            if (a.indexOf(a[i]) !== a.lastIndexOf(a[i])) {
                this.duplicates += 1;
                return true;
            }
        }
        return false;
    };
    CategorytemplateComponent.prototype.checkDuplicates = function (result) {
        var dupArray = [];
        for (var x = 0; x < result.length; x++) {
            dupArray.push(result[x].payload.doc.data()['password']);
        }
        var numpasses = dupArray.length;
        console.log("There are " + numpasses.toString());
        this.containsDuplicates(dupArray);
    };
    CategorytemplateComponent.prototype.viewDetails = function (item) {
        this.router.navigate(['/details/' + item.payload.doc.id]);
    };
    CategorytemplateComponent.prototype.capitalizeFirstLetter = function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    };
    CategorytemplateComponent.prototype.searchByName = function () {
        var _this = this;
        var value = this.searchValue.toLowerCase();
        this.firebaseService.searchUsers(value)
            .subscribe(function (result) {
            _this.name_filtered_items = result;
            _this.items = result;
        });
    };
    CategorytemplateComponent.prototype.openDialog = function (item) {
        this.transferService.setData(item);
        var dialogRef = this.dialog.open(showpassword_component_1.ShowpasswordComponent, {
            height: '400px',
            width: '400px'
        });
    };
    CategorytemplateComponent.prototype["delete"] = function (item) {
        var _this = this;
        this.firebaseService.deletePassword(item.id)
            .then(function (res) {
            _this.router.navigate(['home']);
        }, function (err) {
            console.log(err);
        });
    };
    CategorytemplateComponent = __decorate([
        core_1.Component({
            selector: 'app-categorytemplate',
            templateUrl: './categorytemplate.component.html',
            styleUrls: ['./categorytemplate.component.css'],
            animations: [
                animations_1.trigger('fade', [
                    animations_1.transition('void => *', [
                        animations_1.style({ opacity: 0 }),
                        animations_1.animate(250)
                    ])
                ])
            ]
        })
    ], CategorytemplateComponent);
    return CategorytemplateComponent;
}());
exports.CategorytemplateComponent = CategorytemplateComponent;
//# sourceMappingURL=categorytemplate.component.js.map