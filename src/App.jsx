import { useState, useEffect } from "react";

// ─── ALTERNATIVES POOL (per meal type) ────────────────────────────────────────
const ALTERNATIVES = {
  wakeup: [
    { id:"a_wu_1", text:"1 glass warm jeera water + 2 soaked almonds + 2 walnuts" },
    { id:"a_wu_2", text:"1 glass warm lemon honey water (no sugar) + 2 walnuts" },
    { id:"a_wu_3", text:"1 glass green tea + 5 soaked raisins + 2 almonds" },
    { id:"a_wu_4", text:"1 glass warm cinnamon water + 4 soaked almonds" },
  ],
  midsnack: [
    { id:"a_ms_1", text:"4 almonds + 2 walnuts + 1 cashew" },
    { id:"a_ms_2", text:"4 almonds + 4 pistachios" },
    { id:"a_ms_3", text:"2 walnuts + 1 tsp pumpkin seeds" },
    { id:"a_ms_4", text:"4 almonds + 1 tsp sunflower seeds" },
  ],
  breakfast: [
    { id:"a_br_1", text:"2 moong dal chilla + green chutney" },
    { id:"a_br_2", text:"1 bowl poha with veggies + 1 boiled egg" },
    { id:"a_br_3", text:"2 ragi dosa + sambar" },
    { id:"a_br_4", text:"1 bowl oats upma with veggies" },
    { id:"a_br_5", text:"2 egg white omelette + 1 slice brown bread" },
    { id:"a_br_6", text:"1 bowl sprouts chaat + 1 glass buttermilk" },
    { id:"a_br_7", text:"2 paneer stuffed paratha (small) + curd" },
    { id:"a_br_8", text:"1 bowl daliya (broken wheat) upma + boiled egg" },
  ],
  lunch: [
    { id:"a_lu_1", text:"1 bowl rajma + 1 roti + salad" },
    { id:"a_lu_2", text:"2 roti + 1 bowl palak paneer + salad" },
    { id:"a_lu_3", text:"1 bowl brown rice + dal + sabzi" },
    { id:"a_lu_4", text:"2 roti + 1 bowl chicken curry (light)" },
    { id:"a_lu_5", text:"1 bowl quinoa pulao + raita" },
    { id:"a_lu_6", text:"2 jowar roti + 1 bowl mixed veg sabzi + curd" },
    { id:"a_lu_7", text:"1 bowl chana masala + 1 roti + salad" },
    { id:"a_lu_8", text:"2 roti + 1 bowl methi dal + cucumber salad" },
  ],
  snack: [
    { id:"a_sn_1", text:"1 glass buttermilk + handful of peanuts" },
    { id:"a_sn_2", text:"1 apple + 1 tsp peanut butter" },
    { id:"a_sn_3", text:"1 glass green tea + 1 boiled egg" },
    { id:"a_sn_4", text:"1 small bowl sprouts chaat" },
    { id:"a_sn_5", text:"1 glass chaas (spiced buttermilk)" },
    { id:"a_sn_6", text:"1 small bowl roasted chana + green tea" },
    { id:"a_sn_7", text:"1 banana + 1 glass warm milk" },
  ],
  dinner: [
    { id:"a_di_1", text:"2 moong dal chilla + mint chutney" },
    { id:"a_di_2", text:"1 bowl tomato egg drop soup + 1 roti" },
    { id:"a_di_3", text:"1 bowl palak soup + 2 besan chilla" },
    { id:"a_di_4", text:"1 small bowl paneer bhurji + 1 roti" },
    { id:"a_di_5", text:"1 bowl mixed veg khichdi (light)" },
    { id:"a_di_6", text:"2 ragi roti + 1 bowl dal" },
    { id:"a_di_7", text:"1 bowl cucumber raita + 1 besan chilla" },
    { id:"a_di_8", text:"1 bowl oats vegetable khichdi" },
    { id:"a_di_9", text:"2 roti + 1 bowl lauki sabzi" },
  ],
  bedtime: [
    { id:"a_bt_1", text:"1 small cup warm jeera milk (no sugar)" },
    { id:"a_bt_2", text:"1 small cup warm cinnamon milk (no sugar)" },
    { id:"a_bt_3", text:"1 small cup warm ginger lemon tea" },
    { id:"a_bt_4", text:"1 small cup warm ashwagandha milk (no sugar)" },
  ],
};

const getMealType = (mealId) => {
  if (mealId==="wakeup")    return "wakeup";
  if (mealId==="breakfast") return "breakfast";
  if (mealId==="midsnack")  return "midsnack";
  if (mealId==="lunch")     return "lunch";
  if (mealId==="snack")     return "snack";
  if (mealId==="dinner")    return "dinner";
  if (mealId==="bedtime")   return "bedtime";
  return null;
};

// ─── DIET PLAN ─────────────────────────────────────────────────────────────────
const DIET_PLAN = {
  Monday:    { color:"#C4756A", gradient:"linear-gradient(135deg,#C4756A,#D4896E)", isVeg:false, meals:[
    { id:"wakeup",    time:"8 AM",     label:"Wake-up",   text:"1 glass warm lemon water + 2 soaked almonds + 2 walnuts" },
    { id:"breakfast", time:"10:30 AM", label:"Breakfast", text:"1 glass milk + 1 bowl makhana + 2 boiled eggs" },
    { id:"midsnack",  time:"12 PM",    label:"Mid Snack", text:"4 almonds + 2 walnuts (small handful)" },
    { id:"lunch",     time:"2 PM",     label:"Lunch",     text:"1 small bowl egg rice + 1 bowl mixed veggies/salad" },
    { id:"snack",     time:"6 PM",     label:"Snack",     text:"1 glass green tea + 1 katori roasted makhana" },
    { id:"dinner",    time:"8 PM",     label:"Dinner",    text:"1 bowl broccoli soup + 1 boiled egg or small bowl curd" },
    { id:"bedtime",   time:"Bedtime",  label:"Night",     text:"1 small cup warm turmeric milk (no sugar)" },
  ]},
  Tuesday:   { color:"#5A8A6A", gradient:"linear-gradient(135deg,#5A8A6A,#6BA07A)", isVeg:false, meals:[
    { id:"wakeup",    time:"8 AM",     label:"Wake-up",   text:"1 glass green tea + 1 date (with ghee)" },
    { id:"breakfast", time:"10:30 AM", label:"Breakfast", text:"1 bowl boiled peanuts chaat + 2 boiled eggs or 1 small bowl curd" },
    { id:"midsnack",  time:"12 PM",    label:"Mid Snack", text:"4 almonds + 2 walnuts (small handful)" },
    { id:"lunch",     time:"2 PM",     label:"Lunch",     text:"½ bowl curd rice + 1 bowl dal + cucumber salad" },
    { id:"snack",     time:"6 PM",     label:"Snack",     text:"1 glass green tea + 1 seasonal fruit" },
    { id:"dinner",    time:"8 PM",     label:"Dinner",    text:"Paneer tikka (100g) + cucumber & tomato salad" },
  ]},
  Wednesday: { color:"#C4756A", gradient:"linear-gradient(135deg,#C4756A,#D4896E)", isVeg:false, meals:[
    { id:"wakeup",    time:"8 AM",     label:"Wake-up",   text:"1 glass warm lemon water + 2 soaked almonds + 2 walnuts" },
    { id:"breakfast", time:"10:30 AM", label:"Breakfast", text:"3 boiled eggs" },
    { id:"midsnack",  time:"12 PM",    label:"Mid Snack", text:"4 almonds + 2 walnuts (small handful)" },
    { id:"lunch",     time:"2 PM",     label:"Lunch",     text:"2 roti + 1 bowl egg bhurji + side salad" },
    { id:"snack",     time:"6 PM",     label:"Snack",     text:"1 glass green tea + 1 katori roasted makhana" },
    { id:"dinner",    time:"8 PM",     label:"Dinner",    text:"2 besan chilla + green chutney (not ketchup!)" },
    { id:"bedtime",   time:"Bedtime",  label:"Night",     text:"1 small cup warm turmeric milk (no sugar)" },
  ]},
  Thursday:  { color:"#5A8A6A", gradient:"linear-gradient(135deg,#5A8A6A,#6BA07A)", isVeg:true,  meals:[
    { id:"wakeup",    time:"8 AM",     label:"Wake-up",   text:"1 glass green tea + 1 date (with ghee)" },
    { id:"breakfast", time:"10:30 AM", label:"Breakfast", text:"4 idli + chutney + 1 bowl sambar" },
    { id:"midsnack",  time:"12 PM",    label:"Mid Snack", text:"4 almonds + 2 walnuts (small handful)" },
    { id:"lunch",     time:"2 PM",     label:"Lunch",     text:"2 mix veg paneer paratha + ½ bowl curd" },
    { id:"snack",     time:"6 PM",     label:"Snack",     text:"1 glass green tea + 1 seasonal fruit" },
    { id:"dinner",    time:"8 PM",     label:"Dinner",    text:"1 bowl mix veg soup + 1 small bowl paneer bhurji or dal" },
  ]},
  Friday:    { color:"#C4756A", gradient:"linear-gradient(135deg,#C4756A,#D4896E)", isVeg:false, meals:[
    { id:"wakeup",    time:"8 AM",     label:"Wake-up",   text:"1 glass warm lemon water + 2 soaked almonds + 2 walnuts" },
    { id:"breakfast", time:"10:30 AM", label:"Breakfast", text:"2 vegetable egg omelette" },
    { id:"midsnack",  time:"12 PM",    label:"Mid Snack", text:"4 almonds + 2 walnuts (small handful)" },
    { id:"lunch",     time:"2 PM",     label:"Lunch",     text:"2 egg bhurji rolls + side salad/cucumber raita" },
    { id:"snack",     time:"6 PM",     label:"Snack",     text:"1 glass green tea + 1 katori roasted makhana" },
    { id:"dinner",    time:"8 PM",     label:"Dinner",    text:"1 bowl dal rice / khichdi" },
    { id:"bedtime",   time:"Bedtime",  label:"Night",     text:"1 small cup warm turmeric milk (no sugar)" },
  ]},
  Saturday:  { color:"#D48B3A", gradient:"linear-gradient(135deg,#D48B3A,#E09E4A)", isVeg:true,  meals:[
    { id:"wakeup",    time:"8 AM",     label:"Wake-up",   text:"1 glass green tea + 1 date (with ghee)" },
    { id:"breakfast", time:"10:30 AM", label:"Breakfast", text:"2 uttapam + chutney + 1 bowl sambar" },
    { id:"midsnack",  time:"12 PM",    label:"Mid Snack", text:"4 almonds + 2 walnuts (small handful)" },
    { id:"lunch",     time:"2 PM",     label:"Lunch",     text:"½ bowl veg pulao/biryani + 1 bowl raita + salad" },
    { id:"snack",     time:"6 PM",     label:"Snack",     text:"1 glass green tea + 1 seasonal fruit" },
    { id:"dinner",    time:"8 PM",     label:"Dinner",    text:"1 bowl vegetable upma + 1 small bowl curd + small bowl dal" },
  ]},
  Sunday:    { color:"#8B6BA0", gradient:"linear-gradient(135deg,#8B6BA0,#A07AB5)", isVeg:false, meals:[
    { id:"wakeup",    time:"8 AM",     label:"Wake-up",   text:"1 glass warm lemon water + 2 soaked almonds + 2 walnuts" },
    { id:"breakfast", time:"10:30 AM", label:"Breakfast", text:"2 plain dosa + chutney + 1 bowl sambar" },
    { id:"midsnack",  time:"12 PM",    label:"Mid Snack", text:"4 almonds + 2 walnuts (small handful)" },
    { id:"lunch",     time:"2 PM",     label:"Lunch",     text:"2 roti + 1 bowl chicken gravy" },
    { id:"snack",     time:"6 PM",     label:"Snack",     text:"1 glass green tea + 1 katori roasted makhana" },
    { id:"dinner",    time:"8 PM",     label:"Dinner",    text:"Homemade chaat — bhel with sprouts, cucumber, tomato, minimal sev" },
    { id:"bedtime",   time:"Bedtime",  label:"Night",     text:"1 small cup warm turmeric milk (no sugar)" },
  ]},
};

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const getTodayKey = () => { const d=new Date(); return DAYS[d.getDay()===0?6:d.getDay()-1]; };
const K_WEEK    = "diet_week_num";
const K_LOG     = (w,d) => `diet_log_${w}_${d}`;
const K_SWAPS   = (w)   => `diet_swaps_${w}`;
const K_USED    = (w)   => `diet_used_${w}`;
const K_WEIGHTS = "diet_weights";
const getLS = (k,fb) => { try { const s=localStorage.getItem(k); return s?JSON.parse(s):fb; } catch { return fb; } };
const setLS = (k,v)  => { try { localStorage.setItem(k,JSON.stringify(v)); } catch {} };

export default function DietTracker() {
  const [weekNum,      setWeekNum]      = useState(() => getLS(K_WEEK, 1));
  const [selectedDay,  setSelectedDay]  = useState(getTodayKey());
  const [logs,         setLogs]         = useState({});
  const [swaps,        setSwaps]        = useState({});  // { "Monday_dinner": { type:"day", val:"Wednesday_dinner" } | { type:"alt", val:"a_di_3" } }
  const [usedSwaps,    setUsedSwaps]    = useState([]);
  const [weights,      setWeights]      = useState([]);
  const [view,         setView]         = useState("plan");
  const [modal,        setModal]        = useState(null);  // { day, mealId, label, tab:"day"|"alt" }
  const [resetModal,   setResetModal]   = useState(false);
  const [confirmReset, setConfirmReset] = useState(null);
  const [weightModal,  setWeightModal]  = useState(false);
  const [weightInput,  setWeightInput]  = useState("");
  const [justChecked,  setJustChecked]  = useState(null);
  const [activeTab,    setActiveTab]    = useState("day");

  useEffect(() => {
    const allLogs = {};
    DAYS.forEach(d => { allLogs[d] = getLS(K_LOG(weekNum,d), {}); });
    setLogs(allLogs);
    setSwaps(getLS(K_SWAPS(weekNum), {}));
    setUsedSwaps(getLS(K_USED(weekNum), []));
    setWeights(getLS(K_WEIGHTS, []));
  }, [weekNum]);

  useEffect(() => { setLS(K_WEEK, weekNum); }, [weekNum]);

  const saveLog   = (day,d) => setLS(K_LOG(weekNum,day), d);
  const saveSwaps = (d)     => setLS(K_SWAPS(weekNum), d);
  const saveUsed  = (d)     => setLS(K_USED(weekNum), d);

  const getEffective = (day, meal) => {
    const sw = swaps[`${day}_${meal.id}`];
    if (!sw) return { text:meal.text, isSwapped:false };
    if (sw.type==="alt") {
      const mealType = getMealType(meal.id);
      const found = (ALTERNATIVES[mealType]||[]).find(a=>a.id===sw.val);
      return found ? { text:found.text, isSwapped:true, swapLabel:"Alternative", swapId:sw.val } : { text:meal.text, isSwapped:false };
    }
    if (sw.type==="day") {
      const [srcDay, srcMealId] = sw.val.split("_");
      const srcMeal = DIET_PLAN[srcDay]?.meals.find(m=>m.id===srcMealId);
      return srcMeal ? { text:srcMeal.text, isSwapped:true, swapLabel:`From ${srcDay}`, swapId:sw.val } : { text:meal.text, isSwapped:false };
    }
    return { text:meal.text, isSwapped:false };
  };

  const toggleMeal = (day, mealId) => {
    const wasLogged = logs[day]?.[mealId];
    const updated   = { ...(logs[day]||{}), [mealId]: !wasLogged };
    setLogs(p => ({ ...p, [day]: updated }));
    saveLog(day, updated);
    if (!wasLogged) {
      const sw = swaps[`${day}_${mealId}`];
      if (sw && !usedSwaps.includes(sw.val)) {
        const u = [...usedSwaps, sw.val]; setUsedSwaps(u); saveUsed(u);
      }
      setJustChecked(`${day}_${mealId}`);
      setTimeout(()=>setJustChecked(null), 800);
    }
  };

  const applySwap = (day, mealId, type, val) => {
    const updated = { ...swaps, [`${day}_${mealId}`]: { type, val } };
    setSwaps(updated); saveSwaps(updated); setModal(null);
  };

  const removeSwap = (day, mealId) => {
    const updated = { ...swaps }; delete updated[`${day}_${mealId}`];
    setSwaps(updated); saveSwaps(updated); setModal(null);
  };

  const resetDay = (day) => {
    const updated = { ...logs, [day]:{} };
    setLogs(updated); saveLog(day,{});
    const s={...swaps}; Object.keys(s).forEach(k=>{ if(k.startsWith(`${day}_`)) delete s[k]; });
    setSwaps(s); saveSwaps(s);
    setConfirmReset(null); setResetModal(false);
  };

  const resetWeek = () => {
    const c={}; DAYS.forEach(d=>{ c[d]={}; setLS(K_LOG(weekNum,d),{}); });
    setLogs(c); setSwaps({}); saveSwaps({}); setUsedSwaps([]); saveUsed([]);
    setConfirmReset(null); setResetModal(false);
  };

  const newWeek = () => { setWeekNum(w=>w+1); setConfirmReset(null); setResetModal(false); };

  const addWeight = () => {
    const val = parseFloat(weightInput);
    if (!val||val<20||val>300) return;
    const entry = { date:new Date().toLocaleDateString("en-IN"), weight:val, week:weekNum };
    const updated = [...weights, entry];
    setWeights(updated); setLS(K_WEIGHTS, updated);
    setWeightInput(""); setWeightModal(false);
  };

  const getDayProg  = (day) => { const t=DIET_PLAN[day].meals.length; const d=DIET_PLAN[day].meals.filter(m=>logs[day]?.[m.id]).length; return {done:d,total:t,pct:t?Math.round((d/t)*100):0}; };
  const getWeekProg = () => { let t=0,d=0; DAYS.forEach(day=>{ const p=getDayProg(day); t+=p.total; d+=p.done; }); return {done:d,total:t,pct:t?Math.round((d/t)*100):0}; };

  const dayPlan  = DIET_PLAN[selectedDay];
  const dayProg  = getDayProg(selectedDay);
  const weekProg = getWeekProg();
  const latestWt = weights.length ? weights[weights.length-1].weight : null;
  const startWt  = weights.length ? weights[0].weight : 80;
  const lostWt   = weights.length>=2 ? (startWt-latestWt).toFixed(1) : null;

  // ── SWAP MODAL ──────────────────────────────────────────────────────────────
  const SwapModal = () => {
    if (!modal) return null;
    const { day, mealId, label } = modal;
    const mealType    = getMealType(mealId);
    const currentSw   = swaps[`${day}_${mealId}`];
    const isLogged    = logs[day]?.[mealId];
    const otherDays   = DAYS.filter(d=>d!==day && DIET_PLAN[d].meals.some(m=>m.id===mealId));
    const altPool     = ALTERNATIVES[mealType]||[];

    return (
      <div onClick={()=>setModal(null)} style={{ position:"fixed",inset:0,background:"rgba(44,24,16,0.6)",zIndex:999,display:"flex",alignItems:"flex-end",justifyContent:"center" }}>
        <div onClick={e=>e.stopPropagation()} style={{ background:"#FDF6EC",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:430,maxHeight:"82vh",display:"flex",flexDirection:"column",boxShadow:"0 -8px 40px rgba(44,24,16,0.2)" }}>
          
          {/* Header */}
          <div style={{ padding:"14px 20px 0",flexShrink:0 }}>
            <div style={{ width:36,height:4,background:"#D4C4B8",borderRadius:99,margin:"0 auto 14px" }}/>
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12 }}>
              <div>
                <p style={{ fontSize:11,color:"#A08070",textTransform:"uppercase",letterSpacing:1,marginBottom:3 }}>🔄 Replace · {selectedDay}'s {label}</p>
                <h3 style={{ fontFamily:"'Playfair Display',serif",fontSize:18,color:"#2C1810" }}>Choose replacement</h3>
              </div>
              <button onClick={()=>setModal(null)} style={{ border:"none",background:"#F0E4DA",borderRadius:"50%",width:32,height:32,fontSize:16,cursor:"pointer",color:"#A08070" }}>✕</button>
            </div>
            {isLogged && (
              <div style={{ background:"#FFF0EE",border:"1px solid #F5C4BC",borderRadius:10,padding:"8px 12px",marginBottom:10 }}>
                <p style={{ fontSize:11,color:"#C4756A",fontWeight:600 }}>⚠️ Un-log this meal first to change the swap.</p>
              </div>
            )}
            {/* Tabs */}
            <div style={{ display:"flex",background:"#F0E4DA",borderRadius:12,padding:3,marginBottom:0 }}>
              {[["day","📅 Swap from Day"],["alt","🍽️ Alternatives"]].map(([t,l])=>(
                <button key={t} onClick={()=>setActiveTab(t)} style={{ flex:1,padding:"8px",border:"none",borderRadius:10,background:activeTab===t?"#fff":"transparent",fontSize:12,fontWeight:700,color:activeTab===t?"#C4756A":"#A08070",cursor:"pointer",transition:"all 0.2s" }}>{l}</button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div style={{ overflowY:"auto",padding:"12px 16px 28px",flex:1 }}>

            {/* Restore original */}
            {currentSw && !isLogged && (
              <div onClick={()=>removeSwap(day,mealId)} style={{ border:"1.5px solid #EDE0D4",borderRadius:14,padding:"12px 14px",marginBottom:10,cursor:"pointer",background:"#fff",display:"flex",alignItems:"center",gap:10 }}>
                <div style={{ width:32,height:32,borderRadius:"50%",background:"#F0E4DA",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0 }}>↩️</div>
                <div>
                  <p style={{ fontSize:12,fontWeight:700,color:"#C4756A",marginBottom:2 }}>RESTORE ORIGINAL</p>
                  <p style={{ fontSize:12,color:"#A08070" }}>Go back to planned meal</p>
                </div>
              </div>
            )}

            {/* TAB: Swap from another day */}
            {activeTab==="day" && (<>
              {otherDays.length===0 ? (
                <div style={{ textAlign:"center",padding:"24px 0",color:"#A08070",fontSize:13 }}>
                  <div style={{ fontSize:32,marginBottom:8 }}>🤔</div>
                  No other days have a {label} to swap with.
                </div>
              ) : otherDays.map(srcDay=>{
                const srcMeal   = DIET_PLAN[srcDay].meals.find(m=>m.id===mealId);
                const swapVal   = `${srcDay}_${mealId}`;
                const isCurrent = currentSw?.type==="day" && currentSw?.val===swapVal;
                const isUsed    = usedSwaps.includes(swapVal) && !isCurrent;
                const srcPlan   = DIET_PLAN[srcDay];
                return (
                  <div key={srcDay} onClick={()=>{ if(!isUsed&&!isLogged) applySwap(day,mealId,"day",swapVal); }} style={{ border:isCurrent?"2px solid #5A8A6A":isUsed?"1.5px dashed #D4C4B8":"1.5px solid #EDE0D4",background:isCurrent?"#F0F8F2":isUsed?"#F8F4F0":"#fff",borderRadius:14,padding:"12px 14px",marginBottom:10,cursor:isUsed||isLogged?"not-allowed":"pointer",opacity:isUsed?0.5:1 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:6 }}>
                      <div style={{ width:8,height:8,borderRadius:"50%",background:srcPlan.color,flexShrink:0 }}/>
                      <span style={{ fontSize:11,fontWeight:700,color:srcPlan.color,textTransform:"uppercase",letterSpacing:0.8 }}>{srcDay}</span>
                      {srcPlan.isVeg && <span style={{ fontSize:10 }}>🌿</span>}
                      {isCurrent && <span style={{ marginLeft:"auto",fontSize:10,color:"#5A8A6A",fontWeight:700 }}>✅ Selected</span>}
                      {isUsed    && <span style={{ marginLeft:"auto",fontSize:10,color:"#B0907E" }}>🚫 Used</span>}
                    </div>
                    <p style={{ fontSize:13,color:isUsed?"#B0907E":"#2C1810",lineHeight:1.5 }}>{srcMeal.text}</p>
                  </div>
                );
              })}
            </>)}

            {/* TAB: Alternatives */}
            {activeTab==="alt" && (<>
              {altPool.length===0 ? (
                <div style={{ textAlign:"center",padding:"24px 0",color:"#A08070",fontSize:13 }}>No alternatives available for this meal type.</div>
              ) : altPool.map(option=>{
                const isCurrent = currentSw?.type==="alt" && currentSw?.val===option.id;
                const isUsed    = usedSwaps.includes(option.id) && !isCurrent;
                return (
                  <div key={option.id} onClick={()=>{ if(!isUsed&&!isLogged) applySwap(day,mealId,"alt",option.id); }} style={{ border:isCurrent?"2px solid #5A8A6A":isUsed?"1.5px dashed #D4C4B8":"1.5px solid #EDE0D4",background:isCurrent?"#F0F8F2":isUsed?"#F8F4F0":"#fff",borderRadius:14,padding:"12px 14px",marginBottom:10,cursor:isUsed||isLogged?"not-allowed":"pointer",opacity:isUsed?0.5:1,display:"flex",alignItems:"flex-start",gap:10 }}>
                    <div style={{ width:30,height:30,borderRadius:"50%",flexShrink:0,marginTop:1,background:isCurrent?"#5A8A6A":isUsed?"#D4C4B8":"#F0E4DA",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:isCurrent?"#fff":"#A08070" }}>
                      {isCurrent?"✓":isUsed?"🚫":"→"}
                    </div>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:13,color:isUsed?"#B0907E":"#2C1810",lineHeight:1.5 }}>{option.text}</p>
                      {isCurrent && <p style={{ fontSize:10,color:"#5A8A6A",fontWeight:700,marginTop:3 }}>✅ Currently selected</p>}
                      {isUsed    && <p style={{ fontSize:10,color:"#B0907E",marginTop:3 }}>🚫 Already used this week</p>}
                    </div>
                  </div>
                );
              })}
            </>)}
          </div>
        </div>
      </div>
    );
  };

  // ── RESET MODAL ─────────────────────────────────────────────────────────────
  const ResetModal = () => {
    if (!resetModal) return null;
    return (
      <div onClick={()=>{ setResetModal(false); setConfirmReset(null); }} style={{ position:"fixed",inset:0,background:"rgba(44,24,16,0.6)",zIndex:999,display:"flex",alignItems:"flex-end",justifyContent:"center" }}>
        <div onClick={e=>e.stopPropagation()} style={{ background:"#FDF6EC",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:430,padding:"20px 20px 36px",boxShadow:"0 -8px 40px rgba(44,24,16,0.2)" }}>
          <div style={{ width:36,height:4,background:"#D4C4B8",borderRadius:99,margin:"0 auto 16px" }}/>
          <h3 style={{ fontFamily:"'Playfair Display',serif",fontSize:20,color:"#2C1810",marginBottom:4 }}>⚙️ Reset & Week Options</h3>
          <p style={{ fontSize:12,color:"#A08070",marginBottom:16 }}>Week {weekNum} · Manage your logs</p>
          {confirmReset ? (
            <div style={{ background:"#FFF0EE",border:"1px solid #F5C4BC",borderRadius:14,padding:16,marginBottom:12 }}>
              <p style={{ fontSize:14,fontWeight:600,color:"#C4756A",marginBottom:4 }}>
                {confirmReset==="day"?`Reset ${selectedDay}?`:confirmReset==="week"?"Reset entire week?":"Start Week "+(weekNum+1)+"?"}
              </p>
              <p style={{ fontSize:12,color:"#A08070",marginBottom:14 }}>
                {confirmReset==="day"?"All logs and swaps for this day will be cleared.":confirmReset==="week"?"All logs and swaps for this week will be cleared.":"A fresh week starts. Previous week data stays saved."}
              </p>
              <div style={{ display:"flex",gap:10 }}>
                <button onClick={()=>setConfirmReset(null)} style={{ flex:1,padding:"10px",border:"1.5px solid #EDE0D4",borderRadius:12,background:"#fff",fontSize:13,fontWeight:600,color:"#A08070",cursor:"pointer" }}>Cancel</button>
                <button onClick={()=>{ if(confirmReset==="day") resetDay(selectedDay); else if(confirmReset==="week") resetWeek(); else newWeek(); }} style={{ flex:1,padding:"10px",border:"none",borderRadius:12,background:"linear-gradient(135deg,#C4756A,#D4896E)",fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer" }}>
                  {confirmReset==="newweek"?"Start Week "+(weekNum+1):"Yes, Reset"}
                </button>
              </div>
            </div>
          ) : (
            [
              { icon:"📅",label:`Reset Today (${selectedDay})`,sub:"Clear logs & swaps for this day only",color:"#C4756A",action:"day" },
              { icon:"🗓️",label:"Reset Entire Week",sub:"Clear all logs & swaps for week "+weekNum,color:"#D48B3A",action:"week" },
              { icon:"✨",label:"Start New Week",sub:"Week "+(weekNum+1)+" · Fresh start, old data saved",color:"#5A8A6A",action:"newweek" },
            ].map(item=>(
              <div key={item.action} onClick={()=>setConfirmReset(item.action)} style={{ display:"flex",alignItems:"center",gap:12,background:"#fff",border:"1.5px solid #EDE0D4",borderRadius:14,padding:"14px",marginBottom:10,cursor:"pointer" }}>
                <div style={{ width:42,height:42,borderRadius:12,background:`${item.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0 }}>{item.icon}</div>
                <div>
                  <p style={{ fontSize:14,fontWeight:600,color:"#2C1810" }}>{item.label}</p>
                  <p style={{ fontSize:11,color:"#A08070",marginTop:2 }}>{item.sub}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // ── WEIGHT MODAL ─────────────────────────────────────────────────────────────
  const WeightModal = () => {
    if (!weightModal) return null;
    return (
      <div onClick={()=>setWeightModal(false)} style={{ position:"fixed",inset:0,background:"rgba(44,24,16,0.6)",zIndex:999,display:"flex",alignItems:"flex-end",justifyContent:"center" }}>
        <div onClick={e=>e.stopPropagation()} style={{ background:"#FDF6EC",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:430,padding:"20px 20px 40px",boxShadow:"0 -8px 40px rgba(44,24,16,0.2)" }}>
          <div style={{ width:36,height:4,background:"#D4C4B8",borderRadius:99,margin:"0 auto 16px" }}/>
          <h3 style={{ fontFamily:"'Playfair Display',serif",fontSize:20,color:"#2C1810",marginBottom:4 }}>⚖️ Log Weight</h3>
          <p style={{ fontSize:12,color:"#A08070",marginBottom:20 }}>{new Date().toLocaleDateString("en-IN")} · Week {weekNum}</p>
          <div style={{ flex:1,background:"#fff",border:"2px solid #C4756A",borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",gap:8,marginBottom:16 }}>
            <input value={weightInput} onChange={e=>setWeightInput(e.target.value)} type="number" placeholder="e.g. 77.5" style={{ border:"none",background:"none",fontSize:22,fontWeight:700,color:"#2C1810",width:"100%",outline:"none",fontFamily:"'DM Sans',sans-serif" }}/>
            <span style={{ fontSize:16,color:"#A08070",fontWeight:600 }}>kg</span>
          </div>
          <div style={{ display:"flex",gap:8,marginBottom:16,flexWrap:"wrap" }}>
            {[65,66,67,68,69,70,71,72,73,74,75,76,77,78].map(v=>(
              <button key={v} onClick={()=>setWeightInput(String(v))} style={{ border:`1.5px solid ${weightInput===String(v)?"#C4756A":"#EDE0D4"}`,background:weightInput===String(v)?"#FFF0EE":"#fff",borderRadius:20,padding:"6px 12px",fontSize:12,fontWeight:600,color:weightInput===String(v)?"#C4756A":"#A08070",cursor:"pointer" }}>{v}</button>
            ))}
          </div>
          <button onClick={addWeight} style={{ width:"100%",padding:"14px",border:"none",borderRadius:14,background:"linear-gradient(135deg,#C4756A,#D4896E)",fontSize:15,fontWeight:700,color:"#fff",cursor:"pointer" }}>Save Weight</button>
        </div>
      </div>
    );
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif",background:"#FDF6EC",minHeight:"100vh",maxWidth:430,margin:"0 auto",paddingBottom:80 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .mc{transition:all 0.2s;} .mc:active{transform:scale(0.98);}
        .cb{animation:bnc 0.4s ease;}
        @keyframes bnc{0%{transform:scale(1)}40%{transform:scale(1.3)}70%{transform:scale(0.9)}100%{transform:scale(1)}}
        .db{transition:all 0.15s;} .db:active{transform:scale(0.93);}
        ::-webkit-scrollbar{display:none;}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ background:"linear-gradient(135deg,#9E4F45 0%,#C4756A 60%,#D48B3A 100%)",padding:"36px 20px 24px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:-30,right:-30,width:140,height:140,borderRadius:"50%",background:"rgba(255,255,255,0.08)" }}/>
        <div style={{ position:"absolute",bottom:-20,left:-10,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,0.06)" }}/>
        <div style={{ position:"relative" }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4 }}>
            <p style={{ color:"rgba(255,255,255,0.75)",fontSize:11,letterSpacing:2,textTransform:"uppercase" }}>Week {weekNum}</p>
            <div style={{ display:"flex",gap:8 }}>
              <button onClick={()=>setWeightModal(true)} style={{ border:"none",background:"rgba(255,255,255,0.2)",borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:600,color:"#fff",cursor:"pointer" }}>⚖️ Weight</button>
              <button onClick={()=>setResetModal(true)}  style={{ border:"none",background:"rgba(255,255,255,0.2)",borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:600,color:"#fff",cursor:"pointer" }}>⚙️ Reset</button>
            </div>
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif",color:"#fff",fontSize:26,marginBottom:4 }}>🌿 Diet Tracker</h1>
          {latestWt && <p style={{ color:"rgba(255,255,255,0.85)",fontSize:12,marginBottom:12 }}>Current: <strong>{latestWt} kg</strong>{lostWt && ` · Lost: `}{lostWt && <strong>{lostWt} kg 🎉</strong>}</p>}
          <div style={{ background:"rgba(255,255,255,0.15)",borderRadius:14,padding:"12px 16px" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
              <span style={{ color:"#fff",fontSize:12,fontWeight:500 }}>This Week</span>
              <span style={{ color:"#fff",fontSize:13,fontWeight:700 }}>{weekProg.done}/{weekProg.total} meals</span>
            </div>
            <div style={{ background:"rgba(255,255,255,0.2)",borderRadius:99,height:7,overflow:"hidden" }}>
              <div style={{ height:"100%",borderRadius:99,background:"linear-gradient(90deg,#fff,rgba(255,255,255,0.8))",width:`${weekProg.pct}%`,transition:"width 0.5s ease" }}/>
            </div>
            <p style={{ color:"rgba(255,255,255,0.85)",fontSize:11,fontWeight:600,marginTop:6,textAlign:"center" }}>{weekProg.pct}% complete</p>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ display:"flex",background:"#fff",borderBottom:"1px solid #EDE0D4",padding:"4px 16px" }}>
        {[["plan","📋 Plan"],["progress","📊 Progress"],["weight","⚖️ Weight"]].map(([tab,lbl])=>(
          <button key={tab} onClick={()=>setView(tab)} style={{ flex:1,padding:"10px 0",border:"none",background:"none",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,color:view===tab?"#C4756A":"#A08070",borderBottom:view===tab?"2px solid #C4756A":"2px solid transparent",cursor:"pointer",transition:"all 0.2s" }}>{lbl}</button>
        ))}
      </div>

      {/* ═══════ PLAN VIEW ═══════ */}
      {view==="plan" && (<>
        <div style={{ overflowX:"auto",padding:"14px 16px 0",display:"flex",gap:8 }}>
          {DAYS.map(day=>{ const p=getDayProg(day); const pl=DIET_PLAN[day]; const isSel=day===selectedDay; const isToday=day===getTodayKey();
            return(
              <button key={day} className="db" onClick={()=>setSelectedDay(day)} style={{ flexShrink:0,padding:"8px 12px",borderRadius:12,minWidth:60,border:isSel?"none":"1.5px solid #EDE0D4",background:isSel?pl.gradient:"#fff",cursor:"pointer",position:"relative" }}>
                <div style={{ fontSize:10,fontWeight:600,color:isSel?"rgba(255,255,255,0.85)":"#A08070",marginBottom:2 }}>{day.slice(0,3).toUpperCase()}</div>
                <div style={{ fontSize:12,fontWeight:700,color:isSel?"#fff":"#5A3A2A" }}>{p.done}/{p.total}</div>
                {isToday && <div style={{ position:"absolute",top:-4,right:-4,width:10,height:10,borderRadius:"50%",background:"#FF6B6B",border:"2px solid #FDF6EC" }}/>}
                {pl.isVeg && <div style={{ fontSize:8,marginTop:1 }}>🌿</div>}
              </button>
            );
          })}
        </div>

        <div style={{ padding:"16px 16px 8px" }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
            <div>
              <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:22,color:"#2C1810" }}>{selectedDay}</h2>
                {dayPlan.isVeg && <span style={{ background:"#E8F2EC",color:"#5A8A6A",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20 }}>🌿 VEG</span>}
                {selectedDay===getTodayKey() && <span style={{ background:"#FFE8E5",color:"#C4756A",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20 }}>TODAY</span>}
              </div>
              <p style={{ fontSize:12,color:"#A08070",marginTop:2 }}>{dayProg.done} of {dayProg.total} meals logged</p>
            </div>
            <div style={{ width:48,height:48,borderRadius:"50%",background:dayProg.pct===100?"linear-gradient(135deg,#5A8A6A,#6BA07A)":dayPlan.gradient,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <span style={{ color:"#fff",fontSize:14,fontWeight:700 }}>{dayProg.pct}%</span>
            </div>
          </div>
          <div style={{ background:"#EDE0D4",borderRadius:99,height:5,marginTop:10,overflow:"hidden" }}>
            <div style={{ height:"100%",borderRadius:99,background:dayPlan.gradient,width:`${dayProg.pct}%`,transition:"width 0.4s ease" }}/>
          </div>
        </div>

        {/* Info banner */}
        <div style={{ margin:"0 16px 8px",background:"#FFF8F0",border:"1px solid #F0DCC8",borderRadius:12,padding:"8px 12px",display:"flex",alignItems:"center",gap:8 }}>
          <span>🔄</span>
          <p style={{ fontSize:11,color:"#A06030" }}>Tap <strong>Replace</strong> → choose from <strong>another day's meal</strong> or pick an <strong>alternative</strong></p>
        </div>

        {/* Meal cards */}
        <div style={{ padding:"4px 16px" }}>
          {dayPlan.meals.map(meal=>{
            const isLogged = logs[selectedDay]?.[meal.id];
            const isJust   = justChecked===`${selectedDay}_${meal.id}`;
            const { text:effectiveText, isSwapped, swapLabel } = getEffective(selectedDay, meal);
            return(
              <div key={meal.id} style={{ background:isLogged?"#F0F8F2":"#fff",border:isLogged?"1.5px solid #B8DEC0":isSwapped?"1.5px solid #D4A870":"1.5px solid #EDE0D4",borderRadius:14,marginBottom:10,overflow:"hidden" }}>
                {isSwapped && (
                  <div style={{ background:"linear-gradient(90deg,#FFF0D8,#FFFAF2)",padding:"5px 14px",display:"flex",alignItems:"center",gap:6,borderBottom:"1px solid #F0DCC8" }}>
                    <span style={{ fontSize:11 }}>🔄</span>
                    <span style={{ fontSize:10,fontWeight:700,color:"#C4853A",letterSpacing:0.5 }}>{swapLabel?.toUpperCase()}</span>
                    {isLogged && <span style={{ fontSize:10,color:"#B08050",marginLeft:"auto" }}>🔒 Locked</span>}
                  </div>
                )}
                <div className="mc" onClick={()=>toggleMeal(selectedDay,meal.id)} style={{ display:"flex",alignItems:"flex-start",gap:12,padding:"14px 14px 10px",cursor:"pointer" }}>
                  <div className={isJust?"cb":""} style={{ width:28,height:28,borderRadius:"50%",flexShrink:0,background:isLogged?"linear-gradient(135deg,#5A8A6A,#6BA07A)":"transparent",border:isLogged?"none":"2px solid #D4C4B8",display:"flex",alignItems:"center",justifyContent:"center",marginTop:1 }}>
                    {isLogged && <span style={{ color:"#fff",fontSize:14 }}>✓</span>}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:4 }}>
                      <span style={{ fontSize:10,fontWeight:700,letterSpacing:0.8,textTransform:"uppercase",color:isLogged?"#5A8A6A":dayPlan.color }}>{meal.label}</span>
                      <span style={{ fontSize:10,color:"#B0907E" }}>· {meal.time}</span>
                    </div>
                    <p style={{ fontSize:13,color:isLogged?"#6B9B7A":"#3A2218",lineHeight:1.5,opacity:isLogged?0.8:1 }}>{effectiveText}</p>
                    {isLogged && <p style={{ fontSize:11,color:"#5A8A6A",marginTop:4,fontWeight:500 }}>✅ Logged!</p>}
                  </div>
                </div>
                <div style={{ padding:"0 14px 12px",display:"flex",justifyContent:"flex-end",gap:8 }}>
                  <button onClick={e=>{ e.stopPropagation(); setActiveTab("day"); setModal({day:selectedDay,mealId:meal.id,label:meal.label,tab:"day"}); }} style={{ border:"1.5px solid #EDE0D4",background:"#F8F2EC",borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:600,color:isLogged?"#C0A090":"#A08070",cursor:isLogged?"not-allowed":"pointer",opacity:isLogged?0.5:1 }}>
                    📅 Day Swap
                  </button>
                  <button onClick={e=>{ e.stopPropagation(); setActiveTab("alt"); setModal({day:selectedDay,mealId:meal.id,label:meal.label,tab:"alt"}); }} style={{ border:isSwapped&&swaps[`${selectedDay}_${meal.id}`]?.type==="alt"?"1.5px solid #D4A870":"1.5px solid #EDE0D4",background:isSwapped&&swaps[`${selectedDay}_${meal.id}`]?.type==="alt"?"#FFF4E8":"#F8F2EC",borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:600,color:isLogged?"#C0A090":isSwapped&&swaps[`${selectedDay}_${meal.id}`]?.type==="alt"?"#C4853A":"#A08070",cursor:isLogged?"not-allowed":"pointer",opacity:isLogged?0.5:1 }}>
                    🍽️ Alternatives
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {dayProg.pct===100 && (
          <div style={{ margin:"0 16px 16px",background:"linear-gradient(135deg,#5A8A6A,#6BA07A)",borderRadius:14,padding:"16px 20px",textAlign:"center" }}>
            <div style={{ fontSize:28,marginBottom:6 }}>🎉</div>
            <p style={{ color:"#fff",fontWeight:700,fontSize:15 }}>Perfect Day!</p>
            <p style={{ color:"rgba(255,255,255,0.85)",fontSize:12,marginTop:3 }}>All meals logged for {selectedDay}</p>
          </div>
        )}
      </>)}

      {/* ═══════ PROGRESS VIEW ═══════ */}
      {view==="progress" && (
        <div style={{ padding:"16px" }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:20,color:"#2C1810",marginBottom:4 }}>Week {weekNum} Progress</h2>
          <p style={{ fontSize:12,color:"#A08070",marginBottom:16 }}>Tap a day to go to its plan</p>
          <div style={{ background:"#fff",borderRadius:16,padding:20,border:"1px solid #EDE0D4",marginBottom:14,textAlign:"center" }}>
            <div style={{ position:"relative",width:110,height:110,margin:"0 auto 12px" }}>
              <svg width="110" height="110" style={{ transform:"rotate(-90deg)" }}>
                <circle cx="55" cy="55" r="46" fill="none" stroke="#F0E4DA" strokeWidth="10"/>
                <circle cx="55" cy="55" r="46" fill="none" stroke="url(#grad)" strokeWidth="10" strokeDasharray={`${2*Math.PI*46}`} strokeDashoffset={`${2*Math.PI*46*(1-weekProg.pct/100)}`} strokeLinecap="round" style={{ transition:"stroke-dashoffset 0.8s ease" }}/>
                <defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#C4756A"/><stop offset="100%" stopColor="#D48B3A"/></linearGradient></defs>
              </svg>
              <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
                <span style={{ fontSize:22,fontWeight:700,color:"#2C1810" }}>{weekProg.pct}%</span>
                <span style={{ fontSize:10,color:"#A08070" }}>week {weekNum}</span>
              </div>
            </div>
            <p style={{ fontSize:14,fontWeight:600,color:"#2C1810" }}>{weekProg.done} of {weekProg.total} meals</p>
            <p style={{ fontSize:12,color:"#A08070",marginTop:4 }}>{weekProg.pct>=80?"🔥 Amazing!":weekProg.pct>=50?"💪 Keep going!":"🌱 You've got this!"}</p>
          </div>
          {DAYS.map(day=>{ const p=getDayProg(day); const pl=DIET_PLAN[day]; const isToday=day===getTodayKey(); const sc=DIET_PLAN[day].meals.filter(m=>swaps[`${day}_${m.id}`]).length;
            return(
              <div key={day} onClick={()=>{ setSelectedDay(day); setView("plan"); }} style={{ background:"#fff",borderRadius:14,padding:"12px 16px",border:isToday?`1.5px solid ${pl.color}`:"1.5px solid #EDE0D4",marginBottom:10,cursor:"pointer",display:"flex",alignItems:"center",gap:14 }}>
                <div style={{ width:42,height:42,borderRadius:12,flexShrink:0,background:p.done>0?pl.gradient:"#F5EDE6",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <span style={{ fontSize:12,fontWeight:700,color:p.done>0?"#fff":"#C0A090" }}>{p.pct}%</span>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                    <span style={{ fontSize:14,fontWeight:600,color:"#2C1810" }}>{day}</span>
                    {pl.isVeg && <span style={{ fontSize:10 }}>🌿</span>}
                    {isToday  && <span style={{ background:"#FFE8E5",color:"#C4756A",fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:20 }}>TODAY</span>}
                    {sc>0     && <span style={{ background:"#FFF0D8",color:"#C4853A",fontSize:9,fontWeight:700,padding:"1px 6px",borderRadius:20 }}>🔄 {sc}</span>}
                  </div>
                  <div style={{ background:"#F0E4DA",borderRadius:99,height:5,marginTop:6,overflow:"hidden" }}>
                    <div style={{ height:"100%",borderRadius:99,background:pl.gradient,width:`${p.pct}%`,transition:"width 0.5s ease" }}/>
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <span style={{ fontSize:13,fontWeight:700,color:p.pct===100?"#5A8A6A":"#A08070" }}>{p.done}/{p.total}</span>
                  {p.pct===100 && <div style={{ fontSize:14 }}>⭐</div>}
                </div>
              </div>
            );
          })}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:4 }}>
            {[
              {icon:"🔥",val:DAYS.filter(d=>getDayProg(d).pct===100).length,label:"Perfect Days",color:"#C4756A"},
              {icon:"📉",val:lostWt?`-${lostWt} kg`:"—",label:"Weight Lost",color:"#5A8A6A"},
              {icon:"🎯",val:latestWt?`${Math.max(0,(latestWt-65)).toFixed(1)} kg`:"—",label:"To Goal (65kg)",color:"#D48B3A"},
              {icon:"🔄",val:Object.keys(swaps).length,label:"Active Swaps",color:"#8B6BA0"},
            ].map(s=>(
              <div key={s.label} style={{ background:"#fff",borderRadius:14,padding:"14px",border:"1px solid #EDE0D4",textAlign:"center" }}>
                <div style={{ fontSize:24,marginBottom:4 }}>{s.icon}</div>
                <div style={{ fontSize:20,fontWeight:700,color:s.color }}>{s.val}</div>
                <div style={{ fontSize:11,color:"#A08070" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════ WEIGHT VIEW ═══════ */}
      {view==="weight" && (
        <div style={{ padding:"16px" }}>
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16 }}>
            <div>
              <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:20,color:"#2C1810" }}>⚖️ Weight Log</h2>
              <p style={{ fontSize:12,color:"#A08070",marginTop:2 }}>Track your progress</p>
            </div>
            <button onClick={()=>setWeightModal(true)} style={{ border:"none",background:"linear-gradient(135deg,#C4756A,#D4896E)",borderRadius:20,padding:"8px 16px",fontSize:12,fontWeight:700,color:"#fff",cursor:"pointer" }}>+ Add</button>
          </div>
          {weights.length>0 && (
            <>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16 }}>
                {[{label:"Start",val:`${weights[0].weight} kg`,color:"#A08070"},{label:"Current",val:latestWt?`${latestWt} kg`:"—",color:"#C4756A"},{label:"Lost",val:lostWt?`${lostWt} kg`:"—",color:"#5A8A6A"}].map(s=>(
                  <div key={s.label} style={{ background:"#fff",borderRadius:14,padding:"12px 10px",border:"1px solid #EDE0D4",textAlign:"center" }}>
                    <p style={{ fontSize:10,color:"#A08070",marginBottom:4 }}>{s.label}</p>
                    <p style={{ fontSize:16,fontWeight:700,color:s.color }}>{s.val}</p>
                  </div>
                ))}
              </div>
              <div style={{ background:"#fff",borderRadius:14,padding:"14px 16px",border:"1px solid #EDE0D4",marginBottom:16 }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
                  <span style={{ fontSize:12,fontWeight:600,color:"#2C1810" }}>Goal: 65 kg</span>
                  <span style={{ fontSize:12,color:"#A08070" }}>{Math.max(0,(latestWt-65)).toFixed(1)} kg to go</span>
                </div>
                <div style={{ background:"#F0E4DA",borderRadius:99,height:10,overflow:"hidden" }}>
                  <div style={{ height:"100%",borderRadius:99,background:"linear-gradient(90deg,#C4756A,#5A8A6A)",width:`${Math.min(100,Math.max(0,((startWt-latestWt)/(startWt-65))*100)).toFixed(0)}%`,transition:"width 0.5s ease" }}/>
                </div>
                <p style={{ fontSize:11,color:"#5A8A6A",marginTop:6,textAlign:"center",fontWeight:600 }}>{Math.min(100,Math.max(0,((startWt-latestWt)/(startWt-65))*100)).toFixed(0)}% of journey complete 🎯</p>
              </div>
            </>
          )}
          {weights.length===0 ? (
            <div style={{ textAlign:"center",padding:"40px 0",color:"#A08070" }}>
              <div style={{ fontSize:48,marginBottom:12 }}>⚖️</div>
              <p style={{ fontSize:14,fontWeight:600,marginBottom:4 }}>No weight logged yet</p>
              <p style={{ fontSize:12 }}>Tap + Add to log your weight</p>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize:14,fontWeight:600,color:"#2C1810",marginBottom:10 }}>History</h3>
              {[...weights].reverse().map((entry,i)=>{
                const prev=weights[weights.length-2-i];
                const diff=prev?(entry.weight-prev.weight).toFixed(1):null;
                return(
                  <div key={i} style={{ background:"#fff",borderRadius:14,padding:"12px 16px",border:"1px solid #EDE0D4",marginBottom:8,display:"flex",alignItems:"center",gap:12 }}>
                    <div style={{ width:42,height:42,borderRadius:12,background:"linear-gradient(135deg,#C4756A,#D4896E)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      <span style={{ fontSize:13,fontWeight:700,color:"#fff" }}>{entry.weight}</span>
                      <span style={{ fontSize:9,color:"rgba(255,255,255,0.8)" }}>kg</span>
                    </div>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:13,fontWeight:600,color:"#2C1810" }}>{entry.date}</p>
                      <p style={{ fontSize:11,color:"#A08070" }}>Week {entry.week}</p>
                    </div>
                    {diff!==null && <span style={{ fontSize:13,fontWeight:700,color:parseFloat(diff)<0?"#5A8A6A":parseFloat(diff)>0?"#C4756A":"#A08070" }}>{parseFloat(diff)<0?`↓ ${Math.abs(diff)} kg`:parseFloat(diff)>0?`↑ ${diff} kg`:"—"}</span>}
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}

      {/* ── BOTTOM BAR ── */}
      <div style={{ position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"rgba(253,246,236,0.95)",backdropFilter:"blur(10px)",borderTop:"1px solid #EDE0D4",padding:"10px 20px",textAlign:"center" }}>
        <p style={{ fontSize:11,color:"#B0907E" }}>Tap meal to log ✓ · 📅 Day Swap · 🍽️ Alternatives</p>
      </div>

      <SwapModal/>
      <ResetModal/>
      <WeightModal/>
    </div>
  );
}