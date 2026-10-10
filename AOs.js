/*
Tools for activating JSmol script commands based on radiobutton settings.
* The script to run must be stored in the value of the radio button:
  <input type="radio" id="particular_button_name" name="radio_group_name"
    value="Jmol script text"/>
* A listener needs to be attached to the radio group (wrapping div ideally)
    that uses the functions below to send the appropriate script to JSmol.

J. Gutow 9/2026
 */
var tempEvnt

function getRadioGroupValue(radioGroupName){
    //returns the value of the selected radio button in the radio group. The
    // value should be a valid JSmol script. This is useful when you want
    // to query the current selection in a radio group without triggering an event.
    // Using this function rather than hardcoding the statement below with the
    // appropriate radioGroupName is going to be slightly less efficient.
    return document.querySelector('input[name='+radioGroupName+']:checked')?.value;
}
function jmolFromOrbitalNum(whichOrb){
    //whichOrb = string of form `isoX`, where X is 1, 2, 3 or 4.
    const orbNum = parseInt(whichOrb[3]);
    let whichJmol = null;
    // If different JSmol instances display different orbitals that is sorted here
    //window.alert('orbNum: ' + orbNum);
    switch (orbNum){
        case 1:
            whichJmol = Orbital_Jmol;
            break;
        case 2:
            whichJmol = Orbital_Jmol;
            break;
        case 3:
            whichJmol = Orbital_Jmol;
            break;
        case 4:
            whichJmol = Orbital_Jmol;
            break;
        default:
            whichJmol = Orbital_Jmol;
    }
    return whichJmol;
}

function toggle_spin() {
    let spin_checkbox = document.getElementById('spin');
    if (spin_checkbox != null) {
        if (spin_checkbox.checked) {
            Jmol.script(Orbital_Jmol, "spin on");
        } else {
            Jmol.script(Orbital_Jmol, "spin off");
        }
    }
}

function toggle_axes() {
    let axes_checkbox = document.getElementById('axes');
    if (axes_checkbox != null) {
        if (axes_checkbox.checked) {
            Jmol.script(Orbital_Jmol, "axes on");
        } else {
            Jmol.script(Orbital_Jmol, "axes off");
        }
    }
}

function toggle_ticks() {
    let ticks_checkbox = document.getElementById('ticks');
    if (ticks_checkbox != null) {
        if (ticks_checkbox.checked) {
            Jmol.script(Orbital_Jmol, "axes TICKS {0.2,0.1,0};");
        } else {
            Jmol.script(Orbital_Jmol, "axes TICKS {0,0,0};");
        }
    }
}

function displayOrbital(whichJmol, selectID, orbitalScript){
    // whichJmol: applet name
    // selectID: "iso1_select", "iso2_select", etc...
    // orbitalScript: string containing proper JSmol script to display the desired orbital
    // window.alert('whichJmol:'+whichJmol+'selectID:'+selectID+'orbitalScript:'+orbitalScript);
    let result = Jmol.script(whichJmol,orbitalScript);
    let prefixStr = selectID.replace('_select','');
    // Set colors to match user selections
    let colorStr = '#'+prefixStr + '_color'
    let colorScript = document.querySelector(colorStr+' li.selected').dataset.jmolscript;
    Jmol.script(whichJmol, colorScript);
    // Set the display mode to match user selections. This must happen second because
    // setting the color overrides transparency.
    displayModeStr = '#'+prefixStr+'_display_mode';
    let displayModeScript = document.querySelector(displayModeStr+' li.selected').dataset.jmolscript;
    Jmol.script(whichJmol,displayModeScript);
}

function handleSelectEvents(triggerElem){
    const idparts = triggerElem.parentElement.id.split("_");
    const whichOrb = idparts[0];
    const eventtype =idparts[1];
    const whichJmol = jmolFromOrbitalNum(whichOrb);
    const jmolscript = triggerElem.parentElement.querySelector('li.selected').dataset.jmolscript;
    //window.alert('whichOrb:'+whichOrb+', eventtype:'+eventtype+', whichJmol:'+whichJmol+', script:'+jmolscript);
    switch (eventtype) {
        case "select" :
            let warn = document.getElementById("calc_warning");
            warn.classList.remove('hidden');
            document.body.classList.add('waiting');
            window.setTimeout(function(){
                displayOrbital(whichJmol, triggerElem.parentElement.id, jmolscript);
                warn.classList.add('hidden');
                document.body.classList.remove("waiting")},
                1000);
            break;
        case "color" :
            Jmol.script(whichJmol, jmolscript);
    // Set the display mode to match user selections. This must happen second because
    // setting the color overrides transparency.
            let displayModeStr = whichOrb+'_display_mode';
            let modelist = document.querySelector('#'+displayModeStr);
            let displayModeScript = modelist.querySelector('li.selected').dataset.jmolscript;
            Jmol.script(whichJmol,displayModeScript);
            break;
        case "display" :
            Jmol.script(whichJmol, jmolscript);
            break;
        default:
            //do nothing
    }
}

/* SelectOne dropdowns*/
/* This supports css based menus and select dropdowns that can support
html within each menu item, allowing for formatted text, images, etc...

The idea was to have minimal javascript with most of the menu behavior
provided by the css.
J. Gutow (gutow@uwosh.edu) 9-2026.
 */
function closeMenu(triggerElem){
  const parent=triggerElem.parentNode;
  const whichmenu = parent.id;
  const menu_check = document.querySelector('#'+whichmenu+'_check');
  menu_check.checked=false;
  if (parent.classList.contains('submenu')){
    const wraplist = parent.parentNode;
    closeMenu(wraplist);
  } else {
    return
  }
}

function doMenuItem(triggerElem){
  const itemID = triggerElem.id;
  /*window.alert('The clicked item:'+itemID);*/
  switch (itemID) {
    case '':
      /* This is where to put your action or call appropriate functions
       one case for each menu item
       */
      break;
    default:
      break;
  }
  closeMenu(triggerElem);
}

function doSelectOne(triggerElem){
  /* toggle selection state of item. No selection from list is allowed*/
  if (triggerElem.classList.contains('selected')){
    triggerElem.classList.remove('selected');
    /* Call a function that does what is necessary when the selection is removed */
    /* Set to default if available */
    let parent = triggerElem.parentElement;
    let defaultelem = parent.querySelector('.defaultselection');
    if (defaultelem){
      defaultelem.classList.add('selected');
    }
  } else {
    triggerElem.classList.add('selected');
    /* Unselect all other items in the menu and submenus*/
    let sibling = triggerElem.previousElementSibling;
    while (sibling){
      sibling.classList.remove('selected');
      sibling = sibling.previousElementSibling;
    }
    sibling = triggerElem.nextElementSibling;
    while (sibling){
      sibling.classList.remove('selected');
      sibling = sibling.nextElementSibling;
    }
  }
  closeMenu(triggerElem);
  /* Call a function that does what is necessary when the selection is changed */
  handleSelectEvents(triggerElem);
}

function handleClickEvent(event) {
    /*window.alert(event.target.nodeName)*/
    if (event.target.nodeName == "LI" && event.target.parentNode.classList.contains('menuList')) {
        doMenuItem(event.target);
    } else {
        if (event.target.nodeName == "LI" && event.target.parentNode.classList.contains('selectOneList')) {
            doSelectOne(event.target);
        }
    }
    return;
}
/* Ened SelectOne dropdowns*/
function addListeners(){
    // This adds the listeners. Goal is to have a limited number and take advantage of events bubbling up through the DOM.
    // Try just one. If this does not work will do three different ones.
        document.addEventListener("click", handleClickEvent);
        console.log("added click listener for accordian menus to document.");
    // Orbital choice
    // Orbital color
    // Orbital display mode
}

// Add the event listeners once the page is loaded
window.addEventListener("DOMContentLoaded", ()=>{
    addListeners();
});