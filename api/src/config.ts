export default {
    port: process.env.PORT || 4200,
    saltRounds: 5,
    secret: "qwertyuiopasdfghjklzxcvbnm1234567890",
    mail: process.env.EMAIL,
    password: process.env.EMAIL_PW,
    tokenExpirySeconds: 14400,
};
