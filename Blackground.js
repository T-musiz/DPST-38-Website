const container=document.getElementById("ClassMember-container")

function createElement(name,id,nO,iG,Phone){
    let newNode = document.createElement('div');
    newNode.className = 'row p-3 my-3 member-elm';
    newNode.innerHTML = `<div class="col-sm ms-md ">
    <img class="member-img" src="${memberRef}">
  </div>
  <div class="col-sm m-auto" style="padding: 25px;" >
    <h4> ${name} </h4>
    <p><b>No.</b> ${nO}    <b>Student ID:</b> ${id}<br>
      <b>Instargram:</b> ${iG} <br>
      <b>Phone:</b> ${Phone}</p>
  </div>`;
  container.appendChild(newNode);
};
function GetData(size){
  for(i=0;i<=size;i++){  
    console.log(i)
  db.collection("Member").where("No","==",i).get().then(function(snapshot){
    snapshot.forEach(function(docs){
        let Data = docs.data();
        createElement(Data.EngName,Data.ID,Data.No,Data.Instagram,Data.PhoneNo)
  })})}}
db.collection("Member").get().then((res) => GetData(res.size))
var memberRef = storageRef.child('img/01-Pat.jpeg')

