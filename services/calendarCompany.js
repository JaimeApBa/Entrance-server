const { Router } = require('express');
const { getCalendarCompany, setCalendarCompany, updateCalendarCompany, deleteCalendarCompany } = require('../controllers/calendarCompany');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.use( validateJWT );

router.get('/:companyId', getCalendarCompany);
router.post('/', setCalendarCompany);
router.put('/', updateCalendarCompany);
router.delete('/:companyId', deleteCalendarCompany);



module.exports = router;