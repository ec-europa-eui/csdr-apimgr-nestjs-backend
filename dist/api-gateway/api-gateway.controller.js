"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const api_gateway_service_1 = require("./api-gateway.service");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
let ApiGatewayController = class ApiGatewayController {
    constructor(apiGatewayService) {
        this.apiGatewayService = apiGatewayService;
    }
    findAll(query) {
        return this.apiGatewayService.getGatewayApps();
    }
    findOne(id) {
        return this.apiGatewayService.getAppSubscriptions(id).pipe(operators_1.map(apiS => apiS.map((api) => this.apiGatewayService.getApiName(api.apiIdentifier))), operators_1.switchMap((apiNames) => {
            const requests = apiNames.map((apiName) => this.apiGatewayService.getRestDetail(apiName));
            return rxjs_1.forkJoin(requests);
        }), operators_1.map(sources => sources));
    }
    update(id, apiGateWayAppSubscribeToApi) {
        return this.apiGatewayService.subscribeToApi(id, apiGateWayAppSubscribeToApi);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ApiGatewayController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], ApiGatewayController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], ApiGatewayController.prototype, "update", null);
ApiGatewayController = __decorate([
    common_1.Controller('api-gateway'),
    __metadata("design:paramtypes", [api_gateway_service_1.ApiGatewayService])
], ApiGatewayController);
exports.ApiGatewayController = ApiGatewayController;
//# sourceMappingURL=api-gateway.controller.js.map