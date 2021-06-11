"use strict";
// noinspection TaskProblemsInspection
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var showpassword_component_1 = require("../showpassword/showpassword.component");
var animations_1 = require("@angular/animations");
// Characters that will be used to determine password strength
var specialChars = ['!', '@', '#', '$', '%', '&', '*', '(', ')'];
var HomeComponent = /** @class */ (function () {
    function HomeComponent(firebaseService, router, dialog, transferService) {
        this.firebaseService = firebaseService;
        this.router = router;
        this.dialog = dialog;
        this.transferService = transferService;
        this.searchValue = '';
        this.totalPasswords = 0;
        this.duplicates = 0;
        this.weakpasswords = 0;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.getData();
        this.checkPasswordsStrength();
    };
    // Check if our results array contains any duplicates
    HomeComponent.prototype.containsDuplicates = function (a) {
        for (var i = 0; i < a.length; i++) {
            if (a.indexOf(a[i]) !== a.lastIndexOf(a[i])) {
                this.duplicates += 1;
                return true;
            }
        }
        return false;
    };
    HomeComponent.prototype.getData = function () {
        var _this = this;
        this.firebaseService.getPasswords()
            .subscribe(function (result) {
            _this.items = result;
            _this.nameFilteredItems = result;
            _this.totalPasswords = _this.nameFilteredItems.length;
            var dupArray = [];
            for (var x = 0; x < result.length; x++) {
                dupArray.push(result[x].payload.doc.data()['password']);
            }
            var numpasses = dupArray.length;
            _this.containsDuplicates(dupArray);
        });
    };
    // Check our password strength. Strength is determined by the
    // amount of mixed characters in the string EG: a*1%3d0
    HomeComponent.prototype.checkPasswordsStrength = function () {
    };
    HomeComponent.prototype.viewDetails = function (item) {
        this.router.navigate(['/details/' + item.payload.doc.id]);
    };
    HomeComponent.prototype.capitalizeFirstLetter = function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    };
    HomeComponent.prototype.searchByName = function () {
        var _this = this;
        var value = this.searchValue.toLowerCase();
        this.firebaseService.searchUsers(value)
            .subscribe(function (result) {
            _this.nameFilteredItems = result;
            _this.items = result;
        });
    };
    HomeComponent.prototype.openDialog = function (item) {
        this.transferService.setData(item);
        var dialogRef = this.dialog.open(showpassword_component_1.ShowpasswordComponent, {
            height: '400px',
            width: '400px'
        });
    };
    HomeComponent.prototype["delete"] = function (item) {
        var _this = this;
        this.firebaseService.deletePassword(item.id)
            .then(function (res) {
            _this.router.navigate(['home']).then(function (r) { });
        }, function (err) {
            console.log(err);
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss'],
            animations: [
                animations_1.trigger('fade', [
                    animations_1.transition('void => *', [
                        animations_1.style({ opacity: 0 }),
                        animations_1.animate(250)
                    ])
                ])
            ]
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map