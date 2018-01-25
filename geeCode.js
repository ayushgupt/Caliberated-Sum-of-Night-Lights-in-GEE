// Intercalibration of DMSP-OLS night-time light data
// by the invariant region method
// Power Coefficients
// Ayush Gupta

var regions=regions1.filterMetadata('name', 'equals', 'Egypt');

var blank = ee.Image(0);
var images = ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS').select("stable_lights");

var coff1 = {};
coff1["F101992"]=0.8959;
coff1["F101993"]=0.6821;
coff1["F101994"]=0.9127;
coff1["F121994"]=0.4225;
coff1["F121995"]=0.3413;
coff1["F121996"]=0.9247;
coff1["F121997"]=0.3912;
coff1["F121998"]=0.9734;
coff1["F121999"]=1.2743;
coff1["F141997"]=1.3041;
coff1["F141998"]=0.9824;
coff1["F141999"]=1.0347;
coff1["F142000"]=0.9885;
coff1["F142001"]=0.9282;
coff1["F142002"]=0.9748;
coff1["F142003"]=0.9144;
coff1["F152000"]=0.8028;
coff1["F152001"]=0.8678;
coff1["F152002"]=0.7706;
coff1["F152003"]=0.9852;
coff1["F152004"]=0.8640;
coff1["F152005"]=0.5918;
coff1["F152006"]=0.9926;
coff1["F152007"]=1.1823;
coff1["F162004"]=0.7638;
coff1["F162005"]=0.6984;
coff1["F162006"]=0.9028;
coff1["F162007"]=0.8864;
coff1["F162008"]=0.9971;
coff1["F162009"]=1.4637;
coff1["F182010"]=0.8114;

var coff2 = {};
coff2["F101992"]=1.0310;
coff2["F101993"]=1.1181;
coff2["F101994"]=1.0640;
coff2["F121994"]=1.3025;
coff2["F121995"]=1.3604;
coff2["F121996"]=1.0576;
coff2["F121997"]=1.3182;
coff2["F121998"]=1.0312;
coff2["F121999"]=0.9539;
coff2["F141997"]=0.9986;
coff2["F141998"]=1.1070;
coff2["F141999"]=1.0904;
coff2["F142000"]=1.0702;
coff2["F142001"]=1.0928;
coff2["F142002"]=1.0857;
coff2["F142003"]=1.1062;
coff2["F152000"]=1.0855;
coff2["F152001"]=1.0646;
coff2["F152002"]=1.0920;
coff2["F152003"]=1.1141;
coff2["F152004"]=1.1671;
coff2["F152005"]=1.2894;
coff2["F152006"]=1.1226;
coff2["F152007"]=1.0850;
coff2["F162004"]=1.1507;
coff2["F162005"]=1.2292;
coff2["F162006"]=1.1306;
coff2["F162007"]=1.1112;
coff2["F162008"]=1.0977;
coff2["F162009"]=0.9858;
coff2["F182010"]=1.0849;

var coffB = 0,coffA=0;

function setCoff(key){
  coffA = coff1[key];
  coffB = coff2[key];
}

function arealit(i)
{
  var satKey=i.get('system:index');
  var image1=blank.where(
  i.select('stable_lights').gt(0),coffA
  );
  var image2=blank.where(
    i.select('stable_lights').gt(0),coffB
    );
  var alit = i.expression('L>0?  ((coffA*((L+1)**coffB))-1) : 0',
  {
  'L':i.select('stable_lights'),
  'coffA':image1.select('constant'),
  'coffB':image2.select('constant')
  });
 
  var alit1=alit.multiply(ee.Image.pixelArea());
  var alit2 = alit1.divide(1000000);
  var alit3 = alit2.set('index',satKey);
  return alit3;
}

function tabulate(i)
{
  return regions.map(function (f)
  {
    var r = i.reduceRegion(
    {
      reducer: ee.Reducer.sum(), 
      geometry: f.geometry(), 
      scale: 500,
      bestEffort:true,
      maxPixels:1e9
    }
    );
    return ee.Feature(null, 
    {
      name: f.get('name'),
      area: r.get('constant'),
      index: i.get('index')
    }
    );
  }
  );
}
var resultstable = ee.FeatureCollection([]);
for(var k in coff1)
{
  setCoff(k);
  var results = images.filter(ee.Filter.eq("system:index",k)).map(arealit);
  resultstable = resultstable.merge(results.map(tabulate).flatten());
}
//=============================================================================================================
// Note: Uncomment the following line to create the export task. Beware of longer calculation
//       time when running it as-is across the entire DMSP data record. For faster processing 
//       times, narrow down the scope of dates or regions via filtering.
Export.table.toDrive(resultstable,'DMSP_results','ayushGEE','results','csv');
print(resultstable);
