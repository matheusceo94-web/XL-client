const $ = id => document.getElementById(id);
let cfg = { prismPath:'', instance:'XL Client', ram:4, accountMode:'microsoft', offlineName:'Jogador' };
function show(view) {
  $('home').classList.toggle('hidden', view !== 'home');
  $('settings').classList.toggle('hidden', view !== 'settings');
  $('settingsNav').classList.toggle('active', view === 'settings');
  document.querySelector('.nav.active')?.classList.remove('active');
  if(view === 'home') document.querySelector('.nav')?.classList.add('active');
}
$('settingsNav').onclick = () => show('settings');
document.querySelector('.nav').onclick = () => show('home');
async function load() {
  cfg = await window.ns.getConfig();
  $('prismPath').value = cfg.prismPath || '';
  $('instance').value = cfg.instance || 'XL Client';
  $('ram').value = String(cfg.ram || 4);
  $('accountMode').value = cfg.accountMode || 'microsoft';
  $('offlineName').value = cfg.offlineName || 'Jogador';
  updateAccountFields();
}
function updateAccountFields() {
  $('offlineFields').classList.toggle('hidden', $('accountMode').value !== 'offline');
}
$('accountMode').onchange = updateAccountFields;
$('browse').onclick = async () => { const p = await window.ns.pickPrism(); if(p) $('prismPath').value = p; };
$('save').onclick = async () => {
  cfg = {
    prismPath:$('prismPath').value.trim(),
    instance:$('instance').value.trim(),
    ram:Number($('ram').value),
    accountMode:$('accountMode').value,
    offlineName:$('offlineName').value.trim()
  };
  await window.ns.saveConfig(cfg);
  $('saved').textContent = 'Configurações salvas neste computador.';
};
$('play').onclick = async () => {
  cfg = {
    prismPath:$('prismPath').value.trim() || cfg.prismPath,
    instance:$('instance').value.trim() || cfg.instance,
    ram:Number($('ram').value || cfg.ram),
    accountMode:$('accountMode').value,
    offlineName:$('offlineName').value.trim()
  };
  const result = await window.ns.launchGame(cfg);
  $('status').textContent = result.message;
  $('status').style.color = result.ok ? '#aaa' : '#d88';
};
$('mods').onclick = () => window.ns.openFolder('mods');
$('mcFolder').onclick = () => window.ns.openFolder('minecraft');
load();
