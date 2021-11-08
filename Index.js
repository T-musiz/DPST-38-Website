const This_class = document.getElementById('This_class')
const Link_class = document.getElementById('link-classroom')
const Link_meet = document.getElementById('link-meet')
const PriodTime = document.getElementById('PriodTime')

function TimeCheck(Weekday,Priod) {const arrTimetable=[
    ['EN02','EX06','Sc02','Sc02','FR02','EN03','EN01','Sc04','M03','FR01'],
    ['M02','M01','Sc03','Sc03','FR02','Sc01','Sc04','Sc04','EX-SC01','FR01'],
    ['M01','EX01','COM02','COM02','FR02','SO','TH','M02','EN04','FR01'],
    ['M02','TH','ART01','SO','FR02','EN01','EX02','EX05','EX-SC02','FR01'],
    ['Sc02','M01','Sc03','EX04','FR02','EX03','COM01','COM01','FR01','FR01'],
    ];

    let subject
    if (Weekday < 6 && Weekday > 0){subject = arrTimetable[Weekday-1][Priod-1]}
    else {subject = 'FR01'};
    return subject
};
function PriodCheck(Priod){const arrPriod=[
    ['8:30','9:20','10:10','11:00','11:50','12:40','13:30','14:20','15:10','0.00'],
    ['9:10','10:00','10:50','11:40','12:30','13:20','14:10','15:00','16:30','0.10']]
    let startP=arrPriod[0][Priod-1]
    let endP=arrPriod[1][Priod-1]
    return 'เริ่ม '+ startP+' | จบ '+ endP
};
//Show link in classroombox
function ClassroomOutput(subject, classroom, meet){
    $("#PriodTime").show()
    if (subject!='free' && subject != 'lunch'&& subject!='FreeSelect'){
        This_class.innerText='คาบนี้เรียน'+' '+subject
        Link_class.innerHTML='<a Href="'+ classroom+'" target="_blank" style="color: white;">ไป Classroom ของวิชานี้</a>'
        Link_meet.innerHTML='<a Href="'+ meet+'" target="_blank" style="color: white;">ไป Meet ของวิชานี้</a>'
        PriodTime.innerText=PriodCheck(displayPriod)
        if (meet==''){ 
            Link_meet.innerHTML=''
        }
    }
    else {
        Link_class.innerHTML='<a></a>'
        Link_meet.innerHTML='<a></a>'
        if(subject=='lunch' || subject=='FreeSelect'){
            This_class.innerHTML='ตอนนี้คาบพักจ้าาา'
            PriodTime.innerHTML=PriodCheck(displayPriod)
         }
        else {This_class.innerHTML='ไม่มีคาบไปทำงานที่ดองไว้ซะ'
            $("#PriodTime").hide()
    }};
 
    if(thisclass != "FR01"){
        let nextclass = TimeCheck(wd,displayPriod+1)
        let PreviousClass = TimeCheck(wd,displayPriod-1)
        if(PreviousClass == 'FR01'|| PreviousClass == null){$("#PreviousClass").hide();}
        else{$("#PreviousClass").show();}
        if(nextclass == 'FR01'||nextclass == null){$("#NextClass").hide();}
        else{$("#NextClass").show();}
    }
    else{$("#NextClass").hide();
    $("#PreviousClass").hide();}

};
//first function in classroom-box 
//get data from database
function ClassroomCheck(sj,runtime){
    db.collection("ClassroomData").doc(sj).get().then(function(doc){
        let Data = doc.data();
        ClassroomOutput(Data.subject,Data.classroom,Data.meet);
    })
    if (runtime == 1){$(".classroom-text").hide()}
    $(".classroom-text").fadeToggle("slow")
};
//use with next/Previous botton
function ClassroomBotton(Pn,ID)
    {let botton =  $(ID);
    botton.prop('disabled', true);
    setTimeout(function() {botton.prop('disabled', false);}, 600);
    displayPriod += Pn;
    thisclass = TimeCheck(wd,displayPriod);
    $(".classroom-text").hide();
    ClassroomCheck(thisclass);
    console.log('Priod=',pr,'displayPriod=',displayPriod,'class=',thisclass);
};

$("#NextClass").click(function(){ClassroomBotton(1,"#NextClass")});
$("#PreviousClass").click(function(){ClassroomBotton(-1,"#PreviousClass")});
$("#Debug").click(function(){
    pr=1;
    wd=1;
    displayPriod = pr;
    thisclass=TimeCheck(wd,displayPriod);
    ClassroomCheck(thisclass,1);
});
//set time
var pr=0;
let time;
let d = new Date();
var wd = d.getDay();
let time1 = d.getHours() + "." + (d.getMinutes()<10?'0':'')+ d.getMinutes();
time =parseFloat(time1);

//check the timetable
if (time>=8.00 && time<=9.10){pr=1}
else if (time>=9.11 && time<=10.00){pr=2}
else if (time>=10.01 && time<=10.50){pr=3}
else if (time>=10.51 && time<=11.40){pr=4}
else if (time>=11.41 && time<=12.30){pr=5}
else if (time>=12.31 && time<=13.20){pr=6}
else if (time>=13.21 && time<=14.10){pr=7}
else if (time>=14.11 && time<=15.00){pr=8}
else if (time>=15.01 && time<=16.30){pr=9}
else {pr=10}

var displayPriod = pr;
var thisclass = TimeCheck(wd,displayPriod);
ClassroomCheck(thisclass,1);

function Debug(){
console.log('time=',time);
console.log('time=',time1);
console.log('Priod=',pr);
console.log('displayPriod=',displayPriod);
console.log('thisclass=',thisclass);
console.log('Weekday=',wd);};
console.log('hello world!!!!')



