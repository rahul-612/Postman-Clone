console.log("JavaScript File Attached!");
//Utility Functions:
//1.Utility Function to get DOM element from string
function getElementFromString(string){
    let div=document.createElement('div');
    div.innerHTML=string;                               
    return div.firstElementChild;        
}

//Initialize no. of parameters
let addedParamCount=0;

//Hide the parameter box initially
let parameterBox=document.getElementById('parameterBox');
parameterBox.style.display='none';

//if the user clicks on params box,hide the json box
let paramsRadio=document.getElementById('paramsRadio');
paramsRadio.addEventListener('click',()=>{
    document.getElementById('requestJsonBox').style.display='none';
    document.getElementById('parameterBox').style.display='';
})

//if the user clicks on json box,hide the params box
let jsonRadio=document.getElementById('jsonRadio');
jsonRadio.addEventListener('click',()=>{
    document.getElementById('requestJsonBox').style.display='';
    document.getElementById('parameterBox').style.display='none';
})

//if the user clicks on + button, add more parameters
let addParams=document.getElementById("addParams");
addParams.addEventListener('click',()=>{
    let params=document.getElementById('params');
    let string=`<div class="row g-3 my-2" id="parameterBox">
                <label for="" class="col-sm-2 col-form-label">Parameter ${addedParamCount+2}</label>
                <div class="col-md-4">
                <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount+2} Key">
                </div>
                <div class="col-md-4">
                <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount+2} Value">
                </div>
                <button class="col-sm-1 btn btn-primary deleteParam"> - </button>
            </div>`;

        // Convert element string to DOM node
        let paramElement=getElementFromString(string);
        // console.log(paramElement);
        params.appendChild(paramElement);

        //add event listener to remove the parameter on clicking - button
        let deleteParam=document.getElementsByClassName('deleteParam');
        for(item of deleteParam){
            item.addEventListener('click',(e)=>{
                    e.target.parentElement.remove();
                console.log("deleteParam running....")             
            })
        } 
        addedParamCount++;
})

//if the user clicks on submit button
let submit=document.getElementById('submit');
submit.addEventListener('click',()=>{
    //Show please wait in the response box to request patience from the user
    document.getElementById('responsePrism').innerHTML="Please wait. Fetching request....";

    //fetch all the value user has entered
    let url=document.getElementById('url').value;
    let requestType=document.querySelector("input[name='requestType']:checked").value;
    let contentType=document.querySelector("input[name='contentType']:checked").value;
    

    //if user has used params option instead of json,collect all the parameters in an onject
    if(contentType=='params')
    {
        data={};                    //oject
        for(i=0;i<addedParamCount+1;i++){
            if(document.getElementById('parameterKey'+(i+1))!=undefined){
            let key=document.getElementById('parameterKey'+(i+1)).value;                                                //addedParamCount+1 isliye kuki jitne h + ek jo default h usko bhi lena h
            let value=document.getElementById('parameterValue'+(i+1)).value;
            data[key]=value;
            // console.log(key,value,data);
            }
        }
        data=JSON.stringify(data);              
    }

    else{
        data=document.getElementById('requestJsonText').value;
    }

    //log all the values in the console for debugging
    console.log(url,requestType,contentType,data);

    //if the requestType is GET, invoke fetch api to create a get request
    if(requestType=='GET'){
        fetch(url,{
            method:'GET',
        })
        .then(response=> response.text())
        .then((text)=>{
            document.getElementById('responsePrism').innerHTML=text;
            Prism.highlightAll();                   
            // console.log(text);
        });
    }

    //if the requestType is GET, invoke fetch api to create a get request
    else{
        fetch(url,{
            method:'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(response=> response.text())
        .then((text)=>{
            document.getElementById('responsePrism').innerHTML=text;
            Prism.highlightAll();
            // console.log(text);
        })
    }

});