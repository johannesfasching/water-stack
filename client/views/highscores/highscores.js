/**
 * Created by hannes on 27.09.16.
 */



Template.body.onRendered (function () {
    function includeJs(jsFilePath) {
        var js = document.createElement("script");

        js.type = "text/javascript";
        js.src = jsFilePath;

        document.body.appendChild(js);
    }
    //$.getScript( "app.js" )
    //includeJs("app.js");
})