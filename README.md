# @aneesijaz/jshooks

jshooks is a simple javascript module to create , listen and trigger hooks.

## Installation

Using npm [npm](https://www.npmjs.com/package/@aneesijaz/jshooks) to install jshooks.

```bash
npm install @aneesijaz/jshooks
```

## Usage

```javascript
const Hooks = require('@aneesijaz/jshooks');
const triggerTimeout = 2000;
const hooks = new Hooks(triggerTimeout);
            
 // register a listener - note: 2nd parameter is priority higher priority means 1st to listen
hooks.listen('on_load', 1, (data, next) => {
    console.log("#2");
    data.saregama = 'saregama';
    next(data);
});

 // register a listener
hooks.listen('on_load', 2, (data, next) => {
    console.log("#1");
    data.padanisa = 'padanisa';
    next(data);
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
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Support

Follow me to show your support.
[Facebook](https://www.facebook.com/lafanggaparinda)
[Twitter](https://twitter.com/billdarwaza)
[Fasterbyte](https://fasterbyte.net)
[Instagram](https://www.instagram.com/teacher_of_teachers)
