var express = require('express');
var router = express.Router();
var mailer = require("nodemailer");
// Use Smtp Protocol to send Email
transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ashishbamal4@gmail.com',
        pass: 'xxx'
    }
});

/* GET home page. */
router.post('/send', function (req, res, next) {
    var html = '';
    html += '<h3>FirstName</h3> :' + req.body.firstname;
    html += '<br/><h3>LastName</h3> :' + req.body.lastname;
    html += '<br/><h3>Email</h3> :' + req.body.email;
    html += '<br/><h3>Phone</h3> :' + req.body.phone;
    html += '<br/><h3>Message</h3> :' + req.body.message;

    var mail = {
        from: "WebService<ashishbamal4@gmail.com>",
        to: "contact@macmasterindia.com",
        subject: "Web Query",
        html: html
    }

    transporter.sendMail(mail, function (error, response) {
        if (error) {
            console.log(error);
            res.json({
                code_name: "SUCCESS"
            });
        } else {
            console.log("Message sent: " + response.message);
        }
    });
});

router.get('/download', function (req, res, next) {
    var type = req.query.type;
    if (type = "master_catalogue") {
        res.download('./master_catalogue.pdf', 'master-catalogue.pdf');
    } else {
        res.download('./torque_wrench_catalogue.pdf', 'torque-wrench-catalogue.pdf');
    }
})

module.exports = router;