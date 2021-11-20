const container=document.getElementById("ClassMember-container")
var url, Url
var memberImgRef = storageRef.child('img')
var memberRef = memberImgRef.child('00-Unknow.png')

db.collection("Member").get().then((res) => GetData(res.size))
let imgName=(`${String(1).padStart(2, '0')}-${'Pat'}.jpeg`)
  memberRef = memberImgRef.child(imgName)
memberRef.getDownloadURL().then(function(url1) {Url = url1})


function GetData(size){
  for(i=0;i<=size;i++){  
  db.collection("Member").where("No","==",i).get().then(function(snapshot){
    snapshot.forEach(function(docs){
        let Data = docs.data();
        createElement(Data.EngName,Data.ID,Data.No,Data.Instagram,Data.PhoneNo,Data.EngNickName)
       // memberRef = memberImgRef.child(`${String(Data.No).padStart(2, '0')}-${Data.EngNickName}.jpeg`)
       // memberRef.getDownloadURL().then(function(url1) {url = url1})
  })})
}}


function createElement(name,id,nO,iG,Phone,nName){
    let newNode = document.createElement('div');
    newNode.className = 'row p-3 my-3 member-elm';
    newNode.innerHTML = `<div class="col-sm ms-md">
    <img class="member-img" src="${Url}">
  </div>
  <div class="col-sm m-auto" style="padding: 25px;" >
    <h4> ${name} (${nName}) </h4>
    <p><b>No.</b> ${nO}    <b>Student ID:</b> ${id}<br>
      <b>Instargram:</b> ${iG} <br>
      <b>Phone:</b> ${Phone}</p>
  </div>`;
  container.appendChild(newNode);
  console.log('newnode added')
};

//function pictureUrl(id,nName){
//  let imgName=(`${String(id).padStart(2, '0')}-${nName}.jpeg`)
//  memberRef = memberImgRef.child(imgName)
//  memberRef.getDownloadURL().then(function(url1) {url = url1; return Url})
//console.log(`img/${String(id).padStart(2, '0')}-${nName}.jpeg`,url)
//  return   url
//}

        
