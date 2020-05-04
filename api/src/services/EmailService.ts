import nodemailer from 'nodemailer'
import config from "../config";

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.mail,
        pass: config.password
    }
})

class EmailService {
    
    // mailOption is an object 
    // with from, to, subject and text fields
    public async send(mailOptions: any): Promise<any> {
        try{
            await transporter.sendMail(mailOptions);
        }
        catch(e){
            console.log('email error');
        }
    }
}

export default new EmailService();
