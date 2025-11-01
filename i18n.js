// i18n/i18n.js (SEM <script>)
(function(){
  const STORAGE_KEY="site_lang";
  const DEFAULT_LANG="pt";
  const RTL_LANGS=new Set(["ar","he"]);

  function getInitialLang(){
    const saved=localStorage.getItem(STORAGE_KEY);
    if(saved && window.I18N_DICT[saved]) return saved;
    const br=(navigator.language||"pt").slice(0,2).toLowerCase();
    return window.I18N_DICT[br]?br:DEFAULT_LANG;
  }
  function applyDir(lang){
    document.documentElement.dir = RTL_LANGS.has(lang) ? "rtl" : "ltr";
  }
  function t(lang,key){
    const pack=window.I18N_DICT[lang]||window.I18N_DICT[DEFAULT_LANG];
    if(pack && pack[key]) return pack[key];
    const fb=window.I18N_DICT[DEFAULT_LANG];
    return (fb && fb[key])||key;
  }
  function translatePage(lang){
    applyDir(lang);
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const k=el.getAttribute("data-i18n");
      el.textContent=t(lang,k);
    });
  }
  function setLang(lang){
    if(!window.I18N_DICT[lang]) return;
    localStorage.setItem(STORAGE_KEY,lang);
    translatePage(lang);
    const sel=document.getElementById("langSwitcher");
    if(sel) sel.value=lang;
  }
  document.addEventListener("DOMContentLoaded",()=>{
    const lang=getInitialLang();
    setLang(lang);
    const sel=document.getElementById("langSwitcher");
    if(sel){ sel.addEventListener("change",e=>setLang(e.target.value)); }
  });
  window.I18N={ setLang };
})();
