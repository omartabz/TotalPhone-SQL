export function totalPhoneBill(usuage,smsPrice, callPrice) {
    const items = usuage.split(', '); 
    let callCount = 0; 
    let smsCount = 0; 
    
    for (let i = 0; i < items.length; i++) { 
      if (items[i] === 'call') { 
        callCount++; 
      } else if (items[i] === 'sms') { 
        smsCount++; 
      } 
    } 

    const price_plan = (callPrice * callCount) + (smsPrice * smsCount); 
    return 'R' + price_plan.toFixed(2); 
  } 
  var usuage = 'call, sms, call, sms, sms'; 
  var bill = totalPhoneBill(usuage);
  
      
      