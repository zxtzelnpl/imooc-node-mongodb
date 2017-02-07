$(function(){
   $('.del').click(function(e){
       var target = $(e.target);
       var id = target.data('id');
       var tr = $('.item-id-'+ id);

       $.ajax({
           type:'DELETE',
           url:'/admin/list?id=' + id
       })
           .done(function(results){
               if(results.success ===1){
                   if(tr.length>0){
                       tr.remove()
                   }
               }
           })
   })

    $('#douban').blur(function(){
        var douban = $(this);
        var id = douban.val();
        if(id){
            $.ajax({
                url:'https://api.douban.com/v2/movie/'+id,
                cache:true,
                type:'get',
                dataType:'jsonp',
                crossDomain:true,
                json:'callback',
                success:function(data){
                    $('#inputTitle').val(data.title);
                    $('#inputDoctor').val(data.attrs.director[0]);
                    $('#inputCountry').val(data.attrs.country[0]);
                    $('#inputLanguage').val(data.attrs.language[0]);
                    $('#inputPoster').val(data.image);
                    $('#inputYear').val(data.attrs.year[0]);
                    $('#inputSummary').val(data.summary);
                }
            })
        }

    })
});