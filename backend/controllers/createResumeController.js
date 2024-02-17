
const pdf = require("html-pdf");
const pdfSample = require("./pdf-sample");

exports.createResume = async(req, res, next) =>{
    try{
        console.log("req.body=======",`${__dirname}/Resume.pdf`)
        pdf.create(pdfSample(req.body), {}).toFile(`${__dirname}/Resume.pdf`, (err) => {
            if (err) {
              res.send(Promise.reject());
              console.log(err);
            }
            res.send(Promise.resolve());
            console.log("Success");
          });
    } catch (error) {
        next(error);
    }
}

exports.fetchResume = async(req, res, next) =>{
    try{
        console.log("coming here path=====",`${__dirname}`)
        res.sendFile(`${__dirname}/Resume.pdf`);
    } catch (error) {
        console.log("error====",error)
        next(error);
    }
}