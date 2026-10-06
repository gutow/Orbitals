# Hybrid orbitals on 
It is important to have all the gzipped files in the same directory as the .
html file.  The files needed are: 1) a gzipped file with the atom 
coordinates, in any of the formats Jmol can read. 2) a gzipped gaussian cube 
file for each of the orbitals to be displayed if they are not in the initial 
file. To save loading time it seems to be better to avoid including the atom 
coordinates in the cube files if they are used. It is also recommended that 
the file names for the surfaces correspond to 
reasonable names for the orbitals. 
* The relative path to Jmol on your server must be correct in the file 
  `JSmol_settings.js`. This may also have to be set in `ethylene_VB.shmtl`.
* JMol/JSmol version should be <=16.4.7 or >=16.5.3 because of bugs in reading 
  surfaces from GAMESSUS output files in between those versions.
* When making updates make sure to change the date in the `Last_mod_date.
html`. There is one for the Cl page, one for the Kr page one for the N page 
  and one for the ethylene page. 