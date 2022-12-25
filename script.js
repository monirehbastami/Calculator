window.addEventListener('load', function () {
    const nodeList = document.querySelectorAll("button");
    const inputRes = document.getElementById("inputRes");
    const reg = new RegExp('^[0-9]$');
    var result = 0;
    var nodeArr=[];
    const opt = ['+','-','*','/'];
    nodeList.forEach((item)=> {
        item.addEventListener("click",()=>{
            let strval='';
            let len = nodeArr.length;
            let item_val = item.value;
            let last_item = nodeArr[len - 1];
            if(checkDigitDot(item_val)){
                if(item_val == '.'){
                    if(!nodeArr.includes(".")){
                        nodeArr.push(item_val);
                        inputRes.value += item_val;
                    }
                }else if(last_item == '='){
                    nodeArr=[];
                    nodeArr.push(item_val);
                    inputRes.value = item_val;
                }else{
                    nodeArr.push(item_val);
                    inputRes.value += item_val;
                }
            }else{
                if(nodeArr.length == 0){
                    this.alert('Insert a number');
                    return false;
                }else{
                    if(item_val == "C"){
                        nodeArr=[];
                        inputRes.value = '';
                        return false;
                    }
                    let index_item = nodeArr.indexOf(nodeArr.find((thisnode)=> opt.includes(thisnode)));
                    if(opt.includes(last_item) || last_item == "="){
                        nodeArr[len-1] = item_val;
                        strval  = nodeArr.join('');
                        inputRes.value = strval.replace("=","");
                    }else{
                        if(checkDigitDot(last_item) && (index_item > -1)){
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
                            nodeArr = [];
                            nodeArr.push(current_res);
                            nodeArr.push(item_val);
                            strval  = nodeArr.join('');
                            inputRes.value = strval.replace("=","");
                        }else if(checkDigitDot(last_item) && (index_item == -1)){
                           // this.alert(last_item);
                            let newnumber = nodeArr.join('');
                            nodeArr = [];
                            nodeArr.push(newnumber);
                            nodeArr.push(item_val);
                            strval  = nodeArr.join('');
                            inputRes.value = strval.replace("=","");
                        }
                    }
                } 
            }           
            
        })
    });

    function checkDigitDot(item){
        let isDigit = reg.test(item);
        let digdotRes = (isDigit || item == '.' || (parseFloat(item) > 0)) ? true : false;
        return digdotRes;
    }
    function getCurrentRes(fisrt_number,stac_opt,second_num){
        var getCurRes = 0;
        switch(stac_opt){
            case '+':
                getCurRes = parseFloat(fisrt_number) + parseFloat(second_num);
            break;
            case '-':
                getCurRes = parseFloat(fisrt_number) - parseFloat(second_num);
            break;
            case '*':
                getCurRes = parseFloat(fisrt_number) * parseFloat(second_num);
            break;
            case '/':
                getCurRes = parseFloat(fisrt_number) / parseFloat(second_num);
            break;
        }
        return getCurRes;
    }
});