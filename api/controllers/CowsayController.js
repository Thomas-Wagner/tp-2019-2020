/**
 * CowsayController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var cowsay = require("cowsay");
var kue = require("kue");
var nodemailer = require("nodemailer");
let queue = kue.createQueue();

module.exports = {
  /**
   * `CowsayController.say()`
   */
  say: async function(req, res) {
    let count = await Sentences.count();
    console.debug("Got " + count + " sentences in database");
    let s = await Sentences.find()
      .limit(1)
      .skip(Math.floor(Math.random() * Math.floor(count)));
    let sentence = "Random Message";
    if (s.length > 0) {
      sentence = s[0].sentence;
    }
    return res.view("cowsay", {
      cow: cowsay.say({
        f: process.env.COW || "stegosaurus",
        text: sentence,
        e: "oO",
        T: "U "
      })
    });
  },

  add: async function(req, res) {
    return res.view("add");
  },

  create: async function(req, res) {
    await Sentences.create({ sentence: req.param("sentence") });
    var job = queue
      .create("email", {
        title: "Thanks !",
        to: req.param("email"),
        template: "Thanks"
      })
      .save(function(err) {
        if (!err) console.log(job.id);
      });
    return res.redirect("/say");
  }

  // admin: async function(req, res) {},

  // sendMail: async function(email) {
  //   // create reusable transporter object using the default SMTP transport
  //   let transporter = nodemailer.createTransport({
  //     host: "smtp.mailgun.org",
  //     port: 587,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: "postmaster@mailgun.l3o.eu", // generated ethereal user
  //       pass: "fedbe91ae5e3529f94528dd311bea4c9-060550c6-d42c872f" // generated ethereal password
  //     }
  //   });

  //   // send mail with defined transport object
  //   let info = await transporter.sendMail({
  //     from: '"Cow"  <cdad@l3o.eu>      ', // sender address
  //     to: email, // list of receivers
  //     subject: "Thanks !", // Subject line
  //     text: "Thanks for adding a new sentence", // plain text body
  //     html: "<b>Thanks for adding a new sentence</b>" // html body
  //   });

  //   var job = queue
  //     .create("email", {
  //       title: "Thanks !",
  //       to: req.param("email"),
  //       template: "Thanks"
  //     })
  //     .save(function(err) {
  //       if (!err) console.log(job.id);
  //     });

  //   console.log("Message sent: %s", info.messageId);
  //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //   // Preview only available when sending through an Ethereal account
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // }
};
