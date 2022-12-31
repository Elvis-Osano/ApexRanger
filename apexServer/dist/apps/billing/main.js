/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/billing/src/billing.controller.ts":
/*!************************************************!*\
  !*** ./apps/billing/src/billing.controller.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BillingController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const billing_service_1 = __webpack_require__(/*! ./billing.service */ "./apps/billing/src/billing.service.ts");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const path_1 = __webpack_require__(/*! path */ "path");
let BillingController = class BillingController {
    constructor(billingService, rmqService) {
        this.billingService = billingService;
        this.rmqService = rmqService;
    }
    async getBill(res, data) {
        const file = (0, fs_1.createReadStream)((0, path_1.join)(process.cwd(), "./invoices/your-invoice-name.pdf"));
        await res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename=invoiceOrder.pdf`,
        });
        return new common_1.StreamableFile(file);
    }
    async handleOrderCreated(data, context) {
        this.rmqService.ack(context);
        await this.billingService.bill(data);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Response)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "getBill", null);
__decorate([
    (0, microservices_1.EventPattern)("order_created"),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "handleOrderCreated", null);
BillingController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_b = typeof billing_service_1.BillingService !== "undefined" && billing_service_1.BillingService) === "function" ? _b : Object, typeof (_c = typeof common_2.RmqService !== "undefined" && common_2.RmqService) === "function" ? _c : Object])
], BillingController);
exports.BillingController = BillingController;


/***/ }),

/***/ "./apps/billing/src/billing.module.ts":
/*!********************************************!*\
  !*** ./apps/billing/src/billing.module.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BillingModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const Joi = __webpack_require__(/*! joi */ "joi");
const billing_controller_1 = __webpack_require__(/*! ./billing.controller */ "./apps/billing/src/billing.controller.ts");
const billing_service_1 = __webpack_require__(/*! ./billing.service */ "./apps/billing/src/billing.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let BillingModule = class BillingModule {
};
BillingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    RABBIT_MQ_URI: Joi.string().required(),
                    RABBIT_MQ_BILLING_QUEUE: Joi.string().required(),
                }),
                envFilePath: './apps/billing/.env',
            }),
            common_2.RmqModule,
            common_2.AuthModule,
        ],
        controllers: [billing_controller_1.BillingController],
        providers: [billing_service_1.BillingService],
    })
], BillingModule);
exports.BillingModule = BillingModule;


/***/ }),

/***/ "./apps/billing/src/billing.service.ts":
/*!*********************************************!*\
  !*** ./apps/billing/src/billing.service.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BillingService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BillingService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const billing_utility_1 = __webpack_require__(/*! ./billing.utility */ "./apps/billing/src/billing.utility.ts");
let BillingService = BillingService_1 = class BillingService {
    constructor() {
        this.logger = new common_1.Logger(BillingService_1.name);
    }
    bill(data) {
        const { request, user, orderNumber } = data;
        const invoiceDetail = {
            service: {
                server: user.name.toUpperCase(),
                table: request.table,
            },
            items: request.orders,
            subtotal: request.total,
            total: request.total,
            order_number: orderNumber,
            header: {
                company_name: "Apex Ranger",
                company_logo: "logo.png",
                company_address: "Apex Ranger. 123 Kimathi Street 1th Floor Utalii House, Nairobi 123456",
            },
            footer: {
                text: "Thank you for dining with us!!Welcome Again.",
            },
            currency_symbol: "Kshs ",
            date: {
                billing_date: new Date().toLocaleDateString("en-us", {
                    hour: "2-digit",
                    minute: "2-digit",
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                }),
            },
        };
        (0, billing_utility_1.default)(invoiceDetail, "./invoices/your-invoice-name.pdf");
        this.logger.verbose("Billing...success");
    }
};
BillingService = BillingService_1 = __decorate([
    (0, common_1.Injectable)()
], BillingService);
exports.BillingService = BillingService;


/***/ }),

/***/ "./apps/billing/src/billing.utility.ts":
/*!*********************************************!*\
  !*** ./apps/billing/src/billing.utility.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const fs = __webpack_require__(/*! fs */ "fs");
const PDFDocument = __webpack_require__(/*! pdfkit */ "pdfkit");
let niceInvoice = (invoice, path) => {
    let doc = new PDFDocument({ size: "A4", margin: 40 });
    header(doc, invoice);
    customerInformation(doc, invoice);
    invoiceTable(doc, invoice);
    footer(doc, invoice);
    doc.end();
    doc.pipe(fs.createWriteStream(path));
};
let header = (doc, invoice) => {
    if (fs.existsSync(invoice.header.company_logo)) {
        doc.image(invoice.header.company_logo, 50, 45, { width: 180 })
            .fontSize(20)
            .text(invoice.header.company_name, 90, 50)
            .moveDown();
    }
    else {
        doc.fontSize(20)
            .text(invoice.header.company_name, 50, 45)
            .moveDown();
    }
    if (invoice.header.company_address.length !== 0) {
        companyAddress(doc, invoice.header.company_address);
    }
};
let customerInformation = (doc, invoice) => {
    doc.fillColor("#444444")
        .fontSize(20)
        .text("Bill", 50, 160)
        .text("Service", 300, 160);
    generateHr(doc, 185);
    const customerInformationTop = 200;
    doc.fontSize(10)
        .text("Billing Number:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(invoice.order_number, 130, customerInformationTop)
        .font("Helvetica")
        .text("Billing Date:", 50, customerInformationTop + 15)
        .text(invoice.date.billing_date, 130, customerInformationTop + 15)
        .text("Server:", 300, customerInformationTop)
        .font("Helvetica-Bold")
        .text(invoice.service.server, 350, customerInformationTop)
        .font("Helvetica")
        .text("Table:", 300, customerInformationTop + 15)
        .text(invoice.service.table, 350, customerInformationTop + 15)
        .moveDown();
    generateHr(doc, 230);
};
let invoiceTable = (doc, invoice) => {
    let i;
    const invoiceTableTop = 252;
    const currencySymbol = invoice.currency_symbol;
    doc.font("Helvetica-Bold");
    tableRow(doc, invoiceTableTop, "ID", "Dish", "Price", "Plates", "Total");
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");
    for (i = 0; i < invoice.items.length; i++) {
        const item = invoice.items[i];
        const position = invoiceTableTop + (i + 1) * 30;
        tableRow(doc, position, item.id, item.name, formatCurrency(item.price, currencySymbol), item.quantity, formatCurrency(item.itemTotal, currencySymbol));
        generateHr(doc, position + 20);
    }
    const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    doc.font("Helvetica-Bold");
    totalTable(doc, subtotalPosition, "Subtotal", formatCurrency(invoice.total, currencySymbol));
    const paidToDatePosition = subtotalPosition + 20;
    doc.font("Helvetica-Bold");
    totalTable(doc, paidToDatePosition, "Total", formatCurrency(invoice.total, currencySymbol));
};
let footer = (doc, invoice) => {
    if (invoice.footer.text.length !== 0) {
        doc.fontSize(10).text(invoice.footer.text, 50, 780, { align: "center", width: 500 });
    }
};
let totalTable = (doc, y, name, description) => {
    doc.fontSize(10)
        .text(name, 400, y, { width: 90, align: "right" })
        .text(description, 0, y, { align: "right" });
};
let tableRow = (doc, y, item, description, unitCost, quantity, lineTotal) => {
    doc.fontSize(10)
        .text(item, 50, y)
        .text(description, 130, y)
        .text(unitCost, 300, y, { width: 90, align: "center" })
        .text(quantity, 350, y, { width: 90, align: "center" })
        .text(lineTotal, 450, y, { width: 90, align: "center" });
};
let generateHr = (doc, y) => {
    doc.strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
};
let formatCurrency = (cents, symbol) => {
    return symbol + cents;
};
let getNumber = str => {
    if (str.length !== 0) {
        var num = str.replace(/[^0-9]/g, '');
    }
    else {
        var num = 0;
    }
    return num;
};
let checkIfTaxAvailable = tax => {
    let validatedTax = getNumber(tax);
    if (Number.isNaN(validatedTax) === false && validatedTax <= 100 && validatedTax > 0) {
        var taxValue = tax;
    }
    else {
        var taxValue = '---';
    }
    return taxValue;
};
let companyAddress = (doc, address) => {
    let str = address;
    let chunks = str.match(/.{0,25}(\s|$)/g);
    let first = 50;
    chunks.forEach(function (i, x) {
        doc.fontSize(10).text(chunks[x], 200, first, { align: "right" });
        first = +first + 15;
    });
};
exports["default"] = niceInvoice;


/***/ }),

/***/ "./libs/common/src/auth/auth.module.ts":
/*!*********************************************!*\
  !*** ./libs/common/src/auth/auth.module.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");
const rmq_module_1 = __webpack_require__(/*! ../rmq/rmq.module */ "./libs/common/src/rmq/rmq.module.ts");
const services_1 = __webpack_require__(/*! ./services */ "./libs/common/src/auth/services.ts");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer.apply(cookieParser()).forRoutes('*');
    }
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [rmq_module_1.RmqModule.register({ name: services_1.AUTH_SERVICE })],
        exports: [rmq_module_1.RmqModule],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./libs/common/src/auth/jwt-auth.guard.ts":
/*!************************************************!*\
  !*** ./libs/common/src/auth/jwt-auth.guard.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const services_1 = __webpack_require__(/*! ./services */ "./libs/common/src/auth/services.ts");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(authClient) {
        this.authClient = authClient;
    }
    canActivate(context) {
        const authentication = this.getAuthentication(context);
        return this.authClient
            .send('validate_user', {
            Authentication: authentication,
        })
            .pipe((0, rxjs_1.tap)((res) => {
            this.addUser(res, context);
        }), (0, rxjs_1.catchError)(() => {
            throw new common_1.UnauthorizedException();
        }));
    }
    getAuthentication(context) {
        var _a;
        let authentication;
        if (context.getType() === 'rpc') {
            authentication = context.switchToRpc().getData().Authentication;
        }
        else if (context.getType() === 'http') {
            authentication = (_a = context.switchToHttp().getRequest()
                .cookies) === null || _a === void 0 ? void 0 : _a.Authentication;
        }
        if (!authentication) {
            throw new common_1.UnauthorizedException('No value was provided for Authentication');
        }
        return authentication;
    }
    addUser(user, context) {
        if (context.getType() === 'rpc') {
            context.switchToRpc().getData().user = user;
        }
        else if (context.getType() === 'http') {
            context.switchToHttp().getRequest().user = user;
        }
    }
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(services_1.AUTH_SERVICE)),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),

/***/ "./libs/common/src/auth/services.ts":
/*!******************************************!*\
  !*** ./libs/common/src/auth/services.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AUTH_SERVICE = void 0;
exports.AUTH_SERVICE = 'AUTH';


/***/ }),

/***/ "./libs/common/src/index.ts":
/*!**********************************!*\
  !*** ./libs/common/src/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./rmq/rmq.service */ "./libs/common/src/rmq/rmq.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./rmq/rmq.module */ "./libs/common/src/rmq/rmq.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./auth/auth.module */ "./libs/common/src/auth/auth.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./auth/jwt-auth.guard */ "./libs/common/src/auth/jwt-auth.guard.ts"), exports);


/***/ }),

/***/ "./libs/common/src/rmq/rmq.module.ts":
/*!*******************************************!*\
  !*** ./libs/common/src/rmq/rmq.module.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RmqModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rmq_service_1 = __webpack_require__(/*! ./rmq.service */ "./libs/common/src/rmq/rmq.service.ts");
let RmqModule = RmqModule_1 = class RmqModule {
    static register({ name }) {
        return {
            module: RmqModule_1,
            imports: [
                microservices_1.ClientsModule.registerAsync([
                    {
                        name,
                        useFactory: (configService) => ({
                            transport: microservices_1.Transport.RMQ,
                            options: {
                                urls: [configService.get('RABBIT_MQ_URI')],
                                queue: configService.get(`RABBIT_MQ_${name}_QUEUE`),
                            },
                        }),
                        inject: [config_1.ConfigService],
                    },
                ]),
            ],
            exports: [microservices_1.ClientsModule],
        };
    }
};
RmqModule = RmqModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [rmq_service_1.RmqService],
        exports: [rmq_service_1.RmqService],
    })
], RmqModule);
exports.RmqModule = RmqModule;


/***/ }),

/***/ "./libs/common/src/rmq/rmq.service.ts":
/*!********************************************!*\
  !*** ./libs/common/src/rmq/rmq.service.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let RmqService = class RmqService {
    constructor(configService) {
        this.configService = configService;
    }
    getOptions(queue, noAck = false) {
        return {
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [this.configService.get('RABBIT_MQ_URI')],
                queue: this.configService.get(`RABBIT_MQ_${queue}_QUEUE`),
                noAck,
                persistent: true,
            },
        };
    }
    ack(context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        channel.ack(originalMessage);
    }
};
RmqService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], RmqService);
exports.RmqService = RmqService;


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("joi");

/***/ }),

/***/ "pdfkit":
/*!*************************!*\
  !*** external "pdfkit" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("pdfkit");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************************!*\
  !*** ./apps/billing/src/main.ts ***!
  \**********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const common_1 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const billing_module_1 = __webpack_require__(/*! ./billing.module */ "./apps/billing/src/billing.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(billing_module_1.BillingModule);
    const rmqService = app.get(common_1.RmqService);
    app.connectMicroservice(rmqService.getOptions('BILLING'));
    await app.startAllMicroservices();
    app.listen(5000);
}
bootstrap();

})();

/******/ })()
;