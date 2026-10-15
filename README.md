# Compatible JSmol/Jmol versions
* JMol/JSmol version should be <=16.4.7 or >=16.5.3 because of bugs in reading 
  surfaces from GAMESSUS output files in between those versions.

# Server Config info
1. This directory must have the option set to `IncludesNoExec`. With Apache2
   I was having trouble getting this recognized in the `.htaccess` file. It
   worked fine in the vhost config file in the list of options for this 
   directory in the `<Directory>..</Directory>` block.
2. Server or vhost must activate the `includes` mod.
3. Server or vhost must also include the following in its configuration:
``` 
        # Allow server-side includes
        AddType text/html .shtml
        AddOutputFilter INCLUDES .shtml
```
# JSmol settings
The JSmol settings are in the file `JSmol_Settings.js`. Most of the settings 
should not be touched. However, you will have to set the following two 
appropriately for the relative location on the server this is installed on. 
Below are the defaults:
```javascript
j2sPath: "../../Applets/JSmol/j2s",
serverURL: "../../Applets/JSmol/php/jsmol.php",
```
# Links to set or verify
1. Contents of "hosted-by" div in `Hybrid Orbitals Header.html`
```html
    <div id="hosted-by">
        Hosted by <a href="https://uwosh.edu/Chemistry">UW Oshkosh Chemistry</a>
    </div>
```
2. Link to VSEPR tutorial in `What_are_hybrid_orbitals.shtml` ~ line 22
```html
   <a target="_blank"
 href="../../VSEPR_TUTORIAL/shtml%20version/VSEPR_Intro.shtml">VSEPR model</a>
```
3. Link to VSEPR tetrahedral geometry in `What_are_hybrid_orbitals.shtml` ~ 
   line 75
```html
<a target="_blank"
 href="../../VSEPR_TUTORIAL/shtml%20version/AX4_Examples.shtml">tetrahedral
geometry</a>
```
4. Link to VSEPR linear geometry in `What_are_hybrid_orbitals.shtml` ~ line 82
```html
<a target="_blank"
 href="../../VSEPR_TUTORIAL/shtml%20version/AX2_Examples.shtml">linear
molecules</a>
```
5. Link to VSEPR tutorial in `What_are_hybrid_orbitals.shtml` ~ line 181
```html
   <a target="_blank"
 href="../../VSEPR_TUTORIAL/shtml%20version/VSEPR_Intro.shtml">VSEPR model</a>
```
# Before release
* When making updates make sure to change the date in the `Last_mod_date.html`
  files. There is one for the Cl page, one for the Kr page one for the 
  hybrid pages.
* The version number when making a release is taken from the most 
  recent of 
  these three last modification dates in European form (e.g. 2026.10.14). 
  This should be used for the release number in the Github repository.