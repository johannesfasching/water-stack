//var createSquareThumb = function(fileObj, readStream, writeStream) {
//    var size = '96';
//    gm(readStream).autoOrient().resize(size, size + '^').gravity('Center').extent(size, size).stream('PNG').pipe(writeStream);
//};

Images = new FS.Collection("imagesProfile", {
    stores: [
        new FS.Store.FileSystem("imagesProfile", {path: "~/uploads/imagesProfile"})
        //new FS.Store.FileSystem("thumbs", {path: "~/uploads/imagesProfile/thumbs", transformWrite: createSquareThumb})
    ]
    //filter: {
    //    allow: {
    //        contentTypes: ['image/*'] //allow only images in this FS.Collection
    //    }
    //}
});

Images.allow({
    'insert': function () {
        // add custom authentication code here
        return true;
    }
});