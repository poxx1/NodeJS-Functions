var nodemailer = require('nodemailer');

//Faltaria agregarle encriptacion o algo a la password.

let smtpConfig = {
    host: 'smtp.office365.com', //Servidor SMTP
    port: 587,
    secure: false, // False, porque usa STARTTLS. true solo para TLS
    auth: {
        user: 'ElasticAutomation@outlook.com', 
        pass: 'Tsoft2020'
    }
};

function main() {
    //Si tengo que modificar algun parametro lo hago aca
    return new Promise(function (resolve, reject) {
        let response = {
            code: 200,
            msg: 'E-mail was sent successfully!'
        };
        //Valido la existencia del parametro. Si quiero cambiar alguno lo agrego aca!
        //if (!params.reminder)    response.msg = "Error: Reminder was not provided."; response.code = 400;}
        // else if (!params.email) { response.msg = "Error: Destination e-mail was not provided."; response.code = 400;    }
        //else if (!params.conversation_id) { response.msg = "Error: Conversation id was not provided."; response.code = 400;}
        
        if (response.code != 200) {
            reject(response);
        }

        console.log(`Validation was successful, preparing to send email...`);

        sendEmail(function (email_response) {
            response.msg = email_response['msg'];
            response.code = email_response['code'];
            response.reason = email_response['reason'];
            console.log(`Email delivery response: (${email_response['code']}) ${response.msg}`);
            resolve(response);
        });

    });
}

function sendEmail(callback) {

    let transporter = nodemailer.createTransport(smtpConfig);
    let mailOptions = {
        //Emisor
        from: `Tbot <${smtpConfig.auth.user}>`,
        //Receptor
        to: 'julian.lastra@tsoftlatam.com',//params.email,
        //Subject
        subject: 'Informacion Solicitada', //${params.reminder}`,
        //Cuerpo 
        text: `Informacion Solicitada: https://www.tsoftglobal.com/`
    };
    
    transporter.sendMail(mailOptions, function (error, info) {

        let email_response = {
            code: 200,
            msg: 'Email was sent successfully',
            reason: 'Success'
        };

        if (error) {
            email_response.msg = 'Error';
            email_response.code = 500;
            email_response.reason = error;
        }
        else {
            email_response.msg = info.response;
            email_response.code = 200;
            email_response.reason = info.response;
        }
        callback(email_response);
    });
}

/*Parameters
{ 
    "reminder": "Test email NodeJs", 
    "email": "ElasticAutomation@outlook.com;julian.lastra@tsoftlatam.com", 
    "conversation_id": "1234–1234–1234"
}
*/
