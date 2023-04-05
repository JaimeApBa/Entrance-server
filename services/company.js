const { Router } = require('express');
const { getAllCompanys, getCompany, updateCompany, deleteCompany } = require('../controllers/company');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use( validateJWT );

router.get('/', getAllCompanys);
router.post('/', getCompany);
router.put('/:companyId', updateCompany);
router.delete('/:companyId', deleteCompany);



module.exports = router;