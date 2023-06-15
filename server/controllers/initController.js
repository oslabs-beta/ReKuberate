"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var webScrapper_js_1 = require("./webScrapper.js");
var initController = {
    //controller to install prometheus stack from help and update
    installPrometheus: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                console.log('prometheus initialization controller running');
                (0, child_process_1.spawnSync)('helm repo add grafana https://grafana.github.io/helm-charts', {
                    shell: true,
                });
                (0, child_process_1.spawnSync)('helm dependency build ./kube-prometheus-stack', {
                    shell: true,
                });
                (0, child_process_1.spawnSync)('helm install prometheus ./kube-prometheus-stack', {
                    shell: true,
                });
                return [2 /*return*/, next()];
            }
            catch (err) {
                return [2 /*return*/, next({
                        log: "error in initController installPromteheus: ".concat(err),
                        status: 500,
                        message: { err: 'An error occurred installing prometheus' },
                    })];
            }
            return [2 /*return*/];
        });
    }); },
    //controller to port forward Grafana so that the metrics page can start scrapping data
    installGrafana: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var server, _a, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    console.log('grafana initialization controller running');
                    server = (0, child_process_1.spawn)('kubectl port-forward service/prometheus-grafana 9000:80', { shell: true, detached: true });
                    server.stdout.on('data', function (data) {
                        console.log('stdout: ' + data);
                    });
                    server.stderr.on('data', function (data) {
                        console.log('stderr: ' + data);
                    });
                    _a = res.locals;
                    return [4 /*yield*/, (0, webScrapper_js_1.default)()];
                case 1:
                    _a.graphs = _b.sent();
                    return [2 /*return*/, next()];
                case 2:
                    err_1 = _b.sent();
                    return [2 /*return*/, next({
                            log: "error in initController installGrafana: ".concat(err_1),
                            status: 500,
                            message: { err: 'An error occurred port forwarding Grafana' },
                        })];
                case 3: return [2 /*return*/];
            }
        });
    }); },
};
exports.default = initController;
