/* Currently not used because of applet targeting issues */

/* tools for controlling the view of JSmol based on
checkboxes and radio groups.
 */

// checkboxes
function toggle_spin(targetJSmol) {
    // targetJSmol is the particular JSmol viewer that should be adjusted.
    let spin_checkbox = document.getElementById('spin');
    if (spin_checkbox != null) {
        if (spin_checkbox.checked) {
            Jmol.script(targetJSmol, "spin on");
        } else {
            Jmol.script(targetJSmol, "spin off");
        }
    }
}

function toggle_axes(targetJSmol) {
    // targetJSmol is the particular JSmol viewer that should be adjusted.
    let axes_checkbox = document.getElementById('axes');
    if (axes_checkbox != null) {
        if (axes_checkbox.checked) {
            Jmol.script(targetJSmol, "axes on");
        } else {
            Jmol.script(targetJSmol, "axes off");
        }
    }
}

function toggle_ticks(targetJSmol) {
    // targetJSmol is the particular JSmol viewer that should be adjusted.
    let ticks_checkbox = document.getElementById('ticks');
    if (ticks_checkbox != null) {
        if (ticks_checkbox.checked) {
            Jmol.script(targetJSmol, "axes TICKS {0.2,0.1,0};");
        } else {
            Jmol.script(targetJSmol, "axes TICKS {0,0,0};");
        }
    }
}