import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(str:string): string{
    let arr;
    let day
    let mm=''
   let  month=[{name:'January,', number:'01'},
      {name:'February,',number:'02'}, 
      {name:'March,',number:'03'} ,
      {name:'April,',number:'04'}, 
      {name:'May,',number:'05'}, 
     {name:'June,',number:'06'}, 
      {name:'July,',number:'07'}, 
      {name:'August,',number:'08'}, 
      {name:'September,',number:'09'}, 
      {name:'October,',number:'10'}, 
      {name:'November,',number:'11'} ,
      {name:'December,',number:'12'} 
      
    ];
    arr= str.split(' ')
    day=arr[0].split('t')
    if(arr[0]=='1st')
    day=arr[0].split('s')
    if(arr[0]=='2nd')
    day=arr[0].split('n')
 
  
   for(let m of month)
   {
     if(arr[1]==m['name'])
     mm=m['number']
   }

  day[0]=Number(day[0])
  if(day[0]<10)
day[0]='0'+day[0]  
    return day[0]+"-"+mm+'-'+arr[2]

  }
}
