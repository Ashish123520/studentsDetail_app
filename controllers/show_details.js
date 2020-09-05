const connection = require('../config');
const Details={showDetails:function(req,res){
    connection.query('SELECT * FROM uni_details LIMIT 2',function(error,details)
    {
     if (error) {
         res.json({
             status:false,
             message:'there are some error with query'
         })
       }else{
           console.log(details)
           res.render('students/show',{
             details
         })
       }
 
    })
 },
  editDetails:function(req,res){
  const uid=req.params.uid
  connection.query('SELECT * FROM uni_details WHERE uid=?',[uid],function(error,details)
  {
   if (error) {
       res.json({
           status:false,
           message:'there are some error with query'
       })
     }else{
         console.log(details)
         res.render('students/edit',{
           details
       })
     }

    })
  },
 deleteDetails:function(req,res){
   var Id=req.params.uid
   connection.query('DELETE FROM uni_details WHERE uid=?',[Id],function(error,details)
  {
   if (error) {
       res.json({
           status:false,
           message:'there are some error with query'
       })
     }else{
         console.log(details)
         res.redirect('/viewDetails')
     }

  })
}
}
module.exports=Details