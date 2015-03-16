/**
 * Created by Ho on 3/7/2015.
 */

var UserDevice = require('../models/UserDevice').model;

module.exports = function (router, passport) {


    /**
     * POST: api/UserDevices
     */
    router.post('/UserDevices', function (req, res) {
        var model = req.body;

        var userDevice = new UserDevice({
            userId: model.userId,
            registrationId: model.registrationId,
            type: model.type,
            tokenId: model.tokenId
        });

        userDevice.save(function (err, registationId) {
            if (err != null) {
                res.status(500);
                res.json({message: "could not save registration id. err: " + err});
            } else {
                res.status(200);
                res.json(registationId);
            }
        })
    });

};