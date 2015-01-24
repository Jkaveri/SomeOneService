/**
 * Created by Ho on 8/10/2014.
 */

module.exports = {
   convertDbValidationError:function(err){
       var result = {};
       result.type = err.message;
       for(var key in err.errors){

       }
       return result;
   },
   convertDbError:function(err){
       var result,
           duplicateKeyErroPattern = new RegExp('(duplicate key error index).*\\{\\s*\\:\\s*\\"([A-z0-9\\-]+)\\"\\s*\\}','g');
       if(err.message.match(duplicateKeyErroPattern)){
           result = {
               message:'"'+duplicateKeyErroPattern.exec(err.message)[2]+'" is duplicated',
               type:"Validation Error"
           };
       }else{
           result = {
               message:err.message,
               type:"Server Internal Error"
           }
       }
       return result;
   }
};
