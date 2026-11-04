const menu=document.querySelector(".menu");
const nav=document.querySelector("#nav");
menu?.addEventListener("click",()=>{const opened=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(opened));});
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu?.setAttribute("aria-expanded","false");}));

// Accessible typewriter: keeps the full role text available to assistive technology.
const role=document.querySelector("#role");
const labels=["Aspiring Data Analyst","Python & SQL Learner","Data Science Enthusiast"];
const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(role){
  if(reduceMotion){role.textContent=labels[0];}
  else{
    let labelIndex=0, charIndex=0, deleting=false;
    const tick=()=>{
      const current=labels[labelIndex];
      role.textContent=current.slice(0,charIndex);
      if(!deleting && charIndex<current.length){charIndex++;setTimeout(tick,85);return;}
      if(!deleting){deleting=true;setTimeout(tick,1500);return;}
      if(charIndex>0){charIndex--;setTimeout(tick,42);return;}
      deleting=false;labelIndex=(labelIndex+1)%labels.length;setTimeout(tick,350);
    };
    tick();
  }
}
