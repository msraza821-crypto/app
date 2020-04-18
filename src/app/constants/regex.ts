

export const Regex = {
    phoneNumbers: new RegExp('^[1-9][0-9]*$'),
    phoneNumber: new RegExp('^[0-9][0-9]*$'),
    description: new RegExp(/^(.|\s)*[a-zA-Z]+(.|\s)*$/, 'i'),
    coins: new RegExp('(\\d+)(\\.)?(\\d+)?'),
    // tslint:disable-next-line:max-line-length
    email: new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
   //email:new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    webUrl: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
    password: new RegExp(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/),
    spaces: new RegExp(/^\S+$/),
    spacecharacter: new RegExp(/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/),
    spacesData:new RegExp(/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/),
    spacesDatas:new RegExp(/^[A-Za-z0-9]+(?:[ -][A-Za-z0-9]+)*$/),
    numberData:new RegExp(/^[0-9]*$/),
    Username:new RegExp(/^[a-zA-Z0-9]+$/),
  //  numberData:new RegExp(/^[0-9]*$/)
    
};


