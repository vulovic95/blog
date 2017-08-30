export const timeConverter = (UNIX_timestamp) => {
  var a = new Date(UNIX_timestamp);
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var day = a.getDate();
  var time = month + ' ' + day + ', ' + year ;
  return time;
}
export const resetField = (...fields) => {
  let fieldsArray = [...fields];
  for(let field of fieldsArray){
    document.getElementsByName(field)[0].value="";
  }
}
export const isNotEmpty = (...fields) => {
  let fieldsArray = [...fields];
  for(let field of fieldsArray){
    if(typeof field == 'string') if(field.trim()=="") return false;
  }
  return true;
}
export const uploadPhoto = (form) => {
  $.ajax({
     url: 'api/posts/file_upload',
     type: 'POST',
     data: new FormData($('#'+form)[0]),
     cache: false,
     contentType: false,
     processData: false,
     xhr: function() {
         var myXhr = $.ajaxSettings.xhr();
         if (myXhr.upload) {
             myXhr.upload.addEventListener('progress', function(e) {
                 if (e.lengthComputable) {
                     $('progress').attr({
                         value: e.loaded,
                         max: e.total,
                     });
                 }
             }, false);
         }
         return myXhr;
     }
   })
}
export const escapeHtml = (text) => {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
