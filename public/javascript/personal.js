$(document).ready(() => {
    $.get('/users/getEmail',(data1) =>{
        console.log(data1);
        const email = data1.results.email;
        $.get('/api/students/query?email=' + email,(data2) =>{
            console.log(data2);
            $('#name').html(data2.results[0].Name);
            $('#id').html(data2.results[0].Id);
            $('#major').html(data2.results[0].Major);
            $('#credit').html(data2.results[0].Credit);
        })
    })
    
  });
  