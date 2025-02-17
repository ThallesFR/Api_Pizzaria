"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enderecoController_1 = require("../controllers/enderecoController");
const router = (0, express_1.Router)();
router.get('/', enderecoController_1.getEnderecos);
router.post('/', enderecoController_1.createEndereco);
router.put('/:idendereco', enderecoController_1.updateEndereco);
router.delete('/:idendereco', enderecoController_1.deleteEndereco);
exports.default = router;
