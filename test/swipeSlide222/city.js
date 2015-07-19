!(function() {
    "use strict";

    var
        // 当前选中项
        selectedNo,

        // 初始化省份选中
        provinceNo= 'root-20',
        // 初始化市级选中
        cityNo = 'root-20-5',
        // 初始化县级选中
        distNo = 'root-20-1-5',

        // 省份数据请求url,查询后台
        urlProvince = "./distPick/province.json",
        // 市级数据url
        urlCity = "./distPick/city.json",
        // 县级数据url
        urlDist = "./distPick/district.json",

        // 省份容器
        targetProvince = $("#province"),
        // 市级容器
        targetCity = $("#city"),
        // 县级容器
        targetDist = $("#dist");

    // ajax城市选择 (同步sync)
    function syncSelect(url, target, selectedNo, comb) {
        $.ajax({
            type: "post",
            url: url,
            dataType: "html",
            data: "parentNo=" + selectedNo,
            success: function(json) {
                // change事件联动时
                if (comb) {
                    formatData(json, target);
                    // 获取当前市
                    selectedNo = targetCity.children('option').not(function(){ return !this.selected }).val();
                    targetDist.empty();
                    console.log(selectedNo);
                    // 根据当前市级选择县级
                    syncSelect(urlDist, targetDist, cityNo);
                } else {
                    formatData(json, target, selectedNo);
                }
            },
            error: function(err) {
                alert(err);
            }
        });

    }

    // 解析json数据, 并填充
    function formatData(json, target, selectedNo) {
        var json = JSON.parse(json),
            innerHtml = '';

        if(json!=null){
            $.each(
                json.listData,
                function(i, item) {
                    if(item.tNo == selectedNo){
                        innerHtml += '<option value="'+item.tNo+'" selected="selected" >';
                    }else{
                        innerHtml += '<option value="'+item.tNo+'">';
                    }
                    innerHtml +=item.name+'</option>';
                });
        }
        $(target).append(innerHtml);

    }

    // 初始化省
    selectedNo = provinceNo;
    syncSelect(urlProvince, targetProvince, selectedNo);
    // 初始化市
    selectedNo = cityNo
   syncSelect(urlCity, targetCity, selectedNo);
    // 初始化县
    selectedNo = distNo
    syncSelect(urlDist, targetDist, selectedNo);

    // 改变省加载市级
    targetProvince.change(function(){
        targetCity.empty();
        // 获取当前选中省
        selectedNo = $(this).children('option').not(function(){ return !this.selected }).val();
        // 加载市级
        syncSelect(urlCity, targetCity, selectedNo, true); // 参数true是为了联动

    });

    // 改变市加载县级
    targetCity.change(function(){
        targetDist.empty();
        // 获取当前选中省
        selectedNo = $(this).children('option').not(function(){ return !this.selected }).val();
        // 加载市级
        syncSelect(urlDist, targetDist, selectedNo);

    });

})();