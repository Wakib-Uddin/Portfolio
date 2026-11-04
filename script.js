const menu=document.querySelector(".menu");
const nav=document.querySelector("#nav");
menu?.addEventListener("click",()=>{
  const opened=nav.classList.toggle("open");
  menu.setAttribute("aria-expanded",String(opened));
});
nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
  nav.classList.remove("open");
  menu?.setAttribute("aria-expanded","false");
}));

// Rotating role labels with reduced-motion support.
const role=document.querySelector("#role");
const labels=["Data Analyst","Python Developer","SQL & Data Enthusiast"];
const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(role){
  if(reduceMotion) role.textContent=labels[0];
  else{
    let labelIndex=0,charIndex=0,deleting=false;
    const tick=()=>{
      const current=labels[labelIndex];
      role.textContent=current.slice(0,charIndex);
      if(!deleting&&charIndex<current.length){charIndex++;setTimeout(tick,75);return;}
      if(!deleting){deleting=true;setTimeout(tick,1350);return;}
      if(charIndex>0){charIndex--;setTimeout(tick,38);return;}
      deleting=false;labelIndex=(labelIndex+1)%labels.length;setTimeout(tick,280);
    };
    tick();
  }
}

// Theme preference is remembered locally; system preference is respected initially.
const themeButton=document.querySelector(".theme-toggle");
const savedTheme=localStorage.getItem("portfolio-theme");
if(savedTheme==="dark"||(!savedTheme&&window.matchMedia("(prefers-color-scheme: dark)").matches)){
  document.body.classList.add("dark");
}
const updateThemeButton=()=>{
  const dark=document.body.classList.contains("dark");
  themeButton?.setAttribute("aria-label",dark?"Switch to light theme":"Switch to dark theme");
  themeButton?.setAttribute("title",dark?"Switch to light theme":"Switch to dark theme");
  const icon=themeButton?.querySelector(".theme-icon");
  const label=themeButton?.querySelector(".theme-label");
  if(icon) icon.textContent=dark?"☀":"☾";
  if(label) label.textContent=dark?"Light mode":"Dark mode";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content",dark?"#101b18":"#f6f8f7");
};
updateThemeButton();
themeButton?.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("portfolio-theme",document.body.classList.contains("dark")?"dark":"light");
  updateThemeButton();
});

// Project category filters.
const filterButtons=document.querySelectorAll(".filter-btn");
const projects=document.querySelectorAll(".project[data-category]");
filterButtons.forEach(button=>button.addEventListener("click",()=>{
  const filter=button.dataset.filter;
  filterButtons.forEach(item=>{
    const active=item===button;
    item.classList.toggle("active",active);
    item.setAttribute("aria-pressed",String(active));
  });
  projects.forEach(project=>{
    project.hidden=filter!=="all"&&project.dataset.category!==filter;
  });
}));

// Scroll progress, sticky header, back-to-top and active section navigation.
const progress=document.querySelector("#scroll-progress-bar");
const header=document.querySelector(".header");
const backToTop=document.querySelector(".back-to-top");
const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll("#nav a")];
let ticking=false;
const onScroll=()=>{
  if(ticking)return;
  ticking=true;
  requestAnimationFrame(()=>{
    const max=document.documentElement.scrollHeight-window.innerHeight;
    const percent=max>0?(window.scrollY/max)*100:0;
    if(progress)progress.style.width=percent+"%";
    header?.classList.toggle("scrolled",window.scrollY>12);
    backToTop?.classList.toggle("visible",window.scrollY>500);
    let current="";
    sections.forEach(section=>{if(window.scrollY>=section.offsetTop-150)current=section.id;});
    navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+current));
    ticking=false;
  });
};
window.addEventListener("scroll",onScroll,{passive:true});
onScroll();

// Reveal content as it enters the viewport.
const revealItems=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window&&!reduceMotion){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}
    });
  },{threshold:.12});
  revealItems.forEach(item=>observer.observe(item));
}else revealItems.forEach(item=>item.classList.add("is-visible"));
