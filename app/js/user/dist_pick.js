define(function(require, exports, module) {
    var $ = require("zepto");

    var
    // 当前选中项
        selectedNo,

    // 初始化省份选中
        provinceNo= 'root-20',
    // 初始化市级选中
        cityNo = 'root-20-3',
    // 初始化县级选中
        distNo = 'root-20-1-6',

    // 省份数据请求url,查询后台
        urlProvince = "../js/user/province.json",
    // 市级数据url
        urlCity = "../js/user/city.json",
    // 县级数据url
        urlDist = "../js/user/district.json",

    // 省份容器
        targetProvince = $("#province"),
    // 市级容器
        targetCity = $("#city"),
    // 县级容器
        targetDist = $("#dist"),

    // 拼接html
        innerHtml;

    return  {
        initDist: function(obj) {

            if (obj) {
                provinceNo = obj.provinceNo || provinceNo;
                cityNo = obj.cityNo || cityNo;
                distNo = obj.distNo || distNo;
                urlProvince = obj.urlProvince || urlProvince;
                urlCity = obj.urlCity || urlCity;
                urlDist = obj.urlDist || urlDist;
            }

            // 初始化省市县
            selectedNo = provinceNo;
            this.syncSelect(urlProvince, targetProvince, provinceNo, "init");
//            // 初始化市
//            selectedNo = cityNo;
//            // this.syncSelect(urlCity, targetCity, provinceNo, true);
//            // 初始化县
//            selectedNo = distNo;
//            // this.syncSelect(urlDist, targetDist);



            this.changeProvince();
            this.changeCity();

        },

        // 改变省加载市级
        changeProvince: function() {
            var _this = this;
            targetProvince.change(function(){
                targetCity.empty();
                // 获取当前选中省
                selectedNo = $(this).children('option').not(function(){ return !this.selected; }).val();
                // 加载市级
                _this.syncSelect(urlCity, targetCity, selectedNo, true); // 参数true是为了联动

            });
        },

        // 改变市加载县级
        changeCity: function() {
            var _this = this;
            targetCity.change(function(){
                targetDist.empty();
                // 获取当前选中省
                selectedNo = $(this).children('option').not(function(){ return !this.selected; }).val();
                // 加载市级
                _this.syncSelect(urlDist, targetDist, selectedNo);
            });
        },


        // 解析json数据, 并填充
        formatData: function(json, target, selectedNo) {
            json = JSON.parse(json);
            innerHtml = '';

            if( json !== ""){
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
        },


        // ajax城市选择 (同步sync)
        syncSelect: function(url, target, selectedNo, comb) {
            // debugger;
            var _this = this;
            $.ajax({
                type: "GET",
                url: url,
                dataType: "html",
                async: false,
                data: "parentNo=" + selectedNo,
                success: function(json) {
                    // change事件联动时
                    if (comb === "true") {
                        _this.formatData(json, target);
                        // 获取当前市
                        selectedNo = targetCity.children('option').not(function(){ return !this.selected; }).val();
                        targetDist.empty();
                        // 根据当前市级选择县级
                        _this.syncSelect(urlDist, targetDist, selectedNo);
                    } else if (comb === "init") { // init省
                        _this.formatData(json, target, selectedNo);
                        selectedNo = targetProvince.children('option').not(function(){ return !this.selected; }).val();
                        _this.syncSelect(urlCity, targetCity, selectedNo, "city");

                    } else if (comb === "city") { // init市                    	  
                        selectedNo = targetCity.children('option').not(function(){ return !this.selected; }).val();
                        _this.formatData(json, target, selectedNo);
                        _this.syncSelect(urlDist, targetDist, selectedNo, "dist");
                    } else if ( comb === "dist") { // init地区        
                        selectedNo = targetDist.children('option').not(function(){ return !this.selected; }).val();
                        _this.formatData(json, target, selectedNo);
                    } else {
                        _this.formatData(json, target, selectedNo);
                    }
                },
                error: function(err) {
                    console.log("err:" + err);
                }
            });
        }

    };

});