const container=document.getElementById("ClassMember-container")

function createElement(name,id,nO,iG,Phone){
    let newNode = document.createElement('div');
    newNode.className = 'row p-3 my-3 member-elm';
    newNode.innerHTML = `<div class="col-sm ms-md ">
    <img class="member-img" src="./img/01-Pat.jpeg">
  </div>
  <div class="col-sm m-auto" style="padding: 25px;" >
    <h4> ${name} </h4>
    <p><b>No.</b> ${nO}    <b>Student ID:</b> ${id}<br>
      <b>Instargram:</b> ${iG} <br>
      <b>Phone:</b> ${Phone}</p>
  </div>`;
  container.appendChild(newNode);
};
function ClassroomCheck(){
    db.collection("Member").get().then(function(doc){
        let Data = doc.data();
        console.log(Data)
    })}