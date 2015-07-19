!(function() {
    var privaceNo= 'root-20';
    var cityNo = 'root-20-3';
    var districts = 'root-20-3-9';

    var province = $("#province"),
        city = $("#city"),
        dist = $("#dist");

    function syncSelect(url, target, data) {
        $.ajax({
            type: "post",
            url: url,
            dataType: "html",
            data: data,
            success: function(json) {
//                debugger;
                var json = JSON.parse(json),
                    innerHtml = '';
                if(json!=null){
                    $.each(
                        json.listData,
                        function(i, item) {
                            if(item.tNo==privaceNo){
                                innerHtml += '<option value="'+item.tNo+'" selected="selected" >';
                            }else{
                                innerHtml += '<option value="'+item.tNo+'">';
                            }
                            innerHtml +=item.name+'</option>';
                        });
                }
                $(target).append(innerHtml);
            },
            error: function(err) {
                alert(err);
            }
        });

    }

    function formatData() {

    }

    // 初始化省
    var urlProvince = "./distPick/province.json";
    syncSelect(urlProvince, province);

    // 初始化市
    var urlCity = "./distPick/city.json";
   syncSelect(urlCity, city, "parentNo="+privaceNo);

    // 初始化县
    var urlDist = "./distPick/district.json";
    syncSelect(urlDist, dist, "parentNo="+cityNo);


    //改变省加载市
    province.change(function(){
        city.empty();
//        debugger;
//        var parentNo = $(this).children('option:selected').val();
        var parentNo = $(this).children('option').not(function(){ return !this.selected }).val();

        $.ajax({
            type: "POST",
            url: urlCity,
            async : false,
            dataType : "html",
            data: "parentNo="+parentNo,
            success: function(json){
                var json = JSON.parse(json),
                    innerHtml = '';

                if(json!=null){
                    $.each(
                        json.listData,
                        function(i, item) {
                            innerHtml += '<option value="'+item.tNo+'">';
                            innerHtml +=item.name+'</option>';
                        });
                }
                city.append(innerHtml);
                var districtNo = city.children('option').not(function(){ return !this.selected }).val();
                $.ajax({
                    type: "POST",
                    url: urlDist,
                    async : false,
                    dataType : "html",
                    data: "parentNo="+districtNo,
                    success: function(json){
                        dist.empty();
                        var json = JSON.parse(json),
                             innerHtml = '';

                        if(json!=null){
                            $.each(
                                json.listData,
                                function(i, item) {
                                    innerHtml += '<option value="'+ item.tNo + '">';
                                    innerHtml +=item.name+'</option>';
                                });
                        }
                        dist.append(innerHtml);

                    }
                });

            }
        });


    });


    /*

     $.ajax({
     type: "POST",
     url: "./distPick/province.json",
     async : false,
     dataType : "html",
     data: "",
     success: function(json){
     console.log("jinwei");
     //            debugger;

     var json = JSON.parse(json);

     var innerHtml = '';
     if(json!=null){
     $.each(
     json.listData,
     function(i, item) {
     if(item.tNo==privaceNo){
     innerHtml += '<option value="'+item.tNo+'" selected="selected" >';
     }else{
     innerHtml += '<option value="'+item.tNo+'">';
     }
     innerHtml +=item.name+'</option>';
     });
     }
     $("#province").append(innerHtml).css("visibility", "visible");

     }
     });

    */

})();