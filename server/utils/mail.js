import nodemailer from "nodemailer";

const sendMail = (email,sub, msg)=>{
    // console.log("HI")
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
    
      let mailDetails = {
        from: process.env.EMAIL,
        to: email,
        subject: sub,
        text: msg,
      };
    
      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent successfully");
        }
      });
}


export default sendMail;
