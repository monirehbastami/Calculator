window.addEventListener('load', function () {
    const nodeList = document.querySelectorAll("button");
    const inputRes = document.getElementById("inputRes");
    const reg = new RegExp('^[0-9]$');
    var result = 0;
    var nodeArr=[];
    const opt = ['+','-','*','/'];
    nodeList.forEach((item)=> {
        item.addEventListener("click",()=>{
            const len = nodeArr.length;
            console.log(item.value);
            let item_val = item.value;
            if(item_val == "C"){
                nodeArr=[];
                inputRes.value = '';
            }else{
                if(checkDigitDot(item_val)){
                    nodeArr.push(item_val);
                    inputRes.value += item_val;
                    //this.alert(item_val)
                }else{
                    if(nodeArr.length == 0){
                        this.alert('Insert a number');
                        return false;
                    }else{
                        let index_item = nodeArr.indexOf(nodeArr.find((thisnode)=> opt.includes(thisnode)));
                        if(index_item == -1){
                            let newnumber = nodeArr.join('');
                            nodeArr=[];
                            nodeArr.push(newnumber);
                            nodeArr.push(item_val);
                            if(item_val == "=") inputRes.value = newnumber;
                            else
                            inputRes.value = newnumber+item_val;
                        }else{
                            var numBeforOpt = '';
                            for(i = index_item+1; i<len;i++){
                                numBeforOpt += nodeArr[i];
                            }
                            for(i = index_item+1; i<len;i++){
                                nodeArr.pop();
                            }
                            nodeArr.push(numBeforOpt);
                            let second_num = nodeArr.pop();
                            let stac_opt = nodeArr.pop();
                            let fisrt_number = nodeArr.pop();
                            let current_res = getCurrentRes(fisrt_number,stac_opt,second_num);
                            if(item_val == "="){
                                inputRes.value = current_res;
                                nodeArr=[];
                                nodeArr.push(current_res);
                            }else{
                                inputRes.value = current_res+item_val;
                                nodeArr.push(current_res);
                                nodeArr.push(item_val);
                            }
                        }
                        
                        
                    }
                }
            }
            
            
        })
        
    });
  function checkDigitDot(item){
    let isDigit = reg.test(item);
    let digdotRes = (isDigit || item == '.') ? true : false;
    return digdotRes;
  }
  function getCurrentRes(fisrt_number,stac_opt,second_num){
    var getCurRes = 0;
    switch(stac_opt){
        case '+':
            getCurRes = parseInt(fisrt_number) + parseInt(second_num);
        break;
        case '-':
            getCurRes = parseInt(fisrt_number) - parseInt(second_num);
        break;
        case '*':
            getCurRes = parseInt(fisrt_number) * parseInt(second_num);
        break;
        case '/':
            getCurRes = parseInt(fisrt_number) / parseInt(second_num);
        break;
    }
    return getCurRes;
  }
 });