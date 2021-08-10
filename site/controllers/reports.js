const Reports = require("../models/report");
const User = require("../models/user");

exports.postAddReport = (req, res, next) => {
  const location = req.body.location;
  const date = req.body.date;
  const description = req.body.description;
  console.log(req.userId);
  User.findOne({ where: { id: req.userId } })
    .then((user) => {
      console.log("hey");
      const name = user.firstName
      user.createReport({ name, location, date, description });
    })
    .then((results) => res.send("Report is created succesfully"))

    .catch((err) => console.log(err));
};

exports.getReport =  (req, res, next) => {
  Reports.findAll().then(reports => {
    res.json(reports);
  }).catch(err => console.log(err))
 //await res.json(reports);
};


// exports.deleteReport = (req, res, next) => {
//   const id = req.body.id;
//   console.log(req.body);
//   Reports.destroy({
//     where: { id: id }
//   }).then(num => {
//     if (num == 1) {
//       res.send({
//         message: "Report was deleted successfully!"
//       });
//     } else {
//       res.send({
//         message: `Cannot delete Report with id=${id}. Maybe Report was not found!`
//       });
//     }
//   }).catch(err => {
//     res.status(500).send({
//       message: "Could not delete Report with id=" + id
//     });
//   });
// };






// exports.getReport = (req, res, next) => {
//   User.findOne({ where: { id: req.userId } })
//     .then((user) => user.getReports())
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// };




// const Reports = require("../models/report");

// exports.postAddReport = async (req, res, next) => {
//   const name = req.body.name;
//   const location = req.body.location;
//   const date = req.body.date;
//   const description = req.body.description;
 

//   const reports = Reports.build({ name, location, date, description });
//   try {
//     await reports.save();
//     res.send(reports);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };


