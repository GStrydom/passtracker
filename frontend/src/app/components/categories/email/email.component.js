"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EmailComponent = void 0;
var core_1 = require("@angular/core");
var categorytemplate_component_1 = require("../categorytemplate/categorytemplate.component");
var animations_1 = require("@angular/animations");
var EmailComponent = /** @class */ (function (_super) {
    __extends(EmailComponent, _super);
    function EmailComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmailComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    EmailComponent.prototype.getData = function () {
        var _this = this;
        this.firebaseService.getEmailPasswords()
            .subscribe(function (result) {
            _this.items = result;
            _this.name_filtered_items = result;
            _this.totalPasswords = _this.name_filtered_items.length;
            _this.checkDuplicates(result);
        });
    };
    EmailComponent = __decorate([
        core_1.Component({
            selector: 'app-email',
            templateUrl: './email.component.html',
            styleUrls: ['./email.component.scss'],
            animations: [
                animations_1.trigger('fade', [
                    animations_1.transition('void => *', [
                        animations_1.style({ opacity: 0 }),
                        animations_1.animate(250)
                    ])
                ])
            ]
        })
    ], EmailComponent);
    return EmailComponent;
}(categorytemplate_component_1.CategorytemplateComponent));
exports.EmailComponent = EmailComponent;
//# sourceMappingURL=email.component.js.map