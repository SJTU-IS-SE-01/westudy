$(document).ready(() => {
    $('#button-search').click(() => {
        const area = $('#area').val();
        const floor = $('#floor').val();

        $.get("/api/seats/query?Area=" + area + "&Floor=" + floor, (data) => {
            console.log(data);
            $('#seats').html("");
            for (let i = 0; i < data.results.length; i++) {
                let snumber = data.results[i].Snum;
                $.get('/api/students/seatsapt?Snum=' + snumber, (data_c) => {
                    console.log(data_c)
                    $('#seats').html(function(x,origText){return  origText+'<tr>';});
                    for (let j = 0; j < data_c.results.length; j++) {
                        $('#seats').html(function (x, origText) {
                            return origText
                                + '<td>'
                                + data_c.results[j].Btime.slice(5, 10) + ' '
                                + data_c.results[j].Snum + '号座位  '
                                + data_c.results[j].Btime.slice(11, 16) + '--'
                                + data_c.results[j].Etime.slice(11, 16) + '</td>'
                        });
                    }
                    $('#seats').html(function(x,origText){return  origText+'</tr>';});
                })
            }
        })
    })
})