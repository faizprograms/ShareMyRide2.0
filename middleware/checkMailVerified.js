function checkMailVerified(req, res, next) {
   
  //depend on the type render the correspond form
  let views=req.body.type==="taxi"?"myRideFormTaxi":"myRideFormGoods";
  if (req.user.is_email_verified) {
    if (req.user.is_verified) {
      next()
      return
    } else {
     
      res.render(views, {
        msg: "Please wait untill We verify your Id"
      });
      return
    }
  }
  res.render(views, {
    msg: "Please verify your mail to post the ride"
  });
  return;


}

module.exports = checkMailVerified;