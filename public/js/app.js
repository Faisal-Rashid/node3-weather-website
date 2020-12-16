$(function(){


$('#btn-search').on('click', function(e){

    e.preventDefault()
    const address = $('#txt-address').val()
    if(!address){
        alert('Please enter some value')
    }
    else{
        $('.weather-details').css("display",'block')
        $('#weather').text('Loading...')
        url = 'http://localhost:3000/getweather?address='+address;
        $.ajax({
            type: 'GET',
            url: url,
            success: function(weather_data){
                
                const data = weather_data
               if(data.error){
                $('#weather').text(data.error)

               }
               else{
                console.log(data)
                const weather_description = 'Sky will be '+data.main+' and will remain '+data.description+' throughout the day'
                $('#weather').text(weather_description)

               }
               

            },
            error:function(error){
                const data = weather_data.toString()
                $('#weather').text(error)


            },
            complete: function(){
                $('#loading').hide()


            }



        })
    }

})
})