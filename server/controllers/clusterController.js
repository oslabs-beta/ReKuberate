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
var clusterController = {
    getPodAndNodeInfo: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var pods, podsOutput, podsSplit, nodes, nodesOutput, minikube, obj, currentContainer, i, i, j, key;
        return __generator(this, function (_a) {
            try {
                pods = (0, child_process_1.spawnSync)('kubectl get pod -o wide', {
                    shell: true,
                    encoding: 'utf-8',
                });
                podsOutput = pods.stdout;
                podsSplit = podsOutput.split(/[\n]/);
                nodes = (0, child_process_1.spawnSync)('minikube status', {
                    shell: true,
                    encoding: 'utf-8',
                });
                nodesOutput = nodes.output;
                minikube = nodesOutput[1].split(/[\n]/);
                obj = {};
                currentContainer = minikube[0];
                obj[currentContainer] = {};
                obj[currentContainer].pods = [];
                //splitting the strings into individual strings seperated by one space
                for (i = 1; i < podsSplit.length - 1; i++) {
                    podsSplit[i] = podsSplit[i].replace(/\s+/g, ' ');
                    podsSplit[i] = podsSplit[i].split(/[' ']/);
                    //if string includes container name, push to container.pods
                    if (podsSplit[i].includes(currentContainer)) {
                        obj[currentContainer].pods.push({
                            name: podsSplit[i][0],
                            status: podsSplit[i][2],
                        });
                    }
                }
                for (i = 1; i < minikube.length - 2; i++) {
                    if (minikube[i] === '') {
                        i++;
                        currentContainer = minikube[i];
                        obj[currentContainer] = {};
                        i++;
                        obj[currentContainer].pods = [];
                        //if string includes container name, push to container.pods
                        for (j = 1; j < podsSplit.length - 1; j++) {
                            if (podsSplit[j].includes(currentContainer)) {
                                //work around any typing here?
                                obj[currentContainer].pods.push({
                                    name: podsSplit[j][0],
                                    status: podsSplit[j][2],
                                });
                            }
                        }
                    }
                    key = minikube[i].slice(0, minikube[i].indexOf(': '));
                    obj[currentContainer][key] = minikube[i].slice(minikube[i].indexOf(': ') + 2);
                }
                res.locals.nodeAndPodInfo = obj;
                return [2 /*return*/, next()];
            }
            catch (err) {
                return [2 /*return*/, next({
                        log: "error in clusterController.getPodeAndNodeInfo: ".concat(err),
                        status: 500,
                        message: { err: 'An error occurred getting pod and node info' },
                    })];
            }
            return [2 /*return*/];
        });
    }); },
};
exports.default = clusterController;
