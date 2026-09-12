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

function displayOrbital(whichJmol, selectID, orbitalScript){
    // whichJmol: applet name
    // selectID: "iso1_select", "iso2_select", etc...
    // orbitalScript: string containing proper JSmol script to display the desired orbital
    Jmol.script(whichJmol,orbitalScript);
    let prefixStr = selectID.replace('_select','');
    // Set colors to match user selections
    let colorStr = prefixStr + '_colors'
    let colorScript = document.querySelector('input[name='+colorStr+']:checked')?.value;
    Jmol.script(whichJmol, colorScript);
    // Set the display mode to match user selections. This must happen second because
    // setting the color overrides transparency.
    displayModeStr = prefixStr+'_display_mode';
    let displayModeScript = document.querySelector('input[name='+displayModeStr+']:checked')?.value;
    Jmol.script(whichJmol,displayModeScript);
}

function handleChangeEvents(event){
    const eventtype = event.target.className;
    const whichOrb = event.target.id.split("_")[0];
    const whichJmol = jmolFromOrbitalNum(whichOrb);
    switch (eventtype) {
        case "orbital_selector" :
            displayOrbital(whichJmol, event.target.id, event.target.value);
            break;
        case "color_mode_radio_group" :
            Jmol.script(whichJmol, event.target.value);
    // Set the display mode to match user selections. This must happen second because
    // setting the color overrides transparency.
            displayModeStr = whichOrb+'_display_mode';
            let displayModeScript = document.querySelector('input[name='+displayModeStr+']:checked')?.value;
            Jmol.script(whichJmol,displayModeScript);
            break;
        case "display_mode_radio_group" :
            Jmol.script(whichJmol, event.target.value);
            break;
        default:
            //do nothing
    }
}
function addListeners(){
    // This adds the listeners. Goal is to have a limited number and take advantage of events bubbling up through the DOM.
    // Try just one. If this does not work will do three different ones.
        document.addEventListener("change", handleChangeEvents);
        console.log("added change listener to document.");
    // Orbital choice
    // Orbital color
    // Orbital display mode
}

// Add the event listeners once the page is loaded
window.addEventListener("DOMContentLoaded", ()=>{
    addListeners();
});