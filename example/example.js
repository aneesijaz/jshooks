const Hooks = require('../index');
const hooks = new Hooks(1000);
            
 // register a listener
hooks.listen('on_load', 1, (data, next) => {
    console.log("#2");
    data.saregama = 'saregama';
    next(data);
});

 // register a listener
hooks.listen('on_load', 2, (data, next) => {
    console.log("#1");
    data.padanisa = 'padanisa';
    // next(data);
});

setTimeout(() => {
    let dataSent = { padanisa: 'saregama' };

    // before data
    console.log("BEFORE DATA", dataSent);

    // trigget hook with the data
    hooks.trigger('on_load', dataSent).then(data => {

        // after the listeners has modified data
        console.log("FINAL DATA", data);

    }).catch(err => console.log(err));
    
}, 2000);