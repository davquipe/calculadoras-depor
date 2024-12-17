//Permanent
const brand = "Depor";
const twitterAccount = "tuitdepor";    
const urlBrand = "https://depor.com";
const logo = 'logo-depor-white';
const urlPortadaEspeciales = "https://especiales.depor.com/especiales-multimedia-nndd/index.html";
const domainMarca = "https://especiales.depor.com/";
const domainAssets = "https://d1ts5g4ys243sh.cloudfront.net/proyectos_especiales_general/depor/prod/";
const urlCommonAssets = `${domainAssets}elementos-comunes/`;

//Variable
const titleEspecial = 'Club Universitario de Deportes: arma el 11 ideal de la historia del club | Trivia';
const slugEspecial = 'club-universitario-de-deportes-arma-11-ideal-historia-club-trivia';
const slugShields = 'club-universitario-de-deportes-arma-11-ideal-historia-club-trivia';
const urlEspecial = `${domainMarca}${slugEspecial}/index.html`;
const urlEspecial2 = `${domainMarca}${slugEspecial}/`;
const urlAssets = `${domainAssets}${slugEspecial}`;
const urlShields = `${domainAssets}${slugShields}`;
const googleSheetKey = '1fFmx60JMRV_temcuXdPkfWLloZlBYJdHI34vE_ho1Yg'; //A y C 2024 Pro
const query = 'SELECT A, B, C, D, E, F, G, H, I, J, K, L, M';
const query2 = 'SELECT A, B';
const epigraph = "Revisa la clasificación general del medallero de los Juegos Olímpicos de París 2024. Actualización al minuto a minuto del oro, plata y bronce de los países participantes. "
const keyData = 'deporCalcLiga12024';
const staleTime = 60000;
const urlBetButton = 'https://ad.doubleclick.net/ddm/trackclk/N244601.4724729DEPOR.COM/B30172824.369949875;dc_trk_aid=560527695;dc_trk_cid=194185734;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;ltd=;dc_tdv=1';

//ads
const caja3 = {
    id: 'div-gpt-ad-1582239025732-0',
    path: '/28253241/depor/web/post/default/caja3',
    size: ['fluid', [300, 100], [300, 50], [300, 250], [320, 100], [320, 50]]    
};
const lateralDerecho = {
    id: 'div-gpt-ad-1582159394135-0',
    path: '/28253241/depor/web/post/default/lateralr',
    size: [[160, 600], 'fluid', [120, 600]]    
};
const lateralIzquierdo = {
    id: 'div-gpt-ad-1582159368137-0',
    path: '/28253241/depor/web/post/default/laterall',
    size: [[120, 600], 'fluid', [160, 600]]    
};
const zocalo = {
    id: 'div-gpt-ad-1582159417206-0',
    path: '/28253241/depor/web/post/default/zocalo',
    size: [[728, 90], [320, 50]]    
};

export { 
    brand,
    domainMarca, 
    domainAssets, 
    epigraph,
    googleSheetKey, 
    keyData,
    logo,
    query, 
    query2,
    slugEspecial, 
    staleTime,    
    titleEspecial, 
    twitterAccount, 
    urlAssets,     
    urlBetButton,
    urlShields,
    urlBrand, 
    urlCommonAssets, 
    urlEspecial, 
    urlPortadaEspeciales,     
    caja3,
    lateralDerecho,
    lateralIzquierdo,
    urlEspecial2,
    zocalo
}